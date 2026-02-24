window.RotaTool = (function () {
    'use strict';
    const that = {
        load: () => {
            const container = document.getElementById('view-rota');
            if (!container) return;
            if (container.querySelector('#rota-main')) return; // already built

            const html = `
            <div id="rota-main" class="max-w-5xl mx-auto">
                <div class="mb-6 flex justify-between items-center border-b-4 border-black pb-4">
                    <div class="w-20"></div>
                    <h2 class="font-black uppercase text-2xl">Ferramenta Rota da Jornada</h2>
                    <div class="w-20"></div>
                </div>

                <div class="no-print mb-8">
                    <details class="bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] group overflow-hidden transition-all">
                        <summary class="list-none cursor-pointer p-4 flex justify-between items-center font-black uppercase text-sm hover:bg-gray-50 transition-colors">
                            <span class="flex items-center gap-3">
                                <i class="fas fa-gem text-[#ffde59]"></i>
                                Roteiro e Orientações: Rota da Jornada
                            </span>
                            <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                        </summary>
                        
                        <div class="p-6 border-t-4 border-black bg-gray-50 space-y-4 text-sm leading-relaxed">
                        <div class="space-y-4 text-gray-800">
                            <p><strong>Objetivo:</strong> Mapear de forma reversa os marcos críticos (milestones) necessários para transformar a Fotografia de Sucesso em realidade, saindo do estado futuro até o momento presente.</p>
                            
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_black]">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Como Aplicar:</h4>
                                    <ul class="list-disc pl-4 space-y-1 text-xs">
                                        <li><strong>Destino:</strong> Comece reforçando o Objetivo Final e a Fotografia definidos na sessão de Clareza Plena.</li>
                                        <li><strong>Engenharia Reversa:</strong> Pergunte: "Para que isso aconteça, o que deve ter ocorrido imediatamente antes?".</li>
                                        <li><strong>Critérios SMART:</strong> Cada marco (post-it) deve ser Específico, Mensurável, Atingível, Relevante e com Prazo.</li>
                                        <li><strong>Atalhos:</strong> Use <strong>TAB</strong> para criar novos marcos rapidamente e <strong>Backspace</strong> em campos vazios para remover.</li>
                                    </ul>
                                </div>
                                <div class="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_black]">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Perguntas de Provocação:</h4>
                                    <ul class="list-disc pl-4 space-y-1 text-xs">
                                        <li>"O que é estritamente necessário acontecer para que este marco seja alcançado?"</li>
                                        <li>"Olhando para este caminho, onde estão os maiores riscos de interrupção?"</li>
                                        <li>"Qual desses marcos, se alcançado, tornaria todos os outros mais fáceis?"</li>
                                        <li>"O que você pode fazer nas próximas 24h que inicia essa rota?"</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    </details>
                </div>

                <div class="bc-card p-8 mb-10">
                    <!-- Cabeçalho -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Coachee</label>
                            <input type="text" id="rota-name" class="persist input-field" placeholder="Nome">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Data</label>
                            <input type="date" id="rota-date" class="persist input-field">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Coach</label>
                            <input type="text" id="rota-coach" class="persist input-field" placeholder="Nome">
                        </div>
                    </div>

                    <div class="relative py-10 mt-4">
                        <div class="absolute left-1/2 top-0 bottom-0 w-2 bg-black -translate-x-1/2 hidden md:block"></div>

                        <div class="relative z-10 flex flex-col gap-8">
                            
                            <div class="flex flex-col md:flex-row items-center gap-4">
                                <div class="flex-1 text-right hidden md:block">
                                    <span class="font-black text-sm uppercase text-red-600">Onde quero chegar</span>
                                </div>
                                <div class="w-16 h-16 bg-[#ffde59] border-4 border-black flex items-center justify-center rounded-full shadow-[4px_4px_0px_0px_black] z-20">
                                    <i class="fas fa-flag-checkered text-2xl"></i>
                                </div>
                                <div class="flex-1 w-full bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_black]">
                                    <label class="font-black uppercase text-xs mb-2 block">Destino Final (Objetivo & Fotografia)</label>
                                    <textarea id="rota-destiny" class="persist input-field bg-transparent border-none p-0 focus:ring-0 font-bold text-lg auto-resize" placeholder="Descreva aqui o objetivo SMART e a fotografia de sucesso..."></textarea>
                                </div>
                            </div>

                            <div id="list-marcos" class="space-y-8">
                                </div>

                            <div class="flex justify-center my-4">
                                <button onclick="RotaTool.addMarco()" class="bg-black text-white px-6 py-3 border-4 border-black font-black uppercase text-sm hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_#ffde59] active:translate-y-1 active:shadow-none">
                                    <i class="fas fa-plus mr-2"></i> Inserir Marco SMART
                                </button>
                            </div>

                            <div class="flex flex-col md:flex-row items-center gap-4 pt-4">
                                <div class="flex-1 text-right hidden md:block">
                                    <span class="font-black text-sm uppercase">Ponto de Partida</span>
                                </div>
                                <div class="w-12 h-12 bg-black border-4 border-black text-white flex items-center justify-center rounded-full z-20">
                                    <i class="fas fa-walking"></i>
                                </div>
                                <div class="flex-1 w-full bg-gray-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_black]">
                                    <p class="font-black uppercase text-sm">Estado Atual (Hoje)</p>
                                    <p class="text-xs font-bold text-gray-500 italic uppercase">O caminho começa aqui.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Conclusão -->
                    <div class="space-y-8 mt-12 pt-8 border-t-2 border-black">
                        <div>
                            <label class="label-main">Pequena vitória</label>
                            <label class="label-reference">Que passo você vai realizar até nossa próxima sessão rumo ao seu objetivo?</label>
                            <textarea id="rota-victory" class="persist input-field min-h-[80px] auto-resize" placeholder="Um passo prático hoje..."></textarea>
                        </div>
                        <div>
                            <label class="label-main">Por que valeu a pena?</label>
                            <label class="label-reference">Por que valeu demais essa sessão pra você?</label>
                            <textarea id="rota-worthy" class="persist input-field min-h-[80px] auto-resize" placeholder="O que descobriu hoje..."></textarea>
                        </div>
                    </div>

                    <div class="no-print fixed bottom-0 left-0 w-full lg:bottom-8 lg:left-auto lg:right-8 lg:w-auto flex gap-3 p-4 lg:p-0 bg-white lg:bg-transparent border-t-4 border-black lg:border-t-0 z-50">
                        <button onclick="RotaTool.clearForm()" class="flex-1 lg:flex-none bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                            <i class="fas fa-trash-alt text-red-500 group-active:scale-90 transition-transform"></i>
                            <span class="font-black text-xs uppercase text-black">Limpar</span>
                        </button>
                        <button onclick="RotaTool.print()" class="flex-[2] lg:flex-none bg-[#ffde59] border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                            <i class="fas fa-print text-lg text-black group-active:scale-90 transition-transform"></i>
                            <span class="font-black text-xs uppercase text-black">Imprimir Relatório</span>
                        </button>
                    </div>
                    <div class="h-28 lg:hidden"></div>

                </div>
            </div>
        `;

            container.innerHTML = html;
            that.restore();  // Carrega os marcos salvos
        },
        addMarco: (text = '', focus = false) => {
            const container = document.getElementById('list-marcos');
            if (!container) return;

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
                <button class="remove-marco absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white border-2 border-black rounded-full flex items-center justify-center hover:bg-black transition-colors z-30">
                    <i class="fas fa-times"></i>
                </button>
                <textarea class="w-full bg-transparent border-none font-bold text-sm focus:ring-0 resize-none marco-input auto-resize" 
                          placeholder="Meta intermediária SMART..."
                          oninput="autoResize(this); RotaTool.save();"
                          onkeydown="RotaTool.handleKeydown(event, this)">${text}</textarea>
            </div>
        `;

            // Drag & Drop events
            div.addEventListener('dragstart', () => { div.classList.add('dragging'); div.style.opacity = "0.4"; });
            div.addEventListener('dragend', () => { div.classList.remove('dragging'); div.style.opacity = "1"; that.save(); });

            // Remove button
            div.querySelector('.remove-marco').addEventListener('click', function () { this.closest('.draggable-marco').remove(); that.save(); });

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

            that.save();
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

        restore: () => {
            const container = document.getElementById('list-marcos');
            if (!container) return;

            container.innerHTML = '';
            const saved = localStorage.getItem('rota-marcos-data');
            if (saved) {
                const marcos = JSON.parse(saved);
                marcos.forEach(m => that.addMarco(m, false));
            }

            const destiny = document.getElementById('rota-destiny');
            if (destiny) {
                destiny.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab' && !e.shiftKey) {
                        const firstMarco = document.querySelector('.marco-input');
                        if (!firstMarco) {
                            e.preventDefault();
                            that.addMarco('', true);
                        } else {
                            e.preventDefault();
                            firstMarco.focus();
                            firstMarco.setSelectionRange(firstMarco.value.length, firstMarco.value.length);
                        }
                    }
                });
            }
            that.initDragAndDrop();
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
                    @media print {
                        @page { size: A4; margin: 0; }
                        html, body { margin: 0; padding: 0; background: white !important; -webkit-print-color-adjust: exact; }
                        body { padding: 15mm; }
                        .page-break { page-break-after: always; break-after: page; }
                    }
                    
                    .report-container { font-family: 'Inter', sans-serif; width: 100%; }
                    
                    /* Cabeçalho */
                    .print-header { border-bottom: 4px solid #000; margin-bottom: 20px; padding-bottom: 10px; }
                    .info-grid { display: flex; gap: 8px; margin-top: 10px; }
                    .info-item { flex: 1; border: 2px solid #000; padding: 6px 10px; background: #ffde59 !important; }
                    .info-label { font-size: 8px; font-weight: 900; text-transform: uppercase; display: block; line-height: 1; margin-bottom: 2px; }
                    .info-content { font-size: 11px; font-weight: 800; text-transform: uppercase; }
                    
                    /* Seções de Texto */
                    .section-title { font-size: 16px; font-weight: 900; text-transform: uppercase; margin-top: 20px; margin-bottom: 6px; font-family: 'Space Grotesk'; border-left: 4px solid #ffde59; padding-left: 8px; }
                    .text-box-print { border: 2px solid #000; padding: 10px; white-space: pre-wrap; word-wrap: break-word; font-size: 14px; line-height: 1.4; text-align: left; background: white; margin-bottom: 10px; }
                    .footer-print { text-align: center; font-size: 9px; color: #999; text-transform: uppercase; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; }
                    
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
                        <div class="footer-print">
                            Kotini App - Gerado em ${new Date().toLocaleDateString('pt-BR')}
                        </div>
                    </div>
                </div>
            `;

                setTimeout(() => { window.print(); }, 500);
            } catch (e) { console.error("Erro na impressão:", e); }
        }
    };

    return that;
})();