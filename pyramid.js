window.PyramidTool = (function(){
    'use strict';
    const that = {
    load: () => {
        const container = document.getElementById('view-pyramid');
        if (!container) return;
        if (container.querySelector('#pyramid-main')) return; // already built

        const html = `
            <div id="pyramid-main" class="max-w-5xl mx-auto">
                
                <div class="mb-6 flex justify-between items-center border-b-2 border-black pb-4">
                    <div class="w-20"></div>
                    <div class="text-center">
                        <h2 class="font-black uppercase text-xl">Pirâmide do Sucesso</h2>
                    </div>
                    <div class="w-20"></div>
                </div>

                <div class="no-print mb-8">
                    <details class="bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] group overflow-hidden transition-all">
                        <summary class="list-none cursor-pointer p-4 flex justify-between items-center font-black uppercase text-sm hover:bg-gray-50 transition-colors">
                            <span class="flex items-center gap-3">
                                <i class="fas fa-layer-group text-[#ffde59]"></i>
                                Roteiro e Orientações (Atividades SMART)
                            </span>
                            <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                        </summary>
                        <div class="p-6 border-t-4 border-black bg-gray-50 space-y-4 text-sm leading-relaxed text-gray-800">
                            <p><strong>Atenção:</strong> Ao definir as atividades na base da pirâmide, certifique-se de que elas respondam: <em>O que exatamente será feito? Como será medido? Qual o prazo?</em></p>
                        </div>
                    </details>
                </div>

                <div class="bc-card p-6 md:p-10 bg-white mb-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Coachee</label>
                            <input type="text" id="pyramid-name" class="persist input-field" placeholder="Nome do cliente">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Data</label>
                            <input type="date" id="pyramid-date" class="persist input-field">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase block mb-1">Coach</label>
                            <input type="text" id="pyramid-coach" class="persist input-field" placeholder="Nome do coach">
                        </div>
                    </div>

                    <div class="space-y-12">
                        
                        <div class="flex justify-center">
                            <div class="w-full max-w-lg bg-[#ffde59] border-4 border-black p-6 shadow-[8px_8px_0px_0px_black] text-center">
                                <label class="label-main !mb-2 uppercase">Objetivo Principal do Processo</label>
                                <textarea id="pyramid-goal" class="persist w-full bg-transparent border-none focus:ring-0 font-black text-center uppercase placeholder:text-black/30 auto-resize" placeholder="QUAL O RESULTADO FINAL ESPERADO?"></textarea>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            
                            <div class="flex flex-col gap-4">
                                <div class="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_black]">
                                    <label class="text-[9px] font-black uppercase text-blue-600 block mb-1 italic">Sub-Meta 01</label>
                                    <textarea id="pyramid-sub-1" class="persist w-full bg-transparent border-none focus:ring-0 font-bold text-sm min-h-[50px] p-0 auto-resize" placeholder="Defina o marco..."></textarea>
                                </div>
                                <div class="space-y-3 pl-4 border-l-4 border-blue-600">
                                    <textarea id="pyramid-a1-1" class="persist input-field text-xs auto-resize py-2" placeholder="Atividade 1.1 (O que/Prazo)"></textarea>
                                    <textarea id="pyramid-a1-2" class="persist input-field text-xs auto-resize py-2" placeholder="Atividade 1.2 (O que/Prazo)"></textarea>
                                    <textarea id="pyramid-a1-3" class="persist input-field text-xs auto-resize py-2" placeholder="Atividade 1.3 (O que/Prazo)"></textarea>
                                </div>
                            </div>

                            <div class="flex flex-col gap-4">
                                <div class="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_black]">
                                    <label class="text-[9px] font-black uppercase text-green-600 block mb-1 italic">Sub-Meta 02</label>
                                    <textarea id="pyramid-sub-2" class="persist w-full bg-transparent border-none focus:ring-0 font-bold text-sm min-h-[50px] p-0 auto-resize" placeholder="Defina o marco..."></textarea>
                                </div>
                                <div class="space-y-3 pl-4 border-l-4 border-green-600">
                                    <textarea id="pyramid-a2-1" class="persist input-field text-xs auto-resize py-2" placeholder="Atividade 2.1 (O que/Prazo)"></textarea>
                                    <textarea id="pyramid-a2-2" class="persist input-field text-xs auto-resize py-2" placeholder="Atividade 2.2 (O que/Prazo)"></textarea>
                                    <textarea id="pyramid-a2-3" class="persist input-field text-xs auto-resize py-2" placeholder="Atividade 2.3 (O que/Prazo)"></textarea>
                                </div>
                            </div>

                            <div class="flex flex-col gap-4">
                                <div class="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_black]">
                                    <label class="text-[9px] font-black uppercase text-purple-600 block mb-1 italic">Sub-Meta 03</label>
                                    <textarea id="pyramid-sub-3" class="persist w-full bg-transparent border-none focus:ring-0 font-bold text-sm min-h-[50px] p-0 auto-resize" placeholder="Defina o marco..."></textarea>
                                </div>
                                <div class="space-y-3 pl-4 border-l-4 border-purple-600">
                                    <textarea id="pyramid-a3-1" class="persist input-field text-xs auto-resize py-2" placeholder="Atividade 3.1 (O que/Prazo)"></textarea>
                                    <textarea id="pyramid-a3-2" class="persist input-field text-xs auto-resize py-2" placeholder="Atividade 3.2 (O que/Prazo)"></textarea>
                                    <textarea id="pyramid-a3-3" class="persist input-field text-xs auto-resize py-2" placeholder="Atividade 3.3 (O que/Prazo)"></textarea>
                                </div>
                            </div>

                        </div>

                        <div class="space-y-8 pt-10 border-t-4 border-black border-dashed">
                            <div>
                                <label class="label-main">Pequena vitória (Próximas 24h)</label>
                                <textarea id="pyramid-victory" class="persist input-field min-h-[80px] auto-resize" placeholder="O que será feito imediatamente?"></textarea>
                            </div>
                            <div>
                                <label class="label-main">Insight da Sessão</label>
                                <textarea id="pyramid-worthy" class="persist input-field min-h-[80px] auto-resize" placeholder="Por que valeu a pena desenhar esta pirâmide?"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="no-print fixed bottom-0 left-0 w-full lg:bottom-8 lg:left-auto lg:right-8 lg:w-auto flex gap-3 p-4 lg:p-0 bg-white lg:bg-transparent border-t-4 border-black lg:border-t-0 z-50">
                        <button onclick="PyramidTool.clearForm()" class="flex-1 lg:flex-none bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 group">
                            <i class="fas fa-trash-alt text-red-500"></i>
                            <span class="font-black text-xs uppercase">Limpar</span>
                        </button>
                        <button onclick="PyramidTool.print()" class="flex-[2] lg:flex-none bg-[#ffde59] border-4 border-black p-3 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 group">
                            <i class="fas fa-print text-lg text-black"></i>
                            <span class="font-black text-xs uppercase">Imprimir relatório</span>
                        </button>
                    </div>
                    
                    <div class="h-28 lg:hidden"></div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        console.log('DEBUG: PyramidTool.load() HTML injected', container.innerHTML.length);
        that.init();  // Inicializa auto-resize e data
    },

    init: () => {
        const textareas = document.querySelectorAll('#view-pyramid .auto-resize');
        textareas.forEach(tx => {
            tx.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        });

        const dateInput = document.getElementById('pyramid-date');
        if (dateInput && !dateInput.value) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    },

    clearForm: () => {
        if (confirm("Deseja apagar todos os dados da Pirâmide?")) {
            const inputs = document.querySelectorAll('#view-pyramid .persist');
            inputs.forEach(el => {
                el.value = '';
                localStorage.removeItem(el.id);
            });
            window.location.hash = 'pyramid';
            window.location.reload();
        }
    },

    // CABEÇALHO COM CAIXAS TOTALMENTE IGUAIS EM LARGURA E ALTURA
    getHeaderHTML: (subtitulo) => {
        const getVal = (id) => document.getElementById(id)?.value || '---';
        return `
            <div class="print-header-container">
                <div class="print-title-row">
                    <h1 class="main-title-print">Pirâmide do Sucesso</h1>
                    <span class="subtitle-print">${subtitulo}</span>
                </div>
                
                <div class="header-grid-cards">
                    <div class="info-card-j">
                        <span class="info-label-j">Coachee</span>
                        <div class="info-content-j">${getVal('pyramid-name')}</div>
                    </div>
                    <div class="info-card-j">
                        <span class="info-label-j">Coach</span>
                        <div class="info-content-j">${getVal('pyramid-coach')}</div>
                    </div>
                    <div class="info-card-j">
                        <span class="info-label-j">Data da Sessão</span>
                        <div class="info-content-j">${getVal('pyramid-date')}</div>
                    </div>
                </div>
            </div>
        `;
    },

    print: () => {
        const getVal = (id) => {
            const val = document.getElementById(id)?.value || '---';
            return val.replace(/\n/g, '<br>');
        };

        const printArea = document.getElementById('print-area');
        if (!printArea) return;

        let styleTag = document.getElementById('pyramid-print-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'pyramid-print-style';
            document.head.appendChild(styleTag);
        }
        
        styleTag.innerHTML = `
            @media print {
                body * { visibility: hidden; }
                #print-area, #print-area * { visibility: visible; }
                #print-area { position: absolute; left: 0; top: 0; width: 100%; display: block !important; }
                
                .print-header-container { margin-bottom: 25px; }
                .print-title-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 15px; }
                .main-title-print { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 900; text-transform: uppercase; margin: 0; }
                .subtitle-print { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #666; }

                /* FORÇA LARGURAS E ALTURAS IDÊNTICAS */
                .header-grid-cards { 
                    display: flex !important; 
                    flex-direction: row !important;
                    align-items: stretch !important; /* Equaliza a altura pelo maior */
                    gap: 12px !important; 
                    width: 100% !important;
                }
                
                .info-card-j { 
                    flex: 1 1 0px !important; /* O "0px" aqui força a largura a ser matematicamente igual para todos */
                    width: 0 !important;      /* Truque adicional para garantir igualdade absoluta no flex */
                    background: #ffde59 !important; 
                    -webkit-print-color-adjust: exact; 
                    border: 3px solid black; 
                    padding: 10px; 
                    box-shadow: 4px 4px 0px 0px black;
                    display: flex !important;
                    flex-direction: column !important;
                }

                .info-label-j { font-size: 8px; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; }
                .info-content-j { font-size: 11px; font-weight: 800; text-transform: uppercase; word-wrap: break-word; }

                /* ESTRUTURA DA PIRÂMIDE */
                .pyramid-top-header { background: #ffde59 !important; -webkit-print-color-adjust: exact; border: 3px solid black; text-align: center; padding: 15px; margin-top: 30px; margin-bottom: 25px; box-shadow: 4px 4px 0px 0px black; }
                .pyramid-grid { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 15px !important; }
                .pilar-box { border: 3px solid black; padding: 12px; min-height: 280px; background: white !important; box-shadow: 4px 4px 0px 0px black; }                .pilar-title { font-weight: 900; font-size: 12px; border-bottom: 2px solid black; padding-bottom: 6px; margin-bottom: 12px; text-transform: uppercase; }
                .activity-line { font-size: 10px; margin-bottom: 10px; padding-left: 8px; border-left: 3px solid #eee; line-height: 1.4; }
                
                /* SEÇÕES DE CONCLUSÃO */
                .section-title { font-family: 'Space Grotesk'; font-size: 13px; font-weight: 900; text-transform: uppercase; margin: 25px 0 10px 0; border-left: 5px solid #ffde59; padding-left: 10px; }
                .text-box-print { 
                    white-space: pre-wrap !important; 
                    border: 3px solid black !important; 
                    padding: 15px; 
                    min-height: 100px; 
                    font-size: 11px; 
                    background: white !important;
                    box-shadow: 4px 4px 0px 0px black;
                }

                .page-break { page-break-before: always; }
                .footer-notice { margin-top: 50px; text-align: center; font-size: 9px; font-weight: 800; text-transform: uppercase; border-top: 2px dashed black; padding-top: 15px; color: #444; }
            }
        `;

        printArea.innerHTML = `
            <table style="width: 100%;">
                <tbody>
                    <tr>
                        <td>
                            <div class="print-page">
                                ${PyramidTool.getHeaderHTML('Conclusões e Insights')}
                                <h3 class="section-title">Pequena Vitória (Próximas 24h)</h3>
                                <div class="text-box-print">${getVal('pyramid-victory')}</div>
                                
                                <h3 class="section-title">Por que valeu a pena?</h3>
                                <div class="text-box-print">${getVal('pyramid-worthy')}</div>
                                
                                <div class="footer-notice">O Detalhamento da Pirâmide encontra-se na página seguinte</div>
                            </div>

                            <div class="print-page page-break">
                                ${PyramidTool.getHeaderHTML('Plano Estratégico')}
                                
                                <div class="pyramid-top-header">
                                    <span style="font-size: 9px; font-weight: 900; text-transform: uppercase; display: block;">Objetivo Principal</span>
                                    <div style="font-weight: 900; font-size: 16px; text-transform: uppercase; margin-top: 5px;">${getVal('pyramid-goal')}</div>
                                </div>

                                <div class="pyramid-grid">
                                    ${[1, 2, 3].map(i => `
                                        <div class="pilar-box">
                                            <span style="font-size: 8px; font-weight: 900; text-transform: uppercase; color: #666;">Pilar 0${i} / Sub-Meta</span>
                                            <div class="pilar-title">${getVal('pyramid-sub-' + i)}</div>
                                            <div class="activity-line">• ${getVal('pyramid-a'+i+'-1')}</div>
                                            <div class="activity-line">• ${getVal('pyramid-a'+i+'-2')}</div>
                                            <div class="activity-line">• ${getVal('pyramid-a'+i+'-3')}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;

        setTimeout(() => { window.print(); }, 500);
    }
    };

    document.addEventListener('DOMContentLoaded', function(){ if (window.PyramidTool && window.PyramidTool.init) window.PyramidTool.init(); });

    return that;
})();