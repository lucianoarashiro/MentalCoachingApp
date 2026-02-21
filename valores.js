window.ValoresTool = (function(){
    'use strict';
    const that = {
    load: () => {
        console.log('DEBUG: ValoresTool.load() called');
        const container = document.getElementById('view-tool-valores');
        console.log('DEBUG: valores.js container', container);
        if (!container) { console.log('DEBUG: valores.js load() early return: container not found'); return; }
        if (container.querySelector('#valores-main')) { console.log('DEBUG: valores.js load() early return: already built'); return; }

        const html = `
            <div id="valores-main">
                <div class="mb-6 flex justify-between items-center border-b-4 border-black pb-4">
                    <div class="w-20"></div>
                    <h2 class="font-black uppercase text-2xl">Ferramenta de Valores</h2>
                    <div class="w-20"></div>
                </div>

                <div class="no-print mb-8">
                    <details class="bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] group overflow-hidden transition-all">
                        <summary class="list-none cursor-pointer p-4 flex justify-between items-center font-black uppercase text-sm hover:bg-gray-50 transition-colors">
                            <span class="flex items-center gap-3">
                                <i class="fas fa-gem text-[#ffde59]"></i>
                                Roteiro e Orientações: Hierarquia de Valores
                            </span>
                            <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                        </summary>
                        
                        <div class="p-6 border-t-4 border-black bg-gray-50 space-y-4 text-sm leading-relaxed">
                            <div class="space-y-4 text-gray-800">
                                <p><strong>Objetivo:</strong> Identificar os motivadores internos que guiam as decisões e comportamentos do coachee.</p>
                                
                                <div class="grid md:grid-cols-2 gap-4">
                                    <div class="bg-white p-3 border-2 border-black">
                                        <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Como Aplicar:</h4>
                                        <ul class="list-disc pl-4 space-y-1 text-xs">
                                            <li><strong>Brainstorming:</strong> Peça para o coachee listar tudo o que é importante na vida dele (mínimo 10).</li>
                                            <li><strong>Triagem:</strong> Use o Drag & Drop para mover os mais importantes para a coluna do meio.</li>
                                            <li><strong>Hierarquia:</strong> No topo da última coluna, devem estar os valores inegociáveis.</li>
                                        </ul>
                                    </div>
                                    <div class="bg-white p-3 border-2 border-black">
                                        <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Perguntas de Refinamento:</h4>
                                        <ul class="list-disc pl-4 space-y-1 text-xs">
                                            <li>"Se você tivesse que escolher entre [Valor A] e [Valor B], qual manteria?"</li>
                                            <li>"Como esse valor se manifesta nas suas decisões diárias?"</li>
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
                            <input type="text" id="val-name" class="persist input-field" placeholder="Nome">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Data</label>
                            <input type="date" id="val-date" class="persist input-field">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Coach</label>
                            <input type="text" id="val-coach" class="persist input-field" placeholder="Nome">
                        </div>
                    </div>

                    <!-- Parte 1: Triagem -->
                    <div class="mb-12">
                        <h3 class="label-main">1. Triagem de Valores</h3>
                        <p class="label-reference">Selecione os valores no banco abaixo e arraste-os para a categoria que faz sentido agora.</p>
                        
                        <div class="mb-8">
                            <div class="flex flex-col md:flex-row justify-between items-end gap-4 mb-2">
                                <span class="text-[10px] font-black uppercase px-2 py-1 bg-gray-800 text-white w-fit">Banco de Valores</span>
                                <div class="flex gap-2 w-full md:w-auto">
                                    <input type="text" id="new-value-input" class="text-xs border-2 border-black p-1 uppercase font-bold outline-none" placeholder="Novo valor...">
                                    <button onclick="ValoresTool.addNewValue()" class="bg-black text-white px-3 py-1 text-[10px] font-black uppercase hover:bg-gray-800">Adicionar</button>
                                </div>
                            </div>
                            <div id="pool-values" class="drop-zone w-full min-h-[120px] bg-gray-100 p-4 rounded" ondragover="ValoresTool.allowDrop(event)" ondragenter="ValoresTool.dragEnter(event)" ondragleave="ValoresTool.dragLeave(event)" ondrop="ValoresTool.drop(event)"></div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div class="flex flex-col gap-2">
                                <span class="text-[10px] font-black uppercase text-center bg-red-500 text-white py-1">Nada a ver</span>
                                <div id="col-nada" class="drop-zone flex-1 min-h-[200px]" ondragover="ValoresTool.allowDrop(event)" ondragenter="ValoresTool.dragEnter(event)" ondragleave="ValoresTool.dragLeave(event)" ondrop="ValoresTool.drop(event)"></div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <span class="text-[10px] font-black uppercase text-center bg-blue-500 text-white py-1">Às vezes</span>
                                <div id="col-asvezes" class="drop-zone flex-1 min-h-[200px]" ondragover="ValoresTool.allowDrop(event)" ondragenter="ValoresTool.dragEnter(event)" ondragleave="ValoresTool.dragLeave(event)" ondrop="ValoresTool.drop(event)"></div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <span class="text-[10px] font-black uppercase text-center bg-green-500 text-white py-1">Tudo a ver</span>
                                <div id="col-tudo" class="drop-zone flex-1 min-h-[200px]" ondragover="ValoresTool.allowDrop(event)" ondragenter="ValoresTool.dragEnter(event)" ondragleave="ValoresTool.dragLeave(event)" ondrop="ValoresTool.drop(event)"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Parte 2: TOP 5 -->
                    <div class="mb-12 pt-8 border-t-4 border-black border-dashed">
                        <h3 class="label-main">2. O seu TOP 5 (Priorização)</h3>
                        <p class="label-reference">Arraste e <b>reordene</b> para definir a hierarquia (do 1º ao 5º).</p>
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-8 mt-6">
                            <div class="flex flex-col gap-2">
                                <span class="text-[10px] font-black uppercase text-center bg-yellow-400 py-1 border-2 border-black">RANKING FINAL (1º ao 5º)</span>
                                <div id="col-top5" class="drop-zone min-h-[250px] border-4 border-yellow-400" ondragover="ValoresTool.allowDrop(event)" ondragenter="ValoresTool.dragEnter(event)" ondragleave="ValoresTool.dragLeave(event)" ondrop="ValoresTool.drop(event)"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Conclusão -->
                    <div class="space-y-8 mt-12 pt-8 border-t-2 border-black">
                        <div>
                            <label class="label-main">Pequena vitória</label>
                            <label class="label-reference">Que passo você vai realizar até nossa próxima sessão rumo ao seu objetivo?</label>
                            <textarea id="val-victory" class="persist input-field min-h-[80px] auto-resize" placeholder="Um passo prático hoje..."></textarea>
                        </div>
                        <div>
                            <label class="label-main">Por que valeu a pena?</label>
                            <label class="label-reference">Por que valeu demais essa sessão pra você?</label>
                            <textarea id="val-worthy" class="persist input-field min-h-[80px] auto-resize" placeholder="O que descobriu hoje..."></textarea>
                        </div>
                    </div>

                    <div class="no-print fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-auto md:left-auto md:right-8 md:translate-x-0 flex gap-2 z-50">
    
                        <button onclick="ValoresTool.clearForm()" 
                                class="flex-1 lg:flex-none bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                            <i class="fas fa-trash-alt text-red-500 group-active:scale-90 transition-transform"></i>
                            <span class="font-black text-xs uppercase text-black">Limpar</span>
                        </button>
                        
                        <button onclick="ValoresTool.print()" 
                                class="flex-[2] lg:flex-none bg-[#ffde59] border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                            <i class="fas fa-print text-lg text-black group-active:scale-90 transition-transform"></i>
                            <span class="font-black text-xs uppercase text-black">Imprimir Relatório</span>
                        </button>
                    </div>

                    <div class="h-28 md:hidden"></div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        console.log('DEBUG: valores.js HTML injected', container.innerHTML.length);
        that.init();  // Carrega os valores salvos ou padrão
    },

    defaultList: [
        "Competitividade", "Aceitação social", "Compaixão", "Conforto", "Disciplina", 
        "Espiritualidade", "Contribuição", "Desafio", "Estabilidade", 
        "Evolução Permanente", "Excelência", "Fama", "Flexibilidade", "Honestidade", 
        "Independência", "Justiça", "Liberdade", "Poder", "Qualidade de vida", 
        "Reconhecimento", "Respeito", "Responsabilidade", "Rotina", "Segurança", 
        "Status", "Sucesso"
    ],

    allowDrop: (e) => e.preventDefault(),

    // No objeto ValoresTool em valores.js:

    // 1. Quando começa a arrastar
    drag: (e) => {
        e.dataTransfer.setData("text", e.target.id);
        e.target.classList.add('dragging'); // Opcional: opacidade no item sendo arrastado
    },

    // 2. Quando entra na zona de drop
    dragEnter: (e) => {
        e.preventDefault();
        let target = e.target;
        while(target && !target.classList.contains('drop-zone')) target = target.parentElement;
        
        if(target) {
            target.classList.add('drop-target-active');
        }
    },

    // 3. Quando sai da zona de drop
    dragLeave: (e) => {
        let target = e.target;
        while(target && !target.classList.contains('drop-zone')) target = target.parentElement;
        
        if(target) {
            target.classList.remove('drop-target-active');
        }
    },

    // 4. Ajuste na função drop original para limpar a classe
    drop: (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text");
        const el = document.getElementById(id);
        
        let target = e.target;
        while(target && !target.classList.contains('drop-zone')) target = target.parentElement;
        
        if(target) {
            target.classList.remove('drop-target-active'); // Limpa o destaque
            const afterElement = ValoresTool.getDragAfterElement(target, e.clientY);
            if (afterElement == null) {
                target.appendChild(el);
            } else {
                target.insertBefore(el, afterElement);
            }
            ValoresTool.cleanupAllTags();
            ValoresTool.updateRankingNumbers();
            ValoresTool.save();
        }
    },

    getDragAfterElement: (container, y) => {
        const draggableElements = [...container.querySelectorAll('.value-tag:not(.grabbing)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    },

    cleanupAllTags: () => {
        document.querySelectorAll('.value-tag').forEach(tag => tag.style.opacity = "1");
    },

    updateRankingNumbers: () => {
        const items = document.querySelectorAll('#col-top5 .value-tag');
        items.forEach((item, index) => {
            const badge = item.querySelector('.rank-badge');
            if (badge) badge.innerText = `${index + 1}º`;
            if (index >= 5) item.style.opacity = "0.4";
        });
    },

    createTag: (text, id, isCustom = false) => {
        const el = document.createElement('div');
        el.className = 'value-tag';
        el.draggable = true;
        el.id = id || `v-${Math.random().toString(36).substr(2, 9)}`;
        el.dataset.custom = isCustom;
        
        const badge = document.createElement('div');
        badge.className = 'rank-badge';
        badge.innerText = '-';
        el.appendChild(badge);

        const span = document.createElement('span');
        span.innerText = text;
        el.appendChild(span);

        if (isCustom) {
            const del = document.createElement('div');
            del.className = 'delete-btn no-print';
            del.innerHTML = '<i class="fas fa-times"></i>';
            del.onclick = (e) => { e.stopPropagation(); el.remove(); ValoresTool.updateRankingNumbers(); ValoresTool.save(); };
            el.appendChild(del);
        }

        el.ondragstart = (e) => { el.classList.add('grabbing'); e.dataTransfer.setData("text", e.target.id); };
        el.ondragend = () => { el.classList.remove('grabbing'); ValoresTool.updateRankingNumbers(); };
        return el;
    },

    addNewValue: () => {
        const input = document.getElementById('new-value-input');
        const val = input.value.trim();
        if (val) {
            document.getElementById('pool-values').appendChild(ValoresTool.createTag(val, null, true));
            input.value = '';
            ValoresTool.save();
        }
    },

    init: () => {
        const pool = document.getElementById('pool-values');
        if (!pool) return;
        pool.innerHTML = '';
        ValoresTool.defaultList.forEach((v, i) => pool.appendChild(ValoresTool.createTag(v, `val-${i}`, false)));
        ValoresTool.save();
    },

    reset: () => {
        if(confirm("Deseja resetar todas as posições?")) {
            const zones = ['pool-values', 'col-nada', 'col-asvezes', 'col-tudo', 'pool-top5', 'col-top5'];
            zones.forEach(z => localStorage.removeItem(`zone-${z}`));
            location.reload();
        }
    },

    save: () => {
        const zones = ['pool-values', 'col-nada', 'col-asvezes', 'col-tudo', 'pool-top5', 'col-top5'];
        zones.forEach(z => {
            const container = document.getElementById(z);
            if (container) {
                const data = Array.from(container.children).map(c => ({
                    text: c.querySelector('span').innerText,
                    isCustom: c.dataset.custom === "true"
                }));
                localStorage.setItem(`zone-${z}`, JSON.stringify(data));
            }
        });
    },

    load: () => {
        const container = document.getElementById('view-tool-valores');
        if (!container) return;
        if (container.querySelector('#valores-main')) return; // already built

        const html = `
            <div id="valores-main">
                <div class="mb-6 flex justify-between items-center border-b-4 border-black pb-4">
                    <div class="w-20"></div>
                    <h2 class="font-black uppercase text-2xl">Ferramenta de Valores</h2>
                    <div class="w-20"></div>
                </div>
                <div class="no-print mb-8">
                    <details class="bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] group overflow-hidden transition-all">
                        <summary class="list-none cursor-pointer p-4 flex justify-between items-center font-black uppercase text-sm hover:bg-gray-50 transition-colors">
                            <span class="flex items-center gap-3">
                                <i class="fas fa-gem text-[#ffde59]"></i>
                                Roteiro e Orientações: Hierarquia de Valores
                            </span>
                            <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                        </summary>
                        <div class="p-6 border-t-4 border-black bg-gray-50 space-y-4 text-sm leading-relaxed">
                            <div class="space-y-4 text-gray-800">
                                <p><strong>Objetivo:</strong> Identificar os motivadores internos que guiam as decisões e comportamentos do coachee.</p>
                                <div class="grid md:grid-cols-2 gap-4">
                                    <div class="bg-white p-3 border-2 border-black">
                                        <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Como Aplicar:</h4>
                                        <ul class="list-disc pl-4 space-y-1 text-xs">
                                            <li><strong>Brainstorming:</strong> Peça para o coachee listar tudo o que é importante na vida dele (mínimo 10).</li>
                                            <li><strong>Triagem:</strong> Use o Drag & Drop para mover os mais importantes para a coluna do meio.</li>
                                            <li><strong>Hierarquia:</strong> No topo da última coluna, devem estar os valores inegociáveis.</li>
                                        </ul>
                                    </div>
                                    <div class="bg-white p-3 border-2 border-black">
                                        <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Perguntas de Refinamento:</h4>
                                        <ul class="list-disc pl-4 space-y-1 text-xs">
                                            <li>"Se você tivesse que escolher entre [Valor A] e [Valor B], qual manteria?"</li>
                                            <li>"Como esse valor se manifesta nas suas decisões diárias?"</li>
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
                            <input type="text" id="val-name" class="persist input-field" placeholder="Nome">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Data</label>
                            <input type="date" id="val-date" class="persist input-field">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Coach</label>
                            <input type="text" id="val-coach" class="persist input-field" placeholder="Nome">
                        </div>
                    </div>
                    <!-- Parte 1: Triagem -->
                    <div class="mb-12">
                        <h3 class="label-main">1. Triagem de Valores</h3>
                        <p class="label-reference">Selecione os valores no banco abaixo e arraste-os para a categoria que faz sentido agora.</p>
                        <div class="mb-8">
                            <div class="flex flex-col md:flex-row justify-between items-end gap-4 mb-2">
                                <span class="text-[10px] font-black uppercase px-2 py-1 bg-gray-800 text-white w-fit">Banco de Valores</span>
                                <div class="flex gap-2 w-full md:w-auto">
                                    <input type="text" id="new-value-input" class="text-xs border-2 border-black p-1 uppercase font-bold outline-none" placeholder="Novo valor...">
                                    <button onclick="ValoresTool.addNewValue()" class="bg-black text-white px-3 py-1 text-[10px] font-black uppercase hover:bg-gray-800">Adicionar</button>
                                </div>
                            </div>
                            <div id="pool-values" class="drop-zone w-full min-h-[120px] bg-gray-100 p-4 rounded" ondragover="ValoresTool.allowDrop(event)" ondragenter="ValoresTool.dragEnter(event)" ondragleave="ValoresTool.dragLeave(event)" ondrop="ValoresTool.drop(event)"></div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div class="flex flex-col gap-2">
                                <span class="text-[10px] font-black uppercase text-center bg-red-500 text-white py-1">Nada a ver</span>
                                <div id="col-nada" class="drop-zone flex-1 min-h-[200px]" ondragover="ValoresTool.allowDrop(event)" ondragenter="ValoresTool.dragEnter(event)" ondragleave="ValoresTool.dragLeave(event)" ondrop="ValoresTool.drop(event)"></div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <span class="text-[10px] font-black uppercase text-center bg-blue-500 text-white py-1">Às vezes</span>
                                <div id="col-asvezes" class="drop-zone flex-1 min-h-[200px]" ondragover="ValoresTool.allowDrop(event)" ondragenter="ValoresTool.dragEnter(event)" ondragleave="ValoresTool.dragLeave(event)" ondrop="ValoresTool.drop(event)"></div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <span class="text-[10px] font-black uppercase text-center bg-green-500 text-white py-1">Tudo a ver</span>
                                <div id="col-tudo" class="drop-zone flex-1 min-h-[200px]" ondragover="ValoresTool.allowDrop(event)" ondragenter="ValoresTool.dragEnter(event)" ondragleave="ValoresTool.dragLeave(event)" ondrop="ValoresTool.drop(event)"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Parte 2: TOP 5 -->
                    <div class="mb-12 pt-8 border-t-4 border-black border-dashed">
                        <h3 class="label-main">2. O seu TOP 5 (Priorização)</h3>
                        <p class="label-reference">Arraste e <b>reordene</b> para definir a hierarquia (do 1º ao 5º).</p>
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-8 mt-6">
                            <div class="flex flex-col gap-2">
                                <span class="text-[10px] font-black uppercase text-center bg-yellow-400 py-1 border-2 border-black">RANKING FINAL (1º ao 5º)</span>
                                <div id="col-top5" class="drop-zone min-h-[250px] border-4 border-yellow-400" ondragover="ValoresTool.allowDrop(event)" ondragenter="ValoresTool.dragEnter(event)" ondragleave="ValoresTool.dragLeave(event)" ondrop="ValoresTool.drop(event)"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Conclusão -->
                    <div class="space-y-8 mt-12 pt-8 border-t-2 border-black">
                        <div>
                            <label class="label-main">Pequena vitória</label>
                            <label class="label-reference">Que passo você vai realizar até nossa próxima sessão rumo ao seu objetivo?</label>
                            <textarea id="val-victory" class="persist input-field min-h-[80px] auto-resize" placeholder="Um passo prático hoje..."></textarea>
                        </div>
                        <div>
                            <label class="label-main">Por que valeu a pena?</label>
                            <label class="label-reference">Por que valeu demais essa sessão pra você?</label>
                            <textarea id="val-worthy" class="persist input-field min-h-[80px] auto-resize" placeholder="O que descobriu hoje..."></textarea>
                        </div>
                    </div>
                    <div class="no-print fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-auto md:left-auto md:right-8 md:translate-x-0 flex gap-2 z-50">
                        <button onclick="ValoresTool.clearForm()" class="flex-1 lg:flex-none bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                            <i class="fas fa-trash-alt text-red-500 group-active:scale-90 transition-transform"></i>
                            <span class="font-black text-xs uppercase text-black">Limpar</span>
                        </button>
                        <button onclick="ValoresTool.print()" class="flex-[2] lg:flex-none bg-[#ffde59] border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                            <i class="fas fa-print text-lg text-black group-active:scale-90 transition-transform"></i>
                            <span class="font-black text-xs uppercase text-black">Imprimir Relatório</span>
                        </button>
                    </div>
                    <div class="h-28 md:hidden"></div>
                </div>
            </div>
        `;
        container.innerHTML = html;
        that.init();
    },

    clearForm: () => {
        if (confirm("Deseja realmente limpar toda a Hierarquia de Valores? Isso resetará as listas e os textos.")) {
            // 1. Limpa os campos de texto finais
            const fields = ['val-victory', 'val-worthy', 'val-name', 'val-coach', 'val-date'];
            fields.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.value = '';
                    localStorage.removeItem(id);
                }
            });

            // 2. Limpa os dados do LocalStorage específicos da ferramenta de valores
            localStorage.removeItem('valores-data'); // Se você usa esse objeto para a lista
            // Se você salva os itens individualmente, adicione a lógica aqui. 
            const zones = ['pool-values', 'col-nada', 'col-asvezes', 'col-tudo', 'pool-top5', 'col-top5'];
            zones.forEach(z => localStorage.removeItem(`zone-${z}`));
            location.reload();
            // Como padrão do seu app.js, vamos limpar o que for persist:
            document.querySelectorAll('#view-valores .persist').forEach(el => {
                localStorage.removeItem(el.id);
                el.value = '';
            });

            // 3. Força o recarregamento mantendo a view ativa
            window.location.hash = 'tool-valores';
            window.location.reload();
        }
    },

    print: () => {
        try {
            // Função auxiliar para capturar valores com os novos IDs específicos
            const getVal = (id) => {
                const el = document.getElementById(id);
                return el && el.value ? el.value : '---';
            };
            
            // 1. CAPTURA DE DADOS DO CABEÇALHO (IDs atualizados conforme sua solicitação)
            const coachee = getVal('val-name').toUpperCase();
            const coach = getVal('val-coach').toUpperCase();
            const data = getVal('val-date');

            // 2. CAPTURA DE DADOS DE CONCLUSÃO
            const vitoria = getVal('val-victory');
            const valeuPena = getVal('val-worthy');

            const printArea = document.getElementById('print-area');
            if (!printArea) return;

            // 3. MONTAGEM DO CONTEÚDO (Mantendo o layout solicitado anteriormente)
            printArea.innerHTML = `
                <style>
                    @media print {
                        @page { size: A4; margin: 10mm; }
                        body { background: white !important; -webkit-print-color-adjust: exact; }
                    }
                    .report-table { width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; }
                    .print-header { border-bottom: 4px solid #000; margin-bottom: 20px; padding-bottom: 10px; }
                    .info-grid { display: flex; gap: 10px; margin-top: 10px; }
                    .info-item { flex: 1; border: 2px solid #000; padding: 5px 10px; background: #ffde59 !important; }
                    .info-label { font-size: 8px; font-weight: 800; text-transform: uppercase; display: block; color: #000; }
                    .info-content { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #000; }

                    .triagem-container { display: flex; gap: 10px; margin-bottom: 20px; align-items: flex-start; }
                    .col-print { flex: 1; border: 2px solid #000; background: #fff; min-height: 380px; }
                    .col-header-print { background: #000; color: #fff; padding: 6px; text-align: center; font-weight: 800; text-transform: uppercase; font-size: 9px; }
                    .value-item-print { padding: 5px 8px; border-bottom: 1px solid #eee; font-size: 10px; }

                    .ranking-row { border: 3px solid #000; background: #fffde5 !important; margin-top: 10px; }
                    .ranking-header { background: #ffde59; color: #000; padding: 8px; text-align: center; font-weight: 900; text-transform: uppercase; font-size: 12px; border-bottom: 3px solid #000; }
                    .ranking-list { display: grid; grid-template-columns: repeat(5, 1fr); padding: 10px; gap: 8px; }
                    .ranking-slot { text-align: center; padding: 8px; border: 1px dashed #000; background: #fff; }

                    .capa-box { border: 2px solid #000; padding: 12px; margin-bottom: 15px; background: #f9f9f9 !important; font-size: 12px; white-space: pre-wrap; }
                    .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; margin-bottom: 5px; font-family: 'Space Grotesk'; }
                </style>

                <table class="report-table">
                    <thead>
                        <tr>
                            <td>
                                <div class="print-header">
                                    <div style="display:flex; justify-content:space-between; align-items:center">
                                        <h1 style="font-family:'Space Grotesk'; font-size:16px; font-weight:900; margin:0">HIERARQUIA DE VALORES</h1>
                                        <span style="font-size:8px; font-weight:700">MASTER PERFORMANCE SYSTEM</span>
                                    </div>
                                    <div class="info-grid">
                                        <div class="info-item"><span class="info-label">Coachee</span><div class="info-content">${coachee}</div></div>
                                        <div class="info-item"><span class="info-label">Coach</span><div class="info-content">${coach}</div></div>
                                        <div class="info-item"><span class="info-label">Data</span><div class="info-content">${data}</div></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <h3 class="section-title">Pequena Vitória (Próximo Passo)</h3>
                                <div class="capa-box">${vitoria}</div>
                                
                                <h3 class="section-title">Por que valeu a pena?</h3>
                                <div class="capa-box">${valeuPena}</div>

                                <div style="page-break-before: always; margin-top: 20px;"></div>

                                <h3 class="section-title">Triagem de Valores</h3>
                                <div class="triagem-container">
                                    <div class="col-print">
                                        <div class="col-header-print">Nada a ver</div>
                                        ${Array.from(document.querySelectorAll('#col-nada .value-tag')).map(el => `<div class="value-item-print">${el.innerText.replace('×', '').trim()}</div>`).join('') || '<div class="value-item-print">---</div>'}
                                    </div>
                                    <div class="col-print">
                                        <div class="col-header-print">Às vezes</div>
                                        ${Array.from(document.querySelectorAll('#col-asvezes .value-tag')).map(el => `<div class="value-item-print">${el.innerText.replace('×', '').trim()}</div>`).join('') || '<div class="value-item-print">---</div>'}
                                    </div>
                                    <div class="col-print">
                                        <div class="col-header-print">Tudo a ver</div>
                                        ${Array.from(document.querySelectorAll('#col-tudo .value-tag')).map(el => `<div class="value-item-print">${el.innerText.replace('×', '').trim()}</div>`).join('') || '<div class="value-item-print">---</div>'}
                                    </div>
                                </div>

                                <h3 class="section-title">Hierarquia Final</h3>
                                <div class="ranking-row">
                                    <div class="ranking-header">RANKING FINAL (1º ao 5º)</div>
                                    <div class="ranking-list">
                                        ${Array.from(document.querySelectorAll('#col-top5 .value-tag')).slice(0, 5).map((el, index) => `
                                            <div class="ranking-slot">
                                                <div style="font-size: 8px; font-weight: 800; border-bottom: 1px solid #000; margin-bottom: 4px;">${index + 1}º LUGAR</div>
                                                <div style="font-size: 10px; font-weight: 700;">${el.innerText.replace('×', '').trim()}</div>
                                            </div>
                                        `).join('') || '<div style="grid-column: span 5; text-align:center; padding:10px;">Nenhum valor ranqueado</div>'}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;

            setTimeout(() => { window.print(); }, 500);
        } catch (e) { 
            console.error("Erro na impressão de Valores:", e);
        }
    }
    };

    return that;
})();