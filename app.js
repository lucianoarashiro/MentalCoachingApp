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
                if(el.id === 'cp-resp-level') {
                    const badge = document.getElementById('resp-val');
                    if(badge) badge.innerText = saved + '%';
                }
            }
        });
    }
};

// 2. NAVEGAÇÃO ENTRE TELAS
const Navigation = {
    view: (id) => {
        // Esconde todas as views
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        
        // Mostra a view desejada
        const target = document.getElementById(`view-${id}`);
        if (target) {
            target.classList.remove('hidden');
        }

        // Ajusta o tamanho das textareas ao entrar na tela
        setTimeout(() => {
            document.querySelectorAll('textarea.auto-resize').forEach(textarea => autoResize(textarea));
        }, 50);

        window.scrollTo(0, 0);

        if ( id === 'home' ) {
            window.location.hash = '';
        }
    }
};

// 3. AUXILIARES DE INTERFACE
function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

// 4. INICIALIZAÇÃO QUANDO O DOM ESTIVER PRONTO
document.addEventListener('DOMContentLoaded', () => {
    Storage.loadAll();

    // 2. Resolve o bug do Recarregamento/Hash
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && currentHash !== 'home') {
        // Pequeno delay para garantir que o DOM renderizou antes de trocar a view
        setTimeout(() => Navigation.view(currentHash), 50);
    } else {
        Navigation.view('home');
    }

    if (typeof ClarezaTool !== 'undefined' && ClarezaTool.load) {
        ClarezaTool.load();
    }

    if (typeof ValoresTool !== 'undefined' && ValoresTool.load) {
        ValoresTool.load();
    }

    if (typeof RotaTool !== 'undefined' && RotaTool.load) {
        RotaTool.load();
    }
    
    if (typeof RotaTool !== 'undefined') {
        RotaTool.load();
    }

    document.addEventListener('input', (e) => {
        const el = e.target;
        if (el.classList.contains('persist')) {
            // Salva usando ID ou Name
            const storageKey = el.id || el.name;
            localStorage.setItem(storageKey, el.value);
            
            if(el.id === 'cp-resp-level') {
                const badge = document.getElementById('resp-val');
                if(badge) badge.innerText = el.value + '%';
            }
        }
        if (el.classList.contains('auto-resize')) autoResize(el);
    });

    const valInput = document.getElementById('new-value-input');
    if (valInput) {
        valInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                ValoresTool.addCustomValue();
            }
        });
    }

    // Aguarda um pequeno delay para garantir que o localStorage já preencheu os campos salvos
    setTimeout(AppUtils.setDefaultDates, 100);

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