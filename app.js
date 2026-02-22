/* ==========================================
   CORE APP - GERENCIAMENTO GLOBAL
   ========================================== */

// 1. UTILITÁRIO DE ARMAZENAMENTO (STORAGE)
const Storage = {
    save: (key, value) => {
        const data = typeof value === 'object' ? JSON.stringify(value) : value;
        localStorage.setItem(key, data);
    },
    loadAll: () => {
        document.querySelectorAll('.persist').forEach(el => {
            // Se não tem ID, usa o Name (importante para botões de rádio)
            const storageKey = el.id || el.name;
            const saved = localStorage.getItem(storageKey);

            if (saved !== null) {
                if (el.type === 'radio') {
                    if (el.value === saved) {
                        el.checked = true;
                    }
                } else {
                    el.value = saved;
                }

                // Atualiza o badge do nível de responsabilidade
                if (el.id === 'cp-resp-level') {
                    const badge = document.getElementById('resp-val');
                    if (badge) badge.innerText = saved + '%';
                }
            }
        });
    }
};

// 2. NAVEGAÇÃO ENTRE TELAS
const Navigation = {
    view: (id) => {
        console.log('DEBUG: Navigation.view called with', id);
        // Esconde todas as views
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

        // Mostra a view desejada
        const target = document.getElementById(`view-${id}`);
        console.log('DEBUG: Navigation.view target', target);
        if (target) {
            target.classList.remove('hidden');
            console.log('DEBUG: Navigation.view target after remove hidden', target);
        }

        // Se existir uma ferramenta correspondente, chame seu load() (garante injeção sob demanda)
        try {
            const code = id.startsWith('tool-') ? id.slice(5) : id;
            const toolName = code.charAt(0).toUpperCase() + code.slice(1) + 'Tool';
            const t = window[toolName];
            console.log('DEBUG: Navigation.view toolName', toolName, 'found:', !!t);
            if (t && typeof t.load === 'function') {
                try { console.log('DEBUG: Navigation.view calling', toolName + '.load()'); t.load(); } catch (err) { console.error(`${toolName}.load() failed on view:`, err); }
            }
        } catch (e) { /* non-fatal */ }

        // Ajusta o tamanho das textareas ao entrar na tela
        setTimeout(() => {
            document.querySelectorAll('textarea.auto-resize').forEach(textarea => autoResize(textarea));
        }, 50);

        window.scrollTo(0, 0);

        if (id === 'home') {
            window.location.hash = '';
        }
    }
};

// 3. AUXILIARES DE INTERFACE
function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

// 4. INICIALIZAÇÃO CENTRALIZADA (App.init)
window.App = (function () {
    'use strict';
    const init = function () {
        // Carrega dados persistidos em inputs
        Storage.loadAll();

        // Restaura a view a partir do hash (se existir)
        const currentHash = window.location.hash.replace('#', '');
        if (currentHash && currentHash !== 'home') {
            setTimeout(() => Navigation.view(currentHash), 50);
        } else {
            Navigation.view('home');
        }

        // Inicializa ferramentas de forma centralizada e segura
        const tools = ['ClarezaTool', 'ValoresTool', 'RotaTool', 'SWOTTool', 'PyramidTool', 'CompetenciasTool', 'PropositoTool', 'PerdasGanhosTool', 'CicloRealidadeTool', 'CoachingAbout', 'ApoioTool'];
        tools.forEach(name => {
            const t = window[name];
            console.log('DEBUG: App.init tool', name, 'found:', !!t);
            if (t && typeof t.load === 'function') {
                try { console.log('DEBUG: Calling', name + '.load()'); t.load(); } catch (err) { console.error(`${name}.load() failed:`, err); }
            }
        });

        // Evento global para persistência de campos marcados com .persist
        document.addEventListener('input', (e) => {
            const el = e.target;
            if (el && el.classList && el.classList.contains('persist')) {
                const storageKey = el.id || el.name;
                Storage.save(storageKey, el.value);

                if (el.id === 'cp-resp-level') {
                    const badge = document.getElementById('resp-val');
                    if (badge) badge.innerText = el.value + '%';
                }
            }
            if (el && el.classList && el.classList.contains('auto-resize')) autoResize(el);
        });

        // Atalho para adicionar novo valor pelo Enter no input da ferramenta de valores
        const valInput = document.getElementById('new-value-input');
        if (valInput) {
            valInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const vt = window.ValoresTool;
                    if (vt && typeof vt.addNewValue === 'function') {
                        e.preventDefault();
                        try { vt.addNewValue(); } catch (err) { console.error('ValoresTool.addNewValue failed', err); }
                    }
                }
            });
        }

        // Aguarda pequeno delay para garantir que o localStorage já preencheu os campos salvos
        setTimeout(AppUtils.setDefaultDates, 100);
    };

    return { init };
})();

// Invoca App.init quando o DOM estiver totalmente carregado (e todos os scripts deferidos tiverem executado)
document.addEventListener('DOMContentLoaded', function () {
    try { window.App.init(); } catch (e) { console.error('App.init failed:', e); }
});

const AppUtils = {
    // Define a data atual nos campos de data que estiverem vazios
    setDefaultDates: () => {
        const dateFields = document.querySelectorAll('input[type="date"]');
        const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

        dateFields.forEach(field => {
            // Só preenche se o campo estiver vazio (respeita dados salvos no localStorage)
            if (!field.value) {
                field.value = today;
            }
        });
    }
};