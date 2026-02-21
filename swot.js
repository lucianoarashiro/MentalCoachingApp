window.SWOTTool = (function(){
    'use strict';
    const that = {
    load: () => {
        const container = document.getElementById('view-swot');
        if (!container) return;
        if (container.querySelector('#swot-main')) return; // already built

        const html = `
            <div id="swot-main" class="flex flex-col gap-6">
                
                <div class="mb-6 flex justify-between items-center border-b-4 border-black pb-4">
                    <div class="w-20"></div>
                    <h2 class="font-black uppercase text-2xl text-center">Matriz SWOT Pessoal</h2>
                    <div class="w-20"></div>
                </div>

                <div class="no-print mb-8">
                    <details class="bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] group overflow-hidden transition-all">
                        <summary class="list-none cursor-pointer p-4 flex justify-between items-center font-black uppercase text-sm hover:bg-gray-50 transition-colors">
                            <span class="flex items-center gap-3">
                                <i class="fas fa-search text-[#ffde59]"></i>
                                Roteiro e Orientações: Análise SWOT
                            </span>
                            <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                        </summary>
                        <div class="p-6 border-t-4 border-black bg-gray-50 space-y-4 text-sm leading-relaxed">
                            <p><strong>Objetivo:</strong> Avaliar forças e fraquezas (interno) e oportunidades e ameaças (externo) para embasar decisões estratégicas.</p>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_black]">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Fatores Internos:</h4>
                                    <ul class="list-disc pl-4 space-y-1 text-xs">
                                        <li><strong>Forças:</strong> O que você faz bem? Quais seus talentos únicos?</li>
                                        <li><strong>Fraquezas:</strong> Onde você falha? O que te impede de avançar?</li>
                                    </ul>
                                </div>
                                <div class="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_black]">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Fatores Externos:</h4>
                                    <ul class="list-disc pl-4 space-y-1 text-xs">
                                        <li><strong>Oportunidades:</strong> Quais tendências ou contatos podem te ajudar?</li>
                                        <li><strong>Ameaças:</strong> Quais obstáculos externos ou concorrentes existem?</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="bg-[#ffde59] border-2 border-black p-3 mb-4">
                                <p class="text-xs font-black uppercase"><i class="fas fa-lightbulb mr-2"></i> Dica de Ouro:</p>
                                <p class="text-xs">Para uma análise mais profunda, preencha a matriz no <strong>sentido horário</strong> (Forças → Fraquezas → Ameaças → Oportunidades). Isso ajuda a confrontar seus pontos de melhoria com os riscos externos antes de visualizar as soluções.</p>
                            </div>
                        </div>
                    </details>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Coachee</label>
                        <input type="text" id="swot-name" class="persist input-field" placeholder="Nome do cliente">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Data</label>
                        <input type="date" id="swot-date" class="persist input-field">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Coach</label>
                        <input type="text" id="swot-coach" class="persist input-field" placeholder="Nome do coach">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
    
                    <div class="bc-card p-0 overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_#4ade80] relative">
                        <div class="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-black text-[10px] z-10">1</div>
                        <div class="bg-[#4ade80] p-3 border-b-4 border-black flex items-center gap-2">
                            <i class="fas fa-dumbbell"></i><span class="font-black uppercase text-sm">Forças (Interno)</span>
                        </div>
                        <textarea id="swot-strengths" tabindex="1" class="persist w-full p-4 min-h-[200px] bg-white border-none focus:ring-0 font-bold text-sm" placeholder="O que você faz bem?"></textarea>
                    </div>

                    <div class="bc-card p-0 overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_#f87171] relative">
                        <div class="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-black text-[10px] z-10">2</div>
                        <div class="bg-[#f87171] p-3 border-b-4 border-black flex items-center gap-2">
                            <i class="fas fa-exclamation-triangle"></i><span class="font-black uppercase text-sm">Fraquezas (Interno)</span>
                        </div>
                        <textarea id="swot-weaknesses" tabindex="2" class="persist w-full p-4 min-h-[200px] bg-white border-none focus:ring-0 font-bold text-sm" placeholder="O que precisa melhorar?"></textarea>
                    </div>

                    <div class="bc-card p-0 overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_#60a5fa] relative">
                        <div class="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-black text-[10px] z-10">4</div>
                        <div class="bg-[#60a5fa] p-3 border-b-4 border-black flex items-center gap-2">
                            <i class="fas fa-chart-line"></i><span class="font-black uppercase text-sm">Oportunidades (Externo)</span>
                        </div>
                        <textarea id="swot-opportunities" tabindex="4" class="persist w-full p-4 min-h-[200px] bg-white border-none focus:ring-0 font-bold text-sm" placeholder="Quais caminhos estão abertos?"></textarea>
                    </div>

                    <div class="bc-card p-0 overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_#fb923c] relative">
                        <div class="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-black text-[10px] z-10">3</div>
                        <div class="bg-[#fb923c] p-3 border-b-4 border-black flex items-center gap-2">
                            <i class="fas fa-shield-alt"></i><span class="font-black uppercase text-sm">Ameaças (Externo)</span>
                        </div>
                        <textarea id="swot-threats" tabindex="3" class="persist w-full p-4 min-h-[200px] bg-white border-none focus:ring-0 font-bold text-sm" placeholder="Quais riscos externos existem?"></textarea>
                    </div>
                </div>

                <div class="bc-card p-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_black]">
                    <label class="label-main flex items-center gap-2">
                        <span class="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px]">5</span>
                        Plano de Ação (Cruzamento SWOT)
                    </label>
                    <textarea id="swot-action" tabindex="5" class="persist input-field min-h-[120px]" placeholder="Como usar suas forças para aproveitar as oportunidades e mitigar as ameaças?"></textarea>
                </div>

                <!-- Conclusão -->
                <div class="space-y-8 mt-12 pt-8 border-t-2 border-black">
                    <div>
                        <label class="label-main">Pequena vitória</label>
                        <label class="label-reference">Que passo você vai realizar até nossa próxima sessão rumo ao seu objetivo?</label>
                        <textarea id="swot-victory" class="persist input-field min-h-[80px] auto-resize" placeholder="Um passo prático hoje..."></textarea>
                    </div>
                    <div>
                        <label class="label-main">Por que valeu a pena?</label>
                        <label class="label-reference">Por que valeu demais essa sessão pra você?</label>
                        <textarea id="swot-worthy" class="persist input-field min-h-[80px] auto-resize" placeholder="O que descobriu hoje..."></textarea>
                    </div>
                </div>

                <div class="no-print fixed bottom-0 left-0 w-full lg:bottom-8 lg:left-auto lg:right-8 lg:w-auto flex gap-3 p-4 lg:p-0 bg-white lg:bg-transparent border-t-4 border-black lg:border-t-0 z-50">
                    <button onclick="SWOTTool.clearForm()" class="flex-1 lg:flex-none bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-trash-alt text-red-500 group-active:scale-90 transition-transform"></i>
                        <span class="font-black text-xs uppercase text-black">Limpar</span>
                    </button>
                    <button onclick="SWOTTool.print()" class="flex-[2] lg:flex-none bg-[#ffde59] border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-print text-lg text-black group-active:scale-90 transition-transform"></i>
                        <span class="font-black text-xs uppercase text-black">Imprimir Relatório</span>
                    </button>
                </div>
                <div class="h-28 lg:hidden"></div>

            </div>
        `;
        
        container.innerHTML = html;
        console.log('DEBUG: SWOTTool.load() HTML injected', container.innerHTML.length);
    },

    // 1. LIMPAR FORMULÁRIO
    clearForm: () => {
        if (confirm("Deseja realmente apagar toda a Matriz SWOT?")) {
            const fields = [
                'swot-name', 'swot-date', 'swot-coach',
                'swot-strengths', 'swot-weaknesses', 'swot-threats', 
                'swot-opportunities', 'swot-action', 'swot-victory', 'swot-worthy'
            ];
            fields.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
                localStorage.removeItem(id);
            });
            
            // Recarrega a página para resetar tudo e aplicar a data padrão
            window.location.hash = '#swot'; // Garante que a hash seja swot para recarregar na mesma view
            window.location.reload();
        }
    },

    // 2. CABEÇALHO PADRONIZADO
    getHeaderHTML: (subtitulo) => {
        const getVal = (id) => document.getElementById(id)?.value || '---';
        return `
            <div class="print-header">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h1 style="font-family:'Space Grotesk'; font-size:18px; font-weight:900; margin:0">MATRIZ SWOT PESSOAL</h1>
                    <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #666;">${subtitulo}</span>
                </div>
                <div class="info-grid">
                    <div class="info-item"><span class="info-label">Coachee</span><div class="info-content">${getVal('swot-name').toUpperCase()}</div></div>
                    <div class="info-item"><span class="info-label">Coach</span><div class="info-content">${getVal('swot-coach').toUpperCase()}</div></div>
                    <div class="info-item"><span class="info-label">Data</span><div class="info-content">${getVal('swot-date')}</div></div>
                </div>
            </div>
        `;
    },

    // 3. IMPRESSÃO PADRONIZADA (PÁGINA 1: CONCLUSÕES | PÁGINA 2: MATRIZ)
    print: () => {
        try {
            const getVal = (id) => document.getElementById(id)?.value || '---';
            const printArea = document.getElementById('print-area');
            if (!printArea) return;

            printArea.innerHTML = `
                <style>
                    @page { size: A4; margin: 15mm; }
                    @media print {
                        html, body { margin: 0; padding: 0; background: white !important; -webkit-print-color-adjust: exact; }
                        .page-break { page-break-after: always; break-after: page; display: block; }
                        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
                    }
                    .report-container { font-family: 'Inter', sans-serif; width: 100%; color: black; }
                    .print-header { border-bottom: 4px solid #000; margin-bottom: 20px; padding-bottom: 10px; }
                    .info-grid { display: flex; gap: 8px; margin-top: 10px; }
                    .info-item { flex: 1; border: 2px solid #000; padding: 6px 10px; background: #ffde59 !important; }
                    .info-label { font-size: 7px; font-weight: 900; text-transform: uppercase; display: block; line-height: 1; }
                    .info-content { font-size: 10px; font-weight: 800; text-transform: uppercase; }
                    
                    .section-title { font-size: 11px; font-weight: 900; text-transform: uppercase; margin-top: 20px; margin-bottom: 6px; font-family: 'Space Grotesk'; border-left: 4px solid #000; padding-left: 8px; }
                    .text-box-print { border: 2px solid #000; padding: 12px; white-space: pre-wrap; font-size: 11px; line-height: 1.4; text-align: left; margin-bottom: 20px; }
                    
                    .swot-grid-print { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
                    .swot-box-print { border: 2px solid #000; padding: 10px; min-height: 250px; display: flex; flex-direction: column; }
                    .swot-tag { font-size: 8px; font-weight: 900; text-transform: uppercase; padding: 2px 6px; border: 2px solid #000; display: inline-block; margin-bottom: 8px; width: fit-content; }
                    .swot-text { font-size: 10.5px; white-space: pre-wrap; line-height: 1.4; }
                </style>

                <div class="report-container">
                    <div class="page-break">
                        ${SWOTTool.getHeaderHTML('Conclusões da Sessão')}
                        
                        <div class="avoid-break">
                            <h3 class="section-title">Pequena Vitória</h3>
                            <div class="text-box-print">${getVal('swot-victory')}</div>
                        </div>

                        <div class="avoid-break">
                            <h3 class="section-title">Por que valeu a pena?</h3>
                            <div class="text-box-print">${getVal('swot-worthy')}</div>
                        </div>
                    </div>

                    <div class="avoid-break">
                        ${SWOTTool.getHeaderHTML('Matriz SWOT Detalhada')}
                        
                        <div class="swot-grid-print">
                            <div class="swot-box-print" style="background: #e8fdf0 !important;">
                                <span class="swot-tag" style="background: #4ade80 !important;">1. Forças</span>
                                <div class="swot-text">${getVal('swot-strengths')}</div>
                            </div>
                            <div class="swot-box-print" style="background: #fef2f2 !important;">
                                <span class="swot-tag" style="background: #f87171 !important;">2. Fraquezas</span>
                                <div class="swot-text">${getVal('swot-weaknesses')}</div>
                            </div>
                            <div class="swot-box-print" style="background: #fff7ed !important;">
                                <span class="swot-tag" style="background: #fb923c !important;">3. Ameaças</span>
                                <div class="swot-text">${getVal('swot-threats')}</div>
                            </div>
                            <div class="swot-box-print" style="background: #eff6ff !important;">
                                <span class="swot-tag" style="background: #60a5fa !important;">4. Oportunidades</span>
                                <div class="swot-text">${getVal('swot-opportunities')}</div>
                            </div>
                        </div>

                        <div class="avoid-break" style="margin-top: 10px;">
                            <span class="swot-tag" style="background: #000; color: #fff;">5. Plano de Ação (Cruzamento SWOT)</span>
                            <div class="text-box-print" style="margin-top:5px; background: #fafafa !important;">${getVal('swot-action')}</div>
                        </div>
                    </div>
                </div>
            `;
            setTimeout(() => window.print(), 500);
        } catch (e) { console.error(e); }
    }
    };

    return that;
})();

// 4. LÓGICA DE NAVEGAÇÃO (TAB)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const active = document.activeElement;
        
        // Fluxo: Coach -> Forças(1)
        if (active.id === 'swot-coach' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('swot-strengths').focus();
        }
        // Fluxo Horário: Fraquezas(2) -> Ameaças(3)
        else if (active.id === 'swot-weaknesses' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('swot-threats').focus();
        }
        // Fluxo Horário: Ameaças(3) -> Oportunidades(4)
        else if (active.id === 'swot-threats' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('swot-opportunities').focus();
        }
        // Fluxo: Oportunidades(4) -> Plano de Ação(5)
        else if (active.id === 'swot-opportunities' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('swot-action').focus();
        }
    }
});