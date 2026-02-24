/*-- ==========================================
TOOL: PERDAS E GANHOS
========================================== */

const PerdasGanhosTool = {
    load: () => {
        const container = document.getElementById('view-tool-perdas-ganhos');
        if (!container) return;
        if (container.querySelector('#perdas-ganhos-main')) return; // already built

        const html = `
            <div id="perdas-ganhos-main" class="mb-6 flex justify-between items-center border-b-2 border-black pb-4">
                <div class="w-20"></div>
                <div class="text-center">
                    <h2 class="font-black uppercase text-xl">Perdas e Ganhos</h2>
                </div>
                <div class="w-20"></div>
            </div>

            <div class="no-print mb-8">
                <details class="bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] group overflow-hidden transition-all">
                    <summary class="list-none cursor-pointer p-4 flex justify-between items-center font-black uppercase text-sm hover:bg-gray-50 transition-colors">
                        <span class="flex items-center gap-3">
                            <i class="fas fa-balance-scale text-[#ffde59]"></i>
                            Orientações de Aplicação
                        </span>
                        <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                    </summary>
                    
                    <div class="p-6 border-t-4 border-black bg-gray-50 space-y-4 text-sm leading-relaxed">
                        <div class="space-y-4 text-gray-800">
                            <p><strong>Objetivo:</strong> Trazer consciência sobre os impactos positivos e negativos de uma decisão ou mudança, mapeando motivadores e sabotadores.</p>
                            
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-white p-3 border-2 border-black">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Dicas de Condução:</h4>
                                    <ul class="list-disc pl-4 space-y-1 text-xs">
                                        <li><strong>Ganhos Secundários:</strong> O quadrante 4 ("O que ganha se Ñ acontecer") revela o que mantém o coachee parado.</li>
                                        <li><strong>Dor vs Prazer:</strong> Identifique se o coachee é mais movido pela busca do prazer ou fuga da dor.</li>
                                    </ul>
                                </div>
                                <div class="bg-white p-3 border-2 border-black">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Perguntas Chave:</h4>
                                    <ul class="list-disc pl-4 space-y-1 text-xs">
                                        <li>"O que custa para você não mudar?"</li>
                                        <li>"Como você pode manter a segurança atual enquanto avança?"</li>
                                    </ul>
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
                        <input type="text" id="pg-name" class="persist input-field" placeholder="Nome do cliente">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Data</label>
                        <input type="date" id="pg-date" class="persist input-field">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Coach</label>
                        <input type="text" id="pg-coach" class="persist input-field" placeholder="Nome do coach">
                    </div>
                </div>

                <div class="mb-10">
                     <label class="text-[10px] font-black uppercase text-gray-400 block mb-1">Definição do Objetivo</label>
                     <input type="text" id="pg-obj" class="persist input-field font-bold text-lg border-b-4" placeholder="Ex: Transição de carreira para Tecnologia">
                </div>
                
                <div class="space-y-12">
                    
                    <!-- MATRIZ PERDAS E GANHOS -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black border-collapse">
                        <!-- Q1 -->
                        <div class="p-6 border-b-2 md:border-b-4 md:border-r-4 border-black bg-green-50">
                            <label class="label-main text-green-800">1. O que você GANHA se acontecer?</label>
                            <label class="label-reference italic text-[11px] mb-3 block">Motivador pelo Prazer</label>
                            <textarea id="pg-q1" class="persist input-field min-h-[120px] auto-resize bg-white" placeholder="Benefícios e conquistas..."></textarea>
                        </div>
                        <!-- Q2 -->
                        <div class="p-6 border-b-2 md:border-b-4 border-black bg-red-50">
                            <label class="label-main text-red-800">2. O que você PERDE se acontecer?</label>
                            <label class="label-reference italic text-[11px] mb-3 block">Sabotador pela Dor</label>
                            <textarea id="pg-q2" class="persist input-field min-h-[120px] auto-resize bg-white" placeholder="Sacrifícios e riscos..."></textarea>
                        </div>
                        <!-- Q3 -->
                        <div class="p-6 border-b-2 md:border-b-0 md:border-r-4 border-black bg-orange-50">
                            <label class="label-main text-orange-800">3. O que você PERDE se NÃO acontecer?</label>
                            <label class="label-reference italic text-[11px] mb-3 block">Motivador pela Dor</label>
                            <textarea id="pg-q3" class="persist input-field min-h-[120px] auto-resize bg-white" placeholder="Consequências da estagnação..."></textarea>
                        </div>
                        <!-- Q4 -->
                        <div class="p-6 bg-blue-50">
                            <label class="label-main text-blue-800">4. O que você GANHA se NÃO acontecer?</label>
                            <label class="label-reference italic text-[11px] mb-3 block">Sabotador pelo Prazer (Ganhos Secundários)</label>
                            <textarea id="pg-q4" class="persist input-field min-h-[120px] auto-resize bg-white" placeholder="Conforto da zona de segurança..."></textarea>
                        </div>
                    </div>

                    <!-- REFLEXÕES ESTRATÉGICAS -->
                    <div class="space-y-8">
                        <div class="print-block">
                            <label class="label-main">5. Como minimizar perdas ao conseguir o que deseja?</label>
                            <label class="label-reference">Estratégias para mitigar os impactos negativos listados no item 2.</label>
                            <textarea id="pg-ref1" class="persist input-field min-h-[100px] auto-resize" placeholder="Plano de ação para os riscos..."></textarea>
                        </div>

                        <div class="print-block">
                            <label class="label-main">6. Como manter os ganhos atuais ao alcançar o objetivo?</label>
                            <label class="label-reference">Como preservar as vantagens do item 4 no novo cenário?</label>
                            <textarea id="pg-ref2" class="persist input-field min-h-[100px] auto-resize" placeholder="Preservando o que é importante..."></textarea>
                        </div>

                        <div class="print-block">
                            <label class="label-main">7. O que você aprendeu desse quadro como um todo?</label>
                            <label class="label-reference">Sua percepção final sobre a viabilidade e os custos da mudança.</label>
                            <textarea id="pg-ref3" class="persist input-field min-h-[100px] auto-resize" placeholder="Principais aprendizados..."></textarea>
                        </div>
                    </div>

                    <!-- 8. Perguntas Padrão (Full Width) -->
                    <div class="space-y-8 pt-6 border-t-4 border-black border-double">
                        <div class="print-block">
                            <label class="label-main">Pequena Vitória</label>
                            <label class="label-reference">O que seria um pequeno passo para começar hoje mesmo?</label>
                            <textarea id="pg-vitoria" class="persist input-field min-h-[100px] auto-resize" placeholder="Qual o próximo micro-passo?"></textarea>
                        </div>

                        <div class="print-block">
                            <label class="label-main">Por que valeu a pena?</label>
                            <label class="label-reference">Por que valeu demais essa sessão pra você?</label>
                            <textarea id="pi-worthy" class="persist input-field min-h-[100px] auto-resize" placeholder="O principal aprendizado de hoje..."></textarea>
                        </div>
                    </div>
                </div>

                <div class="no-print fixed bottom-0 left-0 w-full lg:bottom-8 lg:left-auto lg:right-8 lg:w-auto flex gap-3 p-4 lg:p-0 bg-white lg:bg-transparent border-t-4 border-black lg:border-t-0 z-50">
    
                    <button onclick="PerdasGanhosTool.clearForm()" 
                            class="flex-1 lg:flex-none bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-trash-alt text-red-500 group-active:scale-90 transition-transform"></i>
                        <span class="font-black text-xs uppercase text-black">Limpar</span>
                    </button>
                    
                    <button onclick="PerdasGanhosTool.print()" 
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
        if (confirm("Deseja realmente limpar todo o formulário de Perdas e Ganhos?")) {
            const fields = [
                'pg-name', 'pg-date', 'pg-coach', 'pg-obj',
                'pg-q1', 'pg-q2', 'pg-q3', 'pg-q4',
                'pg-ref1', 'pg-ref2', 'pg-ref3',
                'pg-vitoria', 'pi-worthy'
            ];

            fields.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.value = '';
                    localStorage.removeItem(id);
                }
            });

            window.location.hash = 'tool-perdas-ganhos';
            window.location.reload();
        }
    },

    print: () => {
        try {
            const getVal = (id) => document.getElementById(id)?.value || '---';

            const coachee = getVal('pg-name').toUpperCase();
            const coach = getVal('pg-coach').toUpperCase();
            const data = getVal('pg-date');
            const obj = getVal('pg-obj').toUpperCase();

            const printArea = document.getElementById('print-area');
            if (!printArea) return;

            printArea.innerHTML = `
                <style>
                    @media print {
                        @page { size: A4; margin: 0; }
                        body { margin: 0; padding: 15mm; background: white !important; font-family: 'Inter', sans-serif; }
                        .page-break { page-break-after: always; break-after: page; }
                    }
                    
                    .tool-title-area { border-bottom: 4px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
                    .title-report { font-size: 22px; font-weight: 900; text-transform: uppercase; margin: 0; }
                    .subtitle-report { font-weight: 700; color: #666; text-transform: uppercase; margin: 0; font-size: 10px; letter-spacing: 2px; }

                    .header-info { display: flex; gap: 10px; margin-bottom: 20px; }
                    .info-box { flex: 1; background: #ffde59 !important; border: 2px solid #000; padding: 8px 12px; -webkit-print-color-adjust: exact; }
                    .info-label { font-size: 8px; font-weight: 800; text-transform: uppercase; display: block; color: #000; }
                    .info-content { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #000; }

                    .obj-box { border: 2px solid #000; padding: 15px; margin-bottom: 20px; background: #f0f0f0 !important; -webkit-print-color-adjust: exact; }
                    
                    /* Matriz de Impressão */
                    .matrix-print { display: grid; grid-template-columns: 1fr 1fr; border: 2px solid #000; margin-bottom: 25px; }
                    .matrix-cell { padding: 15px; border: 1px solid #000; min-height: 150px; }
                    .cell-label { font-size: 11px; font-weight: 900; text-transform: uppercase; display: block; border-bottom: 2px solid #ffde59; padding-bottom: 5px; margin-bottom: 10px; }
                    .cell-content { font-size: 14px; line-height: 1.4; white-space: pre-wrap; }

                    .section-title { font-size: 16px; font-weight: 900; text-transform: uppercase; border-left: 5px solid #ffde59; padding-left: 10px; margin: 20px 0 10px 0; }
                    .ref-box { border: 1px solid #ddd; padding: 15px; background: #fafafa !important; font-size: 14px; line-height: 1.5; white-space: pre-wrap; margin-bottom: 15px; -webkit-print-color-adjust: exact; }

                    .avoid-break { break-inside: avoid; page-break-inside: avoid; }
                    .footer-print { text-align: center; font-size: 9px; color: #999; text-transform: uppercase; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px; }
                </style>

                <div class="page-break">
                    <div class="tool-title-area">
                        <h1 class="title-report">Relatório de Sessão</h1>
                        <p class="subtitle-report">Ferramenta: Perdas e Ganhos</p>
                    </div>

                    <div class="header-info">
                        <div class="info-box"><span class="info-label">Coachee</span><div class="info-content">${coachee}</div></div>
                        <div class="info-box"><span class="info-label">Coach</span><div class="info-content">${coach}</div></div>
                        <div class="info-box"><span class="info-label">Data</span><div class="info-content">${data}</div></div>
                    </div>

                    <div class="avoid-break" style="margin-top: 40px; display: grid; grid-template-columns: 1fr; gap: 20px;">
                        <div style="border: 2px solid #000; padding: 20px; background: #fffde5 !important; -webkit-print-color-adjust: exact;">
                            <span class="info-label" style="font-size: 16px; border-bottom: 2px solid #ffde59; padding-bottom: 5px; margin-bottom: 15px;">Pequena Vitória</span>
                            <div class="cell-content" style="font-size: 14px; line-height: 1.6;">${getVal('pg-vitoria')}</div>
                        </div>
                        <div style="border: 2px solid #000; padding: 20px; background: #fffde5 !important; -webkit-print-color-adjust: exact;">
                            <span class="info-label" style="font-size: 16px; border-bottom: 2px solid #ffde59; padding-bottom: 5px; margin-bottom: 15px;">Por que valeu a pena?</span>
                            <div class="cell-content" style="font-size: 14px; line-height: 1.6;">${getVal('pi-worthy')}</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="tool-title-area">
                        <h1 class="title-report">Perdas e Ganhos</h1>
                        <p class="subtitle-report">Análise de Decisão e Alinhamento</p>
                    </div>

                    <div class="obj-box">
                        <span class="info-label">Objetivo Analisado</span>
                        <div class="info-content" style="font-size: 14px;">${obj}</div>
                    </div>

                    <div class="matrix-print">
                        <div class="matrix-cell" style="background: #e6ffed !important; -webkit-print-color-adjust: exact;">
                            <span class="cell-label">1. GANHA se acontecer</span>
                            <div class="cell-content">${getVal('pg-q1')}</div>
                        </div>
                        <div class="matrix-cell" style="background: #fff5f5 !important; -webkit-print-color-adjust: exact;">
                            <span class="cell-label">2. PERDE se acontecer</span>
                            <div class="cell-content">${getVal('pg-q2')}</div>
                        </div>
                        <div class="matrix-cell" style="background: #fffaf0 !important; -webkit-print-color-adjust: exact;">
                            <span class="cell-label">3. PERDE se NÃO acontecer</span>
                            <div class="cell-content">${getVal('pg-q3')}</div>
                        </div>
                        <div class="matrix-cell" style="background: #ebf8ff !important; -webkit-print-color-adjust: exact;">
                            <span class="cell-label">4. GANHA se NÃO acontecer</span>
                            <div class="cell-content">${getVal('pg-q4')}</div>
                        </div>
                    </div>

                    <div class="avoid-break">
                        <h2 class="section-title">Estratégias e Aprendizados</h2>
                        
                        <span class="info-label" style="margin-top: 15px;">5. Minimizar perdas da mudança</span>
                        <div class="ref-box">${getVal('pg-ref1')}</div>

                        <span class="info-label">6. Manter ganhos atuais</span>
                        <div class="ref-box">${getVal('pg-ref2')}</div>

                        <span class="info-label">7. Aprendizado Geral</span>
                        <div class="ref-box" style="background: #fffde5 !important;">${getVal('pg-ref3')}</div>
                    </div>

                    <div class="footer-print">
                        Kotini App - Gerado em ${new Date().toLocaleDateString('pt-BR')}
                    </div>
                </div>
            `;

            setTimeout(() => { window.print(); }, 500);
        } catch (e) { console.error(e); }
    }
};

if (typeof window !== 'undefined') window.PerdasGanhosTool = PerdasGanhosTool;
