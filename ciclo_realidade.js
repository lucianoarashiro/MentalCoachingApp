/*-- ==========================================
TOOL: MUDANÇA DE CICLO DA REALIDADE
========================================== */

const CicloRealidadeTool = {
    load: () => {
        const container = document.getElementById('view-tool-ciclo-realidade');
        if (!container) return;
        if (container.querySelector('#ciclo-realidade-main')) return; // already built

        const html = `
            <div id="ciclo-realidade-main" class="mb-6 flex justify-between items-center border-b-2 border-black pb-4">
                <div class="w-20"></div>
                <div class="text-center">
                    <h2 class="font-black uppercase text-xl">Mundança de Ciclo da Realidade</h2>
                </div>
                <div class="w-20"></div>
            </div>

            <div class="no-print mb-8">
                <details class="bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] group overflow-hidden transition-all">
                    <summary class="list-none cursor-pointer p-4 flex justify-between items-center font-black uppercase text-sm hover:bg-gray-50 transition-colors">
                        <span class="flex items-center gap-3">
                            <i class="fas fa-sync-alt text-[#ffde59]"></i>
                            Orientações de Aplicação
                        </span>
                        <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                    </summary>
                    
                    <div class="p-6 border-t-4 border-black bg-gray-50 space-y-4 text-sm leading-relaxed">
                        <div class="space-y-4 text-gray-800">
                            <p><strong>Objetivo:</strong> Reconfigurar a percepção de realidade do coachee através da modelagem de indivíduos de sucesso.</p>
                            
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-white p-3 border-2 border-black">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Mudança de Percepção:</h4>
                                    <p class="text-xs">Questione como a visão atual de mundo limita os resultados e como uma nova visão pode abrir portas.</p>
                                </div>
                                <div class="bg-white p-3 border-2 border-black">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Modelagem (Ser, Fazer, Ter):</h4>
                                    <p class="text-xs">Modele pessoas que já chegaram onde o coachee deseja. O que elas são (mentalidade), o que fazem (hábitos) e o que têm (resultados).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
            </div>

            <div class="bc-card p-8 bg-white mb-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Coachee</label>
                        <input type="text" id="cr-name" class="persist input-field" placeholder="Nome do cliente">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Data</label>
                        <input type="date" id="cr-date" class="persist input-field">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Coach</label>
                        <input type="text" id="cr-coach" class="persist input-field" placeholder="Nome do coach">
                    </div>
                </div>
                
                <div class="space-y-12">
                    <!-- 1. Percepção de Mundo -->
                    <div class="print-block">
                        <label class="label-main">1. Como você vê o mundo?</label>
                        <label class="label-reference">Descreva sua visão atual sobre sua realidade e suas possibilidades.</label>
                        <textarea id="cr-perception" class="persist input-field min-h-[120px] auto-resize" placeholder="Minha visão de mundo hoje é..."></textarea>
                    </div>

                    <!-- 2. Modelagem de Sucesso -->
                    <div class="print-block">
                        <label class="label-main">2. Modelagem de Sucesso</label>
                        <label class="label-reference">Quem são as pessoas que já conquistaram objetivos parecidos com o seu? O que você pode aprender com elas?</label>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div class="p-4 border-2 border-black bg-blue-50">
                                <label class="text-xs font-black uppercase mb-2 block border-b-2 border-blue-200">QUEM ELAS SÃO (SER)</label>
                                <textarea id="cr-ser" class="persist input-field min-h-[150px] auto-resize bg-white" placeholder="Mentalidade, valores, identidade..."></textarea>
                            </div>
                            <div class="p-4 border-2 border-black bg-green-50">
                                <label class="text-xs font-black uppercase mb-2 block border-b-2 border-green-200">O QUE ELAS FAZEM (FAZER)</label>
                                <textarea id="cr-fazer" class="persist input-field min-h-[150px] auto-resize bg-white" placeholder="Hábitos, rotinas, ações..."></textarea>
                            </div>
                            <div class="p-4 border-2 border-black bg-yellow-50">
                                <label class="text-xs font-black uppercase mb-2 block border-b-2 border-yellow-200">O QUE ELAS TÊM (TER)</label>
                                <textarea id="cr-ter" class="persist input-field min-h-[150px] auto-resize bg-white" placeholder="Conquistas, resultados, estilo de vida..."></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Perguntas Padrão (Full Width) -->
                    <div class="space-y-8 pt-6 border-t-4 border-black border-double">
                        <div class="print-block">
                            <label class="label-main">Pequena Vitória</label>
                            <label class="label-reference">O que seria um pequeno passo para começar hoje mesmo?</label>
                            <textarea id="cr-vitoria" class="persist input-field min-h-[100px] auto-resize" placeholder="Qual o próximo micro-passo?"></textarea>
                        </div>

                        <div class="print-block">
                            <label class="label-main">Por que valeu a pena?</label>
                            <label class="label-reference">Por que valeu demais essa sessão pra você?</label>
                            <textarea id="cr-worthy" class="persist input-field min-h-[100px] auto-resize" placeholder="O principal aprendizado de hoje..."></textarea>
                        </div>
                    </div>
                </div>

                <div class="no-print fixed bottom-0 left-0 w-full lg:bottom-8 lg:left-auto lg:right-8 lg:w-auto flex gap-3 p-4 lg:p-0 bg-white lg:bg-transparent border-t-4 border-black lg:border-t-0 z-50">
    
                    <button onclick="CicloRealidadeTool.clearForm()" 
                            class="flex-1 lg:flex-none bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-trash-alt text-red-500 group-active:scale-90 transition-transform"></i>
                        <span class="font-black text-xs uppercase text-black">Limpar</span>
                    </button>
                    
                    <button onclick="CicloRealidadeTool.print()" 
                            class="flex-[2] lg:flex-none bg-[#ffde59] border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-print text-lg text-black group-active:scale-90 transition-transform"></i>
                        <span class="font-black text-xs uppercase text-black">Imprimir Relatório</span>
                    </button>
                </div>

                <div class="h-28 lg:hidden"></div>
            </div>
        `;

        container.innerHTML = html;
        Storage.loadAll();
    },

    clearForm: () => {
        if (confirm("Deseja realmente limpar todo o formulário de Ciclo da Realidade?")) {
            const fields = [
                'cr-name', 'cr-date', 'cr-coach',
                'cr-perception', 'cr-ser', 'cr-fazer', 'cr-ter',
                'cr-vitoria', 'cr-worthy'
            ];

            fields.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.value = '';
                    localStorage.removeItem(id);
                }
            });

            window.location.hash = 'tool-ciclo-realidade';
            window.location.reload();
        }
    },

    print: () => {
        try {
            const getVal = (id) => document.getElementById(id)?.value || '---';

            const coachee = getVal('cr-name').toUpperCase();
            const coach = getVal('cr-coach').toUpperCase();
            const data = getVal('cr-date');

            const printArea = document.getElementById('print-area');
            if (!printArea) return;

            printArea.innerHTML = `
                <style>
                    @page { size: A4; margin: 10mm; }
                    body { margin: 0; padding: 0; background: white !important; font-family: 'Inter', sans-serif; }
                    
                    .tool-title-area { border-bottom: 4px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
                    .title-report { font-size: 24px; font-weight: 900; text-transform: uppercase; margin: 0; }
                    .subtitle-report { font-weight: 700; color: #666; text-transform: uppercase; margin: 0; font-size: 10px; letter-spacing: 2px; }

                    .header-info { display: flex; gap: 10px; margin-bottom: 30px; }
                    .info-box { flex: 1; background: #ffde59 !important; border: 2px solid #000; padding: 8px 12px; -webkit-print-color-adjust: exact; }
                    .info-label { font-size: 8px; font-weight: 800; text-transform: uppercase; display: block; color: #000; }
                    .info-content { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #000; }

                    .section-title { font-size: 16px; font-weight: 900; text-transform: uppercase; border-left: 5px solid #ffde59; padding-left: 10px; margin: 25px 0 15px 0; }
                    
                    .perception-box { border: 2px solid #000; padding: 20px; background: #f9f9f9 !important; font-size: 13px; line-height: 1.6; white-space: pre-wrap; -webkit-print-color-adjust: exact; }

                    .modeling-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-top: 15px; }
                    .modeling-cell { border: 2px solid #000; padding: 15px; min-height: 250px; }
                    .cell-label { font-size: 10px; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #ffde59; padding-bottom: 5px; margin-bottom: 10px; display: block; }
                    .cell-content { font-size: 11px; line-height: 1.5; white-space: pre-wrap; }

                    .avoid-break { break-inside: avoid; page-break-inside: avoid; }
                    .footer-print { text-align: center; font-size: 9px; color: #999; text-transform: uppercase; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; }
                    
                    .vitoria-box { margin-top: 30px; border: 2px solid #000; padding: 15px; }
                </style>

                <div class="tool-title-area">
                    <h1 class="title-report">Mudança de Ciclo da Realidade</h1>
                    <p class="subtitle-report">Análise de Percepção e Modelagem de Sucesso</p>
                </div>

                <div class="header-info">
                    <div class="info-box"><span class="info-label">Coachee</span><div class="info-content">${coachee}</div></div>
                    <div class="info-box"><span class="info-label">Coach</span><div class="info-content">${coach}</div></div>
                    <div class="info-box"><span class="info-label">Data</span><div class="info-content">${data}</div></div>
                </div>

                <div class="avoid-break">
                    <h2 class="section-title">1. Percepção de Mundo</h2>
                    <div class="perception-box">${getVal('cr-perception')}</div>
                </div>

                <div class="avoid-break">
                    <h2 class="section-title">2. Modelagem de Sucesso</h2>
                    <div class="modeling-grid">
                        <div class="modeling-cell" style="background: #eff6ff !important; -webkit-print-color-adjust: exact;">
                            <span class="cell-label">QUEM ELAS SÃO (SER)</span>
                            <div class="cell-content">${getVal('cr-ser')}</div>
                        </div>
                        <div class="modeling-cell" style="background: #f0fdf4 !important; -webkit-print-color-adjust: exact;">
                            <span class="cell-label">O QUE ELAS FAZEM (FAZER)</span>
                            <div class="cell-content">${getVal('cr-fazer')}</div>
                        </div>
                        <div class="modeling-cell" style="background: #fefce8 !important; -webkit-print-color-adjust: exact;">
                            <span class="cell-label">O QUE ELAS TÊM (TER)</span>
                            <div class="cell-content">${getVal('cr-ter')}</div>
                        </div>
                    </div>
                </div>

                <div class="avoid-break" style="margin-top: 25px;">
                    <div class="vitoria-box">
                        <span class="info-label">Pequena Vitória</span>
                        <div class="cell-content" style="font-size: 12px; margin-top: 5px;">${getVal('cr-vitoria')}</div>
                    </div>
                    <div class="vitoria-box" style="margin-top: 15px;">
                        <span class="info-label">Por que valeu a pena?</span>
                        <div class="cell-content" style="font-size: 12px; margin-top: 5px;">${getVal('cr-worthy')}</div>
                    </div>
                </div>

                <div class="footer-print">
                    Master Performance System - Gerado em ${new Date().toLocaleDateString('pt-BR')}
                </div>
            `;

            setTimeout(() => { window.print(); }, 500);
        } catch (e) { console.error(e); }
    }
};

if (typeof window !== 'undefined') window.CicloRealidadeTool = CicloRealidadeTool;
