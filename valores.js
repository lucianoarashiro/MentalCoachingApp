const ValoresTool = {
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
        const zones = ['pool-values', 'col-nada', 'col-asvezes', 'col-tudo', 'pool-top5', 'col-top5'];
        let totalFound = 0;
        zones.forEach(z => {
            const saved = localStorage.getItem(`zone-${z}`);
            if(saved) {
                const list = JSON.parse(saved);
                const container = document.getElementById(z);
                if (container) {
                    container.innerHTML = '';
                    list.forEach(item => {
                        const originalIdx = ValoresTool.defaultList.indexOf(item.text);
                        const id = (!item.isCustom && originalIdx !== -1) ? `val-${originalIdx}` : null;
                        container.appendChild(ValoresTool.createTag(item.text, id, item.isCustom));
                        totalFound++;
                    });
                }
            }
        });
        if(totalFound === 0) ValoresTool.init();
        ValoresTool.updateRankingNumbers();
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