const RotaTool = {
    // 1. ADICIONAR MARCO (POST-IT)
    addMarco: (text = '', focus = true) => {
        const container = document.getElementById('list-marcos');
        const marcoId = 'marco-' + Date.now();
        
        const div = document.createElement('div');
        div.id = marcoId;
        div.className = "flex flex-col md:flex-row items-center gap-4 group animate-in slide-in-from-top duration-300 draggable-marco cursor-move";
        div.draggable = true;
        
        div.innerHTML = `
            <div class="flex-1 text-right hidden md:block">
                <span class="font-black text-[10px] uppercase text-gray-300 group-hover:text-black transition-colors">Arraste para reordenar</span>
            </div>
            
            <div class="w-10 h-10 bg-white border-4 border-black flex items-center justify-center rounded-full z-20 group-hover:bg-[#ffde59] transition-colors shadow-[2px_2px_0px_0px_black]">
                <i class="fas fa-grip-vertical text-xs"></i>
            </div>
            
            <div class="flex-1 w-full bg-[#fffde5] border-4 border-black p-4 shadow-[6px_6px_0px_0px_black] relative group-active:scale-95 transition-transform">
                <button onclick="this.parentElement.parentElement.remove(); RotaTool.save();" 
                        class="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white border-2 border-black rounded-full flex items-center justify-center hover:bg-black transition-colors z-30">
                    <i class="fas fa-times"></i>
                </button>
                <textarea class="w-full bg-transparent border-none font-bold text-sm focus:ring-0 resize-none marco-input auto-resize" 
                          placeholder="Meta intermediária SMART..."
                          oninput="autoResize(this); RotaTool.save();"
                          onkeydown="RotaTool.handleKeydown(event, this)">${text}</textarea>
            </div>
        `;

        // Eventos de Drag & Drop
        div.addEventListener('dragstart', () => { div.classList.add('dragging'); div.style.opacity = "0.4"; });
        div.addEventListener('dragend', () => { div.classList.remove('dragging'); div.style.opacity = "1"; RotaTool.save(); });

        container.appendChild(div);

        const textarea = div.querySelector('textarea');
        if (focus) {
            setTimeout(() => {
                textarea.focus();
                autoResize(textarea);
            }, 50);
        } else if (text) {
            setTimeout(() => autoResize(textarea), 50);
        }
        
        RotaTool.save();
    },

    // 2. LÓGICA DE TECLADO REFINADA
    handleKeydown: (e, el) => {
        const allMarcos = Array.from(document.querySelectorAll('.marco-input'));
        const index = allMarcos.indexOf(el);

        // TAB (Próximo ou Novo)
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            if (index === allMarcos.length - 1) {
                // Se for o último, cria um novo
                RotaTool.addMarco('', true);
            } else {
                // Se não for o último, foca no próximo e vai para o fim do texto
                const next = allMarcos[index + 1];
                next.focus();
                next.setSelectionRange(next.value.length, next.value.length);
            }
        }

        // Shift + TAB (Voltar)
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            if (index > 0) {
                const prev = allMarcos[index - 1];
                prev.focus();
                prev.setSelectionRange(prev.value.length, prev.value.length);
            } else {
                const destiny = document.getElementById('rota-destiny');
                destiny.focus();
                destiny.setSelectionRange(destiny.value.length, destiny.value.length);
            }
        }

        // Backspace (Apagar se vazio)
        if (e.key === 'Backspace' && el.value.trim() === '') {
            e.preventDefault();
            const parent = el.closest('.draggable-marco');
            const prev = allMarcos[index - 1];
            
            if (prev) {
                prev.focus();
                prev.setSelectionRange(prev.value.length, prev.value.length);
            } else {
                document.getElementById('rota-destiny').focus();
            }
            parent.remove();
            RotaTool.save();
        }
    },

    // 3. PERSISTÊNCIA E CARREGAMENTO
    save: () => {
        const marcos = Array.from(document.querySelectorAll('.marco-input')).map(input => input.value);
        localStorage.setItem('rota-marcos-data', JSON.stringify(marcos));
    },

    load: () => {
        const container = document.getElementById('list-marcos');
        if (!container) return;
        
        container.innerHTML = ''; 
        const saved = localStorage.getItem('rota-marcos-data');
        if (saved) {
            const marcos = JSON.parse(saved);
            marcos.forEach(m => RotaTool.addMarco(m, false));
        }

        const destiny = document.getElementById('rota-destiny');
        if (destiny) {
            destiny.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && !e.shiftKey) {
                    const firstMarco = document.querySelector('.marco-input');
                    if (!firstMarco) {
                        e.preventDefault();
                        RotaTool.addMarco('', true);
                    } else {
                        // Se já existir marco, o TAB do destino vai para o primeiro
                        e.preventDefault();
                        firstMarco.focus();
                        firstMarco.setSelectionRange(firstMarco.value.length, firstMarco.value.length);
                    }
                }
            });
        }
        RotaTool.initDragAndDrop();
    },

    // 4. SISTEMA DE ARRASTAR
    initDragAndDrop: () => {
        const container = document.getElementById('list-marcos');
        if (!container) return;
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            const afterElement = RotaTool.getDragAfterElement(container, e.clientY);
            container.classList.add('border-2', 'border-dashed', 'border-gray-300', 'rounded-xl');
            if (afterElement == null) container.appendChild(dragging);
            else container.insertBefore(dragging, afterElement);
        });
        container.addEventListener('dragleave', () => container.classList.remove('border-2', 'border-dashed', 'border-gray-300'));
        container.addEventListener('drop', () => { container.classList.remove('border-2', 'border-dashed', 'border-gray-300'); RotaTool.save(); });
    },

    getDragAfterElement: (container, y) => {
        const draggableElements = [...container.querySelectorAll('.draggable-marco:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) return { offset: offset, element: child };
            else return closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    },

    clearForm: () => {
        if (confirm("Deseja realmente apagar toda a Rota da Jornada?")) {
            const fields = ['rota-name', 'rota-coach', 'rota-date', 'rota-destiny', 'rota-victory', 'rota-worthy'];
            fields.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
                localStorage.removeItem(id);
            });
            localStorage.removeItem('rota-marcos-data');
            const container = document.getElementById('list-marcos');
            if (container) container.innerHTML = '';
            window.location.hash = 'rota';
            window.location.reload();
        }
    },

    // 5. IMPRESSÃO CORRIGIDA (SEM RECUO E SEM ESPAÇOS EXTRAS)
    /* ... dentro do objeto RotaTool ... */

    print: () => {
        try {
            const getVal = (id) => document.getElementById(id)?.value || '---';
            const coachee = getVal('rota-name').toUpperCase();
            const coach = getVal('rota-coach').toUpperCase();
            const data = getVal('rota-date');

            const printArea = document.getElementById('print-area');
            if (!printArea) return;

            // Função interna para o cabeçalho idêntico em todas as páginas
            const getHeaderHTML = (subtitulo) => `
                <div class="print-header">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h1 style="font-family:'Space Grotesk'; font-size:18px; font-weight:900; margin:0">ROTA DA JORNADA</h1>
                        <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #666;">${subtitulo}</span>
                    </div>
                    <div class="info-grid">
                        <div class="info-item"><span class="info-label">Coachee</span><div class="info-content">${coachee}</div></div>
                        <div class="info-item"><span class="info-label">Coach</span><div class="info-content">${coach}</div></div>
                        <div class="info-item"><span class="info-label">Data</span><div class="info-content">${data}</div></div>
                    </div>
                </div>
            `;

            printArea.innerHTML = `
                <style>
                    @page { size: A4; margin: 7.5mm 15mm; }
                    @media print {
                        html, body { margin: 0; padding: 0; background: white !important; -webkit-print-color-adjust: exact; }
                        .page-break { page-break-after: always; break-after: page; }
                    }
                    
                    .report-container { font-family: 'Inter', sans-serif; width: 100%; }
                    
                    /* Cabeçalho */
                    .print-header { border-bottom: 4px solid #000; margin-bottom: 20px; padding-bottom: 10px; }
                    .info-grid { display: flex; gap: 8px; margin-top: 10px; }
                    .info-item { flex: 1; border: 2px solid #000; padding: 6px 10px; background: #ffde59 !important; }
                    .info-label { font-size: 7px; font-weight: 900; text-transform: uppercase; display: block; line-height: 1; margin-bottom: 2px; }
                    .info-content { font-size: 10px; font-weight: 800; text-transform: uppercase; }
                    
                    /* Seções de Texto */
                    .section-title { font-size: 11px; font-weight: 900; text-transform: uppercase; margin-top: 20px; margin-bottom: 6px; font-family: 'Space Grotesk'; border-left: 4px solid #ffde59; padding-left: 8px; }
                    .text-box-print { border: 2px solid #000; padding: 10px; white-space: pre-wrap; word-wrap: break-word; font-size: 11px; line-height: 1.4; text-align: left; background: white; margin-bottom: 10px; }
                    
                    /* Linha do Tempo e Marcos */
                    .destiny-box-print { border: 3px solid #000; padding: 12px; background: #ffde59 !important; margin-bottom: 20px; text-align: left !important; }
                    .destiny-content-print { font-size: 14px; font-weight: 800; line-height: 1.2; white-space: pre-wrap; margin: 0; }
                    
                    .timeline-line { position: relative; padding-left: 35px; border-left: 4px solid #000; margin-left: 20px; margin-top: 15px; }
                    
                    /* REGRA DE OURO: Não quebra o card no meio da página */
                    .marco-print { 
                        position: relative; 
                        border: 2px solid #000; 
                        padding: 10px; 
                        margin-bottom: 12px; 
                        background: #fffde5 !important; 
                        font-size: 11px; 
                        white-space: pre-wrap;
                        break-inside: avoid; /* Evita quebra no meio do bloco */
                        page-break-inside: avoid;
                    }
                    
                    .marco-print::before { content: ''; position: absolute; left: -44px; top: 15px; width: 12px; height: 12px; background: #000; border-radius: 50%; }
                    .today-print { border: 2px solid #000; padding: 8px; background: #eee !important; font-weight: 900; margin-top: 20px; text-align: center; text-transform: uppercase; font-size: 9px; break-inside: avoid; }
                    
                    /* Separador de Página 1 para 2 */
                    .print-separator {
                        margin-top: 50px;
                        border-top: 2px dashed #000;
                        position: relative;
                        text-align: center;
                    }
                    .separator-badge {
                        position: absolute;
                        top: -12px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: white;
                        padding: 0 15px;
                        font-size: 9px;
                        font-weight: 900;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                </style>

                <div class="report-container">
                    <div class="page-break">
                        ${getHeaderHTML('Resumo da Sessão')}

                        <h3 class="section-title">Pequena Vitória (Ação Imediata)</h3>
                        <div class="text-box-print">${getVal('rota-victory').trim() || '---'}</div>

                        <h3 class="section-title">Próximos Passos e Descobertas</h3>
                        <div class="text-box-print">${getVal('rota-worthy').trim() || '---'}</div>
                        
                        <div class="print-separator">
                            <span class="separator-badge">
                                <i class="fas fa-arrow-down mr-2"></i> 
                                Detalhamento da Rota na Próxima Página
                            </span>
                        </div>
                    </div>

                    <div>
                        ${getHeaderHTML('Mapa da Jornada')}

                        <div class="destiny-box-print">
                            <span style="font-size: 8px; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 4px;">Destino Final</span>
                            <div class="destiny-content-print">${getVal('rota-destiny').trim()}</div>
                        </div>

                        <div class="timeline-line">
                            ${Array.from(document.querySelectorAll('.marco-input')).map(input => `
                                <div class="marco-print">${input.value.trim()}</div>
                            `).join('')}
                            <div class="today-print">Estado Atual (Hoje)</div>
                        </div>
                    </div>
                </div>
            `;

            setTimeout(() => { window.print(); }, 500);
        } catch (e) { console.error("Erro na impressão:", e); }
    }
};