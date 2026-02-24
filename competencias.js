/* Roda de Competências Tool - Dynamic Competencies (3-10) */
window.CompetenciasTool = (function () {
    'use strict';
    const STORAGE_DATA_KEY = 'competencias-items';
    const STORAGE_META_KEY = 'competencias-meta';
    const MIN_COMPETENCIES = 3;
    const MAX_COMPETENCIES = 10;
    let chart = null;
    let editMode = 'chart'; // 'table' or 'chart'
    let currentCommentIndex = null;

    function load() {
        const container = document.getElementById('view-competencias');
        if (!container) return;
        if (container.querySelector('#comp-main')) return; // already built

        const html = `
            <div id="comp-main" class="max-w-5xl mx-auto">
                <!-- HEADER -->
                <div class="mb-6 flex justify-between items-center border-b-4 border-black pb-4">
                    <div class="w-20"></div>
                    <h2 class="font-black uppercase text-2xl">Roda de Competências</h2>
                    <div class="w-20"></div>
                </div>

                <!-- METADATA -->
                <div class="bc-card p-6 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Coachee</label>
                            <input type="text" id="comp-name" class="persist input-field" placeholder="Nome do cliente">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Data</label>
                            <input type="date" id="comp-date" class="persist input-field">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Coach</label>
                            <input type="text" id="comp-coach" class="persist input-field" placeholder="Nome do coach">
                        </div>
                    </div>

                    <div>
                        <label class="label-main">Objetivo / Meta</label>
                        <label class="label-reference">Qual é o objetivo ou meta para o qual essas competências são necessárias?</label>
                        <textarea id="comp-objetivo" class="persist input-field min-h-[80px] auto-resize"></textarea>
                    </div>
                </div>

                <!-- STEP 1: DEFINE COMPETENCIES -->
                <div id="section-define" class="bc-card p-6 mb-6">
                    <h3 class="label-main mb-2">Passo 1: Descreva as Competências</h3>
                    <p class="label-reference mb-4">Mínimo 3, máximo 10 competências. Use <strong>Tab</strong> para adicionar, <strong>Backspace</strong> em campo vazio para remover.</p>
                    <div id="comp-define-list" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"></div>
                    <button id="btn-add-competency" onclick="CompetenciasTool.addCompetency()" class="w-full bg-white border-3 border-black p-2 font-bold uppercase mb-4 hover:bg-gray-100 transition-colors">+ Adicionar Competência</button>
                    <button onclick="CompetenciasTool.proceedToRate()" class="w-full bg-[#ffde59] border-4 border-black p-3 font-black uppercase">Próximo: Editar Notas →</button>
                </div>

                <!-- MODE TOGGLE (visible after step 1) -->
                <div id="section-toggle" class="hidden bc-card p-6 mb-6">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                        <label class="font-black uppercase text-sm">Modo de Edição:</label>
                        <div class="flex flex-wrap justify-center gap-3">
                            <button onclick="CompetenciasTool.setMode('table')" id="btn-mode-table" class="px-6 py-3 md:px-4 md:py-2 border-2 border-black font-bold text-sm bg-[#ffde59] shadow-[2px_2px_0px_0px_black] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all">
                                <i class="fas fa-table"></i> Tabela
                            </button>
                            <button onclick="CompetenciasTool.setMode('chart')" id="btn-mode-chart" class="px-6 py-3 md:px-4 md:py-2 border-2 border-black font-bold text-sm bg-white shadow-[2px_2px_0px_0px_black] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all">
                                <i class="fas fa-chart-radar"></i> Gráfico
                            </button>
                            <button onclick="CompetenciasTool.backToDefine()" class="px-6 py-3 md:px-4 md:py-2 border-2 border-black font-bold text-sm bg-white shadow-[2px_2px_0px_0px_black] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all">
                                ← Voltar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- TABLE MODE -->
                <div id="mode-table" class="hidden bc-card p-6 mb-6">
                    <h3 class="label-main mb-4">Edite as Notas (1-10) e Comentários</h3>
                    <p class="label-reference mb-4">Clique no nome da competência para editar comentário rapidamente.</p>
                    <div id="comp-table-list" class="space-y-3"></div>
                </div>

                <!-- CHART MODE -->
                <div id="mode-chart" class="hidden bc-card p-6 mb-6">
                    <h3 class="label-main mb-2">Gráfico Interativo - Radar de Competências</h3>
                    <p class="label-reference mb-4">Arraste os pontos para ajustar notas (💬 = tem comentário). Clique no ponto ou clique direito para editar comentário.</p>
                    <div class="mt-6">
                        <canvas id="competencias-chart" height="220"></canvas>
                    </div>
                </div>

                <!-- REFLECTION SECTION -->
                <div class="bc-card p-6 mb-6">
                    <h3 class="label-main mb-4">Reflexão e Conclusões</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="label-reference">De uma forma geral, olhando para a sua Roda de Competências, o que você percebe?</label>
                            <textarea id="comp-reflection" class="persist input-field min-h-[80px] auto-resize"></textarea>
                        </div>
                        <div>
                            <label class="label-reference">Qual competência que, se você der mais atenção agora, potencializa as chances de você melhorar os seus resultados como um todo?</label>
                            <input id="comp-priority" class="persist input-field" placeholder="Nome da competência prioritária">
                        </div>
                        <div>
                            <label class="label-main">Pequena vitória</label>
                            <textarea id="comp-victory" class="persist input-field min-h-[80px] auto-resize"></textarea>
                        </div>
                        <div>
                            <label class="label-main">Por que valeu a pena?</label>
                            <textarea id="comp-worthy" class="persist input-field min-h-[80px] auto-resize"></textarea>
                        </div>
                    </div>
                </div>

                <!-- COMMENT MODAL -->
                <div id="comp-comment-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
                    <div class="bg-white border-4 border-black p-6 max-w-md w-full shadow-[8px_8px_0px_0px_black]">
                        <h3 class="font-black uppercase text-lg mb-2" id="comp-modal-title">Editar Comentário</h3>
                        <p class="text-sm mb-4 text-gray-600" id="comp-modal-label">Competência X - Nota: 7/10</p>
                        <textarea id="comp-modal-textarea" class="input-field w-full min-h-[100px] mb-4 auto-resize" placeholder="Adicione um comentário sobre essa competência..."></textarea>
                        <div class="flex gap-3">
                            <button onclick="CompetenciasTool.closeCommentModal()" class="flex-1 bg-white border-2 border-black p-2 font-bold">Cancelar</button>
                            <button onclick="CompetenciasTool.saveCommentFromModal()" class="flex-1 bg-[#ffde59] border-2 border-black p-2 font-bold">Salvar</button>
                            <button onclick="CompetenciasTool.deleteCommentFromModal()" class="flex-1 bg-red-200 border-2 border-red-500 p-2 font-bold text-red-700">Deletar</button>
                        </div>
                    </div>
                </div>

                <!-- BUTTONS -->
                <div class="no-print fixed bottom-0 left-0 w-full lg:bottom-8 lg:left-auto lg:right-8 lg:w-auto flex gap-3 p-4 lg:p-0 bg-white lg:bg-transparent border-t-4 border-black lg:border-t-0 z-50">
                    <button onclick="CompetenciasTool.clearForm()" class="flex-1 lg:flex-none bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-trash-alt text-red-500"></i>
                        <span class="font-black text-xs uppercase">Limpar</span>
                    </button>
                    <button onclick="CompetenciasTool.print()" class="flex-[2] lg:flex-none bg-[#ffde59] border-4 border-black p-3 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-print text-lg text-black"></i>
                        <span class="font-black text-xs uppercase">Imprimir relatório</span>
                    </button>
                </div>
                
                <div class="h-28 lg:hidden"></div>
            </div>
        `;
        container.insertAdjacentHTML('afterbegin', html);
        buildUI();
        restoreData();
    }

    function buildUI() {
        // Initialize with MIN_COMPETENCIES competencies
        rebuildDefineList();
        rebuildTableList();
    }

    function rebuildDefineList() {
        const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
        const count = Math.max(data.length || 0, MIN_COMPETENCIES);
        const defineList = document.getElementById('comp-define-list');

        defineList.innerHTML = ''; // Clear existing

        for (let i = 0; i < count; i++) {
            const item = data[i] || { label: '', score: 5, comment: '' };
            const div = document.createElement('div');
            div.className = 'p-3 border-2 border-black bg-white relative';
            div.innerHTML = `
                <label class="text-[10px] font-black block mb-1">Competência ${i + 1}</label>
                <div class="flex gap-2">
                    <input id="comp-label-${i}" class="persist input-field text-sm comp-label-input flex-1" placeholder="Descreva a competência" value="${item.label || ''}">
                    ${count > MIN_COMPETENCIES ? `<button onclick="CompetenciasTool.removeCompetency(${i})" class="bg-red-200 border-2 border-red-500 text-red-700 font-bold px-3 py-2 hover:bg-red-300 transition-colors" title="Excluir competência">
                        <i class="fas fa-trash"></i>
                    </button>` : ''}
                </div>
            `;
            defineList.appendChild(div);

            // Attach keyboard listeners
            const input = div.querySelector('input');
            input.addEventListener('keydown', (e) => handleLabelKeydown(e, i));
            input.addEventListener('change', () => saveLabelData());
        }

        // Update button visibility
        const btnAdd = document.getElementById('btn-add-competency');
        if (btnAdd) btnAdd.style.display = count >= MAX_COMPETENCIES ? 'none' : 'block';
    }

    function rebuildTableList() {
        const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
        const count = Math.max(data.length || 0, MIN_COMPETENCIES);
        const tableList = document.getElementById('comp-table-list');

        tableList.innerHTML = ''; // Clear existing

        for (let i = 0; i < count; i++) {
            const item = data[i] || { label: '', score: 5, comment: '' };
            const div = document.createElement('div');
            div.className = 'p-4 border-2 border-black bg-white grid grid-cols-12 gap-3 items-start md:p-3 md:gap-2';
            div.innerHTML = `
                <div class="col-span-8 md:col-span-5">
                    <label class="text-[9px] font-black block mb-1">Competência</label>
                    <div id="comp-table-name-${i}" class="font-bold p-2 bg-gray-100 min-h-[48px] md:min-h-[40px] flex items-center text-sm cursor-pointer hover:bg-yellow-100 transition-colors" title="Clique para editar comentário">${item.label || `Competência ${i + 1}`}</div>
                </div>
                <div class="col-span-4 md:col-span-2">
                    <label class="text-[9px] font-black block mb-1">Nota</label>
                    <input id="comp-score-${i}" type="number" min="1" max="10" value="${item.score || 5}" class="persist input-field text-center text-xl md:text-lg font-black bg-yellow-50 md:bg-white h-[48px] md:h-auto" oninput="CompetenciasTool.saveData();">
                </div>
                <div class="col-span-12 md:col-span-5">
                    <label class="text-[9px] font-black block mb-1">Comentário</label>
                    <textarea id="comp-comment-${i}" class="persist input-field text-xs min-h-[48px] md:min-h-[40px] auto-resize" placeholder="Obs..." oninput="CompetenciasTool.autoResizeTextarea(this); CompetenciasTool.saveData();">${item.comment || ''}</textarea>
                </div>
            `;
            tableList.appendChild(div); // Insert into DOM

            // Attach click listener to table name for comment editing (ONLY on desktop)
            const nameEl = div.querySelector(`#comp-table-name-${i}`);
            if (window.innerWidth > 768) {
                nameEl.addEventListener('click', () => openCommentModal(i));
            } else {
                nameEl.classList.remove('cursor-pointer', 'hover:bg-yellow-100');
                nameEl.title = "";
            }
        }
    }

    function handleLabelKeydown(e, index) {
        const input = e.target;
        const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
        const count = Math.max(data.length || 0, MIN_COMPETENCIES);

        // Tab: Add new competency or go to next
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            saveLabelData();
            if (index === count - 1 && count < MAX_COMPETENCIES) {
                addCompetency();
                setTimeout(() => {
                    const nextInput = document.querySelector(`#comp-label-${count}`);
                    if (nextInput) nextInput.focus();
                }, 0);
            } else if (index < count - 1) {
                const nextInput = document.querySelector(`#comp-label-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }

        // Backspace on empty field: Remove competency or move to previous
        if (e.key === 'Backspace' && input.value === '') {
            e.preventDefault();
            if (index > MIN_COMPETENCIES - 1) {
                removeCompetency(index);
                setTimeout(() => {
                    const prevInput = document.querySelector(`#comp-label-${index - 1}`);
                    if (prevInput) {
                        prevInput.focus();
                        const length = prevInput.value.length;
                        prevInput.setSelectionRange(length, length);
                    }
                }, 0);
            } else if (index > 0) {
                const prevInput = document.querySelector(`#comp-label-${index - 1}`);
                if (prevInput) {
                    prevInput.focus();
                    const length = prevInput.value.length;
                    prevInput.setSelectionRange(length, length);
                }
            }
        }
    }

    function saveLabelData() {
        const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
        const count = Math.max(document.querySelectorAll('.comp-label-input').length, MIN_COMPETENCIES);

        // Ensure array is large enough
        while (data.length < count) {
            data.push({ label: '', score: 5, comment: '' });
        }

        for (let i = 0; i < count; i++) {
            const input = document.querySelector(`#comp-label-${i}`);
            if (input && data[i]) {
                data[i].label = input.value;
            }
        }

        localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));
    }

    function addCompetency() {
        const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
        if (data.length < MAX_COMPETENCIES) {
            data.push({ label: '', score: 5, comment: '' });
            localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));
            rebuildDefineList();
            rebuildTableList();
        }
    }

    function removeCompetency(index) {
        const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
        const count = Math.max(data.length || 0, MIN_COMPETENCIES);

        // Don't allow removing below MIN_COMPETENCIES
        if (count <= MIN_COMPETENCIES) return;

        data.splice(index, 1);
        localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));
        rebuildDefineList();
        rebuildTableList();

        // Refresh chart if in chart mode
        if (editMode === 'chart' && chart) {
            renderChart(data);
        }
    }

    function autoResizeTextarea(textarea) {
        if (!textarea) return;
        // Set height to auto first
        textarea.style.height = 'auto';
        // Force browser reflow/recalculation
        const _ = textarea.offsetHeight;
        // Now read scrollHeight and set proper height
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }

    function restoreData() {
        const meta = localStorage.getItem(STORAGE_META_KEY);
        const metaData = meta ? JSON.parse(meta) : {};
        const data = localStorage.getItem(STORAGE_DATA_KEY);
        const items = data ? JSON.parse(data) : [];

        // Restore meta
        document.getElementById('comp-name').value = metaData.name || '';
        document.getElementById('comp-date').value = metaData.date || '';
        document.getElementById('comp-coach').value = metaData.coach || '';
        document.getElementById('comp-objetivo').value = metaData.objetivo || '';
        document.getElementById('comp-reflection').value = metaData.reflection || '';
        document.getElementById('comp-priority').value = metaData.priority || '';
        document.getElementById('comp-victory').value = metaData.victory || '';
        document.getElementById('comp-worthy').value = metaData.worthy || '';

        // Initialize with MIN_COMPETENCIES competencies if needed
        if (items.length < MIN_COMPETENCIES) {
            while (items.length < MIN_COMPETENCIES) {
                items.push({ label: '', score: 5, comment: '' });
            }
            localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(items));
        }

        // If data complete, show toggle instead of define
        if (items.length >= MIN_COMPETENCIES && items[0].label) {
            document.getElementById('section-define').classList.add('hidden');
            document.getElementById('section-toggle').classList.remove('hidden');
            renderChart(items);

            // After DOM and styles are fully ready, resize all comment textareas that have content
            setTimeout(() => {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].comment && items[i].comment.trim()) {
                        const commentEl = document.getElementById(`comp-comment-${i}`);
                        if (commentEl) {
                            autoResizeTextarea(commentEl);
                        }
                    }
                }
                // Also trigger setMode to ensure table rendering and resize
                setMode('table');
            }, 300);
        }
    }

    function proceedToRate() {
        saveDefinitions();
        document.getElementById('section-define').classList.add('hidden');
        document.getElementById('section-toggle').classList.remove('hidden');
        const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
        renderChart(data);
        setMode('table');
    }

    function backToDefine() {
        document.getElementById('section-define').classList.remove('hidden');
        document.getElementById('section-toggle').classList.add('hidden');
        document.getElementById('mode-table').classList.add('hidden');
        document.getElementById('mode-chart').classList.add('hidden');
    }

    function saveDefinitions() {
        saveLabelData(); // This now handles dynamic saving
        rebuildTableList();
    }

    function setMode(mode) {
        editMode = mode;
        document.getElementById('mode-table').classList.toggle('hidden', mode !== 'table');
        document.getElementById('mode-chart').classList.toggle('hidden', mode !== 'chart');
        document.getElementById('btn-mode-table').classList.toggle('bg-[#ffde59]', mode === 'table');
        document.getElementById('btn-mode-table').classList.toggle('bg-white', mode !== 'table');
        document.getElementById('btn-mode-chart').classList.toggle('bg-[#ffde59]', mode === 'chart');
        document.getElementById('btn-mode-chart').classList.toggle('bg-white', mode !== 'chart');
        if (mode === 'chart') {
            setTimeout(() => {
                const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
                renderChart(data);
                if (chart) chart.resize();
            }, 100);
        } else if (mode === 'table') {
            // When switching to table mode, resize all comment textareas
            setTimeout(() => {
                const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
                for (let i = 0; i < data.length; i++) {
                    if (data[i].comment && data[i].comment.trim()) {
                        const commentEl = document.getElementById(`comp-comment-${i}`);
                        if (commentEl) {
                            autoResizeTextarea(commentEl);
                        }
                    }
                }
            }, 50);
        }
    }

    function saveData() {
        const data = localStorage.getItem(STORAGE_DATA_KEY);
        const items = data ? JSON.parse(data) : [];

        // Get actual count of competencies
        const count = Math.max(document.querySelectorAll('.persist.input-field[id^="comp-score-"]').length, MIN_COMPETENCIES);

        for (let i = 0; i < count; i++) {
            const scoreEl = document.getElementById(`comp-score-${i}`);
            const commentEl = document.getElementById(`comp-comment-${i}`);
            if (!items[i]) items[i] = { label: '', score: 5, comment: '' };
            if (scoreEl) items[i].score = Number(scoreEl.value) || 5;
            if (commentEl) items[i].comment = commentEl.value || '';
        }
        localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(items));

        // Save reflection
        const meta = {
            name: document.getElementById('comp-name').value,
            date: document.getElementById('comp-date').value,
            coach: document.getElementById('comp-coach').value,
            objetivo: document.getElementById('comp-objetivo').value,
            reflection: document.getElementById('comp-reflection').value,
            priority: document.getElementById('comp-priority').value,
            victory: document.getElementById('comp-victory').value,
            worthy: document.getElementById('comp-worthy').value
        };
        localStorage.setItem(STORAGE_META_KEY, JSON.stringify(meta));

        if (chart && editMode === 'chart') {
            // Update both labels (with comment emoji) and scores
            const labels = items.map((it, i) => {
                const label = it.label || `Comp ${i + 1}`;
                const hasComment = it.comment && it.comment.trim() ? ' 💬' : '';
                return label + hasComment;
            });
            chart.data.labels = labels;
            chart.data.datasets[0].data = items.map(it => it.score);
            chart.update('none');
        }
    }

    let dragInfo = { active: false, pointIndex: null };

    function renderChart(items) {
        const ctx = document.getElementById('competencias-chart');
        if (!ctx) return;
        const labels = items.map((it, i) => {
            const label = it.label || `Comp ${i + 1}`;
            const hasComment = it.comment && it.comment.trim() ? ' 💬' : '';
            return label + hasComment;
        });
        const data = items.map(it => it.score || 0);

        if (chart) {
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.update();
            return;
        }

        if (typeof Chart === 'undefined') return;

        chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels,
                datasets: [{
                    label: 'Competências',
                    data,
                    backgroundColor: 'rgba(255,222,89,0.4)',
                    borderColor: '#ffde59',
                    borderWidth: 2,
                    pointBackgroundColor: '#000',
                    pointRadius: 7,
                    pointHoverRadius: 9
                }]
            },
            options: {
                scales: { r: { suggestedMin: 0, suggestedMax: 10, ticks: { stepSize: 1 } } }
            }
        });

        attachChartInteractivity(ctx, items);
    }

    function attachChartInteractivity(canvas, items) {
        canvas.style.cursor = 'default';

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (dragInfo.active && dragInfo.pointIndex !== null) {
                updateChartPointFromMouse(x, y, dragInfo.pointIndex);
                canvas.style.cursor = 'grabbing';
            } else {
                const pointIndex = getPointAtPosition(x, y);
                if (pointIndex !== null) {
                    canvas.style.cursor = 'grab';
                } else {
                    canvas.style.cursor = 'default';
                }
            }
        });

        canvas.addEventListener('mousedown', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const pointIndex = getPointAtPosition(x, y);

            if (pointIndex !== null) {
                dragInfo.active = true;
                dragInfo.pointIndex = pointIndex;
                e.preventDefault();
            }
        });

        canvas.addEventListener('mouseup', () => {
            dragInfo.active = false;
            dragInfo.pointIndex = null;
            canvas.style.cursor = 'default';
        });

        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (window.innerWidth <= 768) return; // Disable modal on mobile

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const pointIndex = getPointAtPosition(x, y);
            if (pointIndex !== null) {
                openCommentModal(pointIndex);
            }
        });

        // Add single click listener for opening comment modal (ONLY on desktop)
        canvas.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) return; // Disable modal on mobile

            // Only open modal if no drag occurred
            if (dragInfo.active) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const pointIndex = getPointAtPosition(x, y);

            // Only trigger if we're near a label (not just hovering over point for drag purposes)
            // Use a small touch target radius
            if (pointIndex !== null && !dragInfo.active) {
                const meta = chart.getDatasetMeta(0);
                const point = meta.data[pointIndex];
                if (point) {
                    const dist = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
                    // If within 40px of point center, consider it a label click
                    if (dist < 40) {
                        openCommentModal(pointIndex);
                    }
                }
            }
        });

        canvas.addEventListener('mouseleave', () => {
            dragInfo.active = false;
            dragInfo.pointIndex = null;
            canvas.style.cursor = 'default';
        });
    }

    function getPointAtPosition(x, y) {
        if (!chart || !chart.data.datasets[0]) return null;

        const canvas = document.getElementById('competencias-chart');
        if (!canvas) return null;

        const rect = canvas.getBoundingClientRect();
        const canvasWidth = rect.width;
        const canvasHeight = rect.height;
        const chartWidth = chart.canvas.width;
        const chartHeight = chart.canvas.height;

        const scaleX = chartWidth / canvasWidth;
        const scaleY = chartHeight / canvasHeight;

        // Convert screen coordinates to chart coordinates
        const chartX = x * scaleX;
        const chartY = y * scaleY;

        const meta = chart.getDatasetMeta(0);
        if (!meta.data) return null;

        for (let i = 0; i < meta.data.length; i++) {
            const point = meta.data[i];
            const dx = point.x - chartX;
            const dy = point.y - chartY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= 12) return i;
        }
        return null;
    }

    function updateChartPointFromMouse(x, y, pointIndex) {
        if (!chart) return;

        const canvas = document.getElementById('competencias-chart');
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const canvasWidth = rect.width;
        const canvasHeight = rect.height;
        const chartWidth = chart.canvas.width;
        const chartHeight = chart.canvas.height;

        const scaleX = chartWidth / canvasWidth;
        const scaleY = chartHeight / canvasHeight;

        // Convert screen coordinates to chart coordinates
        const chartX = x * scaleX;
        const chartY = y * scaleY;

        const scaleR = chart.scales.r;
        const centerX = scaleR.xCenter;
        const centerY = scaleR.yCenter;
        const distance = Math.sqrt(Math.pow(chartX - centerX, 2) + Math.pow(chartY - centerY, 2));

        const maxRadius = scaleR.drawingArea;
        let value = (distance / maxRadius) * 10;
        value = Math.max(1, Math.min(10, Math.round(value)));

        chart.data.datasets[0].data[pointIndex] = value;
        chart.update('none');

        const scoreEl = document.getElementById(`comp-score-${pointIndex}`);
        if (scoreEl) scoreEl.value = value;

        saveData();
    }

    function openCommentModal(pointIndex) {
        currentCommentIndex = pointIndex;
        const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
        const item = data[pointIndex];

        document.getElementById('comp-modal-title').innerText = `Editar Comentário`;
        document.getElementById('comp-modal-label').innerText = `${item.label || `Competência ${pointIndex + 1}`} - Nota: ${item.score}/10`;
        document.getElementById('comp-modal-textarea').value = item.comment || '';
        document.getElementById('comp-comment-modal').classList.remove('hidden');
        document.getElementById('comp-modal-textarea').focus();
    }

    function closeCommentModal() {
        document.getElementById('comp-comment-modal').classList.add('hidden');
        currentCommentIndex = null;
    }

    function saveCommentFromModal() {
        if (currentCommentIndex === null) return;
        const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
        data[currentCommentIndex].comment = document.getElementById('comp-modal-textarea').value;
        localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));

        const commentEl = document.getElementById(`comp-comment-${currentCommentIndex}`);
        if (commentEl) commentEl.value = data[currentCommentIndex].comment;

        closeCommentModal();
        saveData();
    }

    function deleteCommentFromModal() {
        if (currentCommentIndex === null) return;
        if (!confirm('Deseja deletar este comentário?')) return;

        const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');
        data[currentCommentIndex].comment = '';
        localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));

        const commentEl = document.getElementById(`comp-comment-${currentCommentIndex}`);
        if (commentEl) commentEl.value = '';

        closeCommentModal();
        saveData();
    }

    function clearForm() {
        if (!confirm('Deseja limpar toda a Roda de Competências?')) return;
        localStorage.removeItem(STORAGE_DATA_KEY);
        localStorage.removeItem(STORAGE_META_KEY);

        // Clear all persisted input fields from DOM and localStorage
        document.querySelectorAll('#comp-main .persist').forEach(el => {
            const storageKey = el.id || el.name;
            if (storageKey) localStorage.removeItem(storageKey);

            if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
            else el.value = '';
        });

        if (chart) chart.destroy();
        window.location.hash = 'competencias';
        window.location.reload();
    }

    function print() {
        try {
            const printArea = document.getElementById('print-area');
            if (!printArea) return;
            const data = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || '[]');

            const getVal = id => document.getElementById(id)?.value || '---';
            const coachee = getVal('comp-name').toUpperCase();
            const coach = getVal('comp-coach').toUpperCase();
            const dataSession = getVal('comp-date');
            const objetivo = getVal('comp-objetivo');
            const reflection = getVal('comp-reflection');
            const priority = getVal('comp-priority');
            const victory = getVal('comp-victory');
            const worthy = getVal('comp-worthy');

            let chartImg = '';

            // Check if we need to create a temporary chart
            if (!chart && data.length >= MIN_COMPETENCIES) {
                // Create temporary chart for printing
                const tempCanvas = document.createElement('canvas');
                tempCanvas.id = 'temp-chart-for-print';
                tempCanvas.height = 220;
                tempCanvas.width = 220;
                tempCanvas.style.position = 'absolute';
                tempCanvas.style.left = '-9999px';
                tempCanvas.style.top = '-9999px';
                tempCanvas.style.visibility = 'hidden';
                document.body.appendChild(tempCanvas);

                const labels = data.map((it, i) => {
                    const label = it.label || `Comp ${i + 1}`;
                    const hasComment = it.comment && it.comment.trim() ? ' 💬' : '';
                    return label + hasComment;
                });

                const tempChart = new Chart(tempCanvas, {
                    type: 'radar',
                    data: {
                        labels,
                        datasets: [{
                            label: 'Competências',
                            data: data.map(it => it.score || 0),
                            backgroundColor: 'rgba(255,222,89,0.4)',
                            borderColor: '#ffde59',
                            borderWidth: 2,
                            pointBackgroundColor: '#000',
                            pointRadius: 7,
                            pointHoverRadius: 9
                        }]
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: true,
                        plugins: { legend: { display: false } },
                        scales: { r: { suggestedMin: 0, suggestedMax: 10, ticks: { stepSize: 1 } } }
                    }
                });

                // Use requestAnimationFrame to ensure render completion, then capture image
                let frameCount = 0;
                const captureImage = () => {
                    frameCount++;
                    if (frameCount < 3) {
                        requestAnimationFrame(captureImage);
                    } else {
                        try {
                            chartImg = `<img src="${tempChart.toBase64Image()}" style="width:100%;max-width:500px">`;
                        } catch (e) {
                            chartImg = '';
                            console.warn('Failed to capture chart image:', e);
                        }
                        tempChart.destroy();
                        document.body.removeChild(tempCanvas);
                        doPrint(printArea, data, { coachee, coach, dataSession, objetivo, reflection, priority, victory, worthy, chartImg });
                    }
                };
                requestAnimationFrame(captureImage);
                return; // Exit early, doPrint will be called in requestAnimationFrame
            } else if (chart) {
                try {
                    chartImg = `<img src="${chart.toBase64Image()}" style="width:100%;max-width:500px">`;
                } catch (e) {
                    chartImg = '';
                }
            }

            doPrint(printArea, data, { coachee, coach, dataSession, objetivo, reflection, priority, victory, worthy, chartImg });
        } catch (e) {
            console.error('Print error:', e);
        }
    }

    function doPrint(printArea, data, meta) {
        const { coachee, coach, dataSession, objetivo, reflection, priority, victory, worthy, chartImg } = meta;

        printArea.innerHTML = `
            <style>
                @media print {
                    @page { size:A4; margin:0 }
                    body { margin:0; padding:15mm; background:white !important }
                    .page-break { page-break-after:always; break-after:page; margin-top:60px }
                }
                .print-header { border-bottom:4px solid #000; margin-bottom:20px; padding-bottom:10px }
                .info-grid { display:flex; gap:8px; margin-top:10px }
                .info-item { flex:1; border:2px solid #000; padding:8px; background:#ffde59 }
                .section-title { font-size: 16px; font-weight:900; text-transform:uppercase; margin-top:20px; margin-bottom:8px; border-left:4px solid #ffde59; padding-left:10px }
                .box { border:2px solid #000; padding:12px; white-space:pre-wrap; background:#fafafa; font-size: 14px; line-height: 1.5; }
            </style>

            <!-- PAGE 1 -->
            <div>
                <div class="print-header">
                    <div style="display:flex; justify-content:space-between; align-items:center">
                        <h1 style="font-size: 22px; font-weight:900; margin:0">Roda de Competências</h1>
                        <div style="font-size:10px; font-weight:700">Kotini App</div>
                    </div>
                    <div class="info-grid">
                        <div class="info-item"><div style="font-size:8px; font-weight:900">Coachee</div><div style="font-size: 11px; font-weight:800">${coachee}</div></div>
                        <div class="info-item"><div style="font-size:8px; font-weight:900">Coach</div><div style="font-size: 11px; font-weight:800">${coach}</div></div>
                        <div class="info-item"><div style="font-size:8px; font-weight:900">Data</div><div style="font-size: 11px; font-weight:800">${dataSession}</div></div>
                    </div>
                </div>

                <h3 class="section-title">Objetivo / Meta</h3>
                <div class="box">${objetivo}</div>

                <h3 class="section-title">Pequena Vitória</h3>
                <div class="box">${victory}</div>

                <h3 class="section-title">Por que valeu a pena?</h3>
                <div class="box">${worthy}</div>
            </div>

            <!-- PAGE 2 -->
            <div class="page-break">
                <h3 class="section-title">Gráfico da Roda de Competências</h3>
                <div style="border:1px solid #ccc; padding:10px; margin:10px 0">
                    ${chartImg}
                </div>
                <h3 class="section-title">Percepção Geral</h3>
                <div class="box">${reflection}</div>
                <h3 class="section-title">Competência Prioritária</h3>
                <div class="box">${priority}</div>
            </div>

            <!-- PAGE 3 -->
            <div class="page-break">
                <h3 class="section-title">Detalhamento - Competências e Notas</h3>
                <table style="width:100%; border-collapse:collapse; table-layout: fixed;">
                    <tr style="border-bottom:2px solid #000">
                        <th style="padding:8px; text-align:left; font-weight:900; width: 30%">Competência</th>
                        <th style="padding:8px; text-align:center; font-weight:900; width: 10%">Nota</th>
                        <th style="padding:8px; text-align:left; font-weight:900; width: 60%">Comentário</th>
                    </tr>
                    ${data.map((it, i) => `
                        <tr style="border-bottom:1px solid #ddd; vertical-align: top; page-break-inside: avoid;">
                            <td style="padding:8px; word-break: break-word; overflow-wrap: break-word;">${it.label || `Competência ${i + 1}`}</td>
                            <td style="padding:8px; text-align:center; font-weight:700">${it.score}/10</td>
                            <td style="padding:8px; white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word; font-size:10px; line-height: 1.5; max-width: 100%;">${(it.comment || '---').replace(/\n/g, '\n')}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
        `;

        setTimeout(() => window.print(), 500);
    }

    return { load, saveData, setMode, proceedToRate, backToDefine, clearForm, print, openCommentModal, closeCommentModal, saveCommentFromModal, deleteCommentFromModal, addCompetency, removeCompetency, autoResizeTextarea };
})();
