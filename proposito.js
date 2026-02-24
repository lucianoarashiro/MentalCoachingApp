/*-- ==========================================
TOOL: PROPÓSITO INABALÁVEL
========================================== */

const PropositoTool = {
    load: () => {
        const container = document.getElementById('view-tool-proposito');
        if (!container) return;
        if (container.querySelector('#proposito-main')) return; // already built

        const html = `
            <div id="proposito-main" class="mb-6 flex justify-between items-center border-b-2 border-black pb-4">
                <div class="w-20"></div>
                <div class="text-center">
                    <h2 class="font-black uppercase text-xl">Propósito Inabalável</h2>
                </div>
                <div class="w-20"></div>
            </div>

            <div class="no-print mb-8">
                <details class="bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] group overflow-hidden transition-all">
                    <summary class="list-none cursor-pointer p-4 flex justify-between items-center font-black uppercase text-sm hover:bg-gray-50 transition-colors">
                        <span class="flex items-center gap-3">
                            <i class="fas fa-bullseye text-[#ffde59]"></i>
                            Orientações de Aplicação
                        </span>
                        <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                    </summary>
                    
                    <div class="p-6 border-t-4 border-black bg-gray-50 space-y-4 text-sm leading-relaxed">
                        <div class="space-y-4 text-gray-800">
                            <p><strong>Objetivo:</strong> Identificar e fortalecer os motivos que sustentam a jornada do coachee, dividindo-os em esferas pessoal, social e global.</p>
                            
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-white p-3 border-2 border-black">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Dicas de Condução:</h4>
                                    <ul class="list-disc pl-4 space-y-1 text-xs">
                                        <li><strong>Esferas:</strong> Ajude o coachee a pensar além dele mesmo (família, mundo).</li>
                                        <li><strong>Inabalável:</strong> Os 3 escolhidos devem ser aqueles que impedem a desistência no pior dia.</li>
                                    </ul>
                                </div>
                                <div class="bg-white p-3 border-2 border-black">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Perguntas Poderosas:</h4>
                                    <ul class="list-disc pl-4 space-y-1 text-xs">
                                        <li>"Se tudo desse errado, por quem você continuaria?"</li>
                                        <li>"Como o mundo se beneficia da sua vitória?"</li>
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
                        <input type="text" id="pi-name" class="persist input-field" placeholder="Nome do cliente">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Data</label>
                        <input type="date" id="pi-date" class="persist input-field">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Coach</label>
                        <input type="text" id="pi-coach" class="persist input-field" placeholder="Nome do coach">
                    </div>
                </div>
                
                <div class="space-y-12">
                    <!-- 1. Motivação Pessoal -->
                    <div class="print-block">
                        <label class="label-main">1. Motivação Pessoal (EU)</label>
                        <label class="label-reference">Quais são as coisas que te motivam relacionadas a você mesma? (Seus sonhos, conquistas pessoais, satisfação)</label>
                        <textarea id="pi-eu" class="persist input-field min-h-[100px] auto-resize" placeholder="Minhas motivações pessoais..."></textarea>
                    </div>

                    <!-- 2. Motivação Coletiva -->
                    <div class="print-block">
                        <label class="label-main">2. Motivação Coletiva (NÓS)</label>
                        <label class="label-reference">Quais são as coisas que te motivam relacionadas a nós? (Pessoas próximas, família, amigos, empresa, legados diretos)</label>
                        <textarea id="pi-nos" class="persist input-field min-h-[100px] auto-resize" placeholder="Motivações relacionadas aos outros..."></textarea>
                    </div>

                    <!-- 3. Motivação Global -->
                    <div class="print-block">
                        <label class="label-main">3. Motivação Global (MUNDO)</label>
                        <label class="label-reference">Quais são as coisas que te motivam relacionadas ao mundo como um todo? (Causas, impacto social, contribuição maior)</label>
                        <textarea id="pi-mundo" class="persist input-field min-h-[100px] auto-resize" placeholder="Motivações relacionadas ao mundo..."></textarea>
                    </div>

                    <!-- 4. Top 3 Propósitos Inabaláveis -->
                    <div class="p-6 bg-[#ffde5933] border-4 border-black print-block">
                        <label class="label-main mb-2">4. Top 3 Propósitos Inabaláveis</label>
                        <label class="label-reference mb-4 block italic">De todos esses propósitos listados acima, quais são os 3 propósitos inabaláveis mais fortes, que nesse momento têm o maior potencial de te mover adiante?</label>
                        
                        <div class="space-y-4">
                            <div class="flex gap-4 items-center">
                                <span class="font-black text-2xl">1.</span>
                                <input type="text" id="pi-top1" class="persist input-field bg-white" placeholder="O propósito mais forte">
                            </div>
                            <div class="flex gap-4 items-center">
                                <span class="font-black text-2xl">2.</span>
                                <input type="text" id="pi-top2" class="persist input-field bg-white" placeholder="Segundo propósito mais forte">
                            </div>
                            <div class="flex gap-4 items-center">
                                <span class="font-black text-2xl">3.</span>
                                <input type="text" id="pi-top3" class="persist input-field bg-white" placeholder="Terceiro propósito mais forte">
                            </div>
                        </div>
                    </div>

                    <!-- 5. Percepção -->
                    <div class="print-block">
                        <label class="label-main">5. Percepção Geral</label>
                        <label class="label-reference">Olhando para este quadro como um todo, o que você percebe?</label>
                        <textarea id="pi-percepcao" class="persist input-field min-h-[100px] auto-resize" placeholder="Sua reflexão sobre o todo..."></textarea>
                    </div>

                    <!-- 6. Perguntas Padrão -->
                    <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
                        <div class="print-block">
                            <label class="label-main">Pequena Vitória</label>
                            <label class="label-reference">O que seria um pequeno passo para começar hoje mesmo?</label>
                            <textarea id="pi-vitoria" class="persist input-field min-h-[100px] auto-resize" placeholder="Qual o próximo micro-passo?"></textarea>
                        </div>

                        <div class="print-block">
                            <label class="label-main">Por que valeu a pena?</label>
                            <label class="label-reference">Por que valeu demais essa sessão pra você?</label>
                            <textarea id="pi-worthy" class="persist input-field min-h-[100px] auto-resize" placeholder="O principal aprendizado de hoje..."></textarea>
                        </div>
                    </div>
                </div>

                <div class="no-print fixed bottom-0 left-0 w-full lg:bottom-8 lg:left-auto lg:right-8 lg:w-auto flex gap-3 p-4 lg:p-0 bg-white lg:bg-transparent border-t-4 border-black lg:border-t-0 z-50">
    
                    <button onclick="PropositoTool.clearForm()" 
                            class="flex-1 lg:flex-none bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-trash-alt text-red-500 group-active:scale-90 transition-transform"></i>
                        <span class="font-black text-xs uppercase text-black">Limpar</span>
                    </button>
                    
                    <button onclick="PropositoTool.print()" 
                            class="flex-[2] lg:flex-none bg-[#ffde59] border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-print text-lg text-black group-active:scale-90 transition-transform"></i>
                        <span class="font-black text-xs uppercase text-black">Imprimir Relatório</span>
                    </button>
                </div>

                <div class="h-28 lg:hidden"></div>
            </div>
        `;

        container.innerHTML = html;
        Storage.loadAll(); // Re-carrega os dados persistentes para esta tool
    },

    clearForm: () => {
        if (confirm("Deseja realmente limpar todo o formulário de Propósito Inabalável?")) {
            const fields = [
                'pi-name', 'pi-date', 'pi-coach',
                'pi-eu', 'pi-nos', 'pi-mundo',
                'pi-top1', 'pi-top2', 'pi-top3',
                'pi-percepcao', 'pi-vitoria', 'pi-worthy'
            ];

            fields.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.value = '';
                    localStorage.removeItem(id);
                }
            });

            window.location.hash = 'tool-proposito';
            window.location.reload();
        }
    },

    print: () => {
        try {
            const getVal = (id) => document.getElementById(id)?.value || '---';

            const coachee = getVal('pi-name').toUpperCase();
            const coach = getVal('pi-coach').toUpperCase();
            const data = getVal('pi-date');

            const printArea = document.getElementById('print-area');
            if (!printArea) return;

            printArea.innerHTML = `
                <style>
                    @media print {
                        @page { size: A4; margin: 0; }
                        body { margin: 0; padding: 15mm; background: white !important; font-family: 'Inter', sans-serif; }
                    }
                    
                    .report-table { width: 100%; border-collapse: collapse; }
                    
                    .tool-title-area {
                        border-bottom: 4px solid #1a1a1a;
                        padding-bottom: 15px;
                        margin-bottom: 20px;
                    }
                    .title-report { font-size: 22px; font-weight: 900; text-transform: uppercase; margin: 0; letter-spacing: -1px; }
                    .subtitle-report { font-weight: 700; color: #666; text-transform: uppercase; margin: 0; font-size: 10px; letter-spacing: 2px; }

                    .header-info { display: flex; gap: 15px; margin-bottom: 30px; }
                    .info-box { flex: 1; background: #ffde59 !important; border: 3px solid #000; padding: 10px 15px; -webkit-print-color-adjust: exact; }
                    .info-label { font-size: 9px; font-weight: 800; text-transform: uppercase; margin-bottom: 4px; display: block; color: #000; }
                    .info-content { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #000; }

                    .section-title { 
                        font-size: 16px; 
                        font-weight: 900; 
                        text-transform: uppercase; 
                        background: #000 !important; 
                        color: #fff !important; 
                        padding: 8px 15px; 
                        display: inline-block; 
                        margin-bottom: 15px;
                        -webkit-print-color-adjust: exact;
                    }

                    .vitoria-worthy { display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 30px; }
                    .sphere-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 30px; }
                    .sphere-box { border: 2px solid #000; padding: 15px; background: #f9f9f9 !important; -webkit-print-color-adjust: exact; }
                    .sphere-label { font-weight: 800; text-transform: uppercase; font-size: 10px; border-bottom: 2px solid #ffde59; padding-bottom: 5px; margin-bottom: 10px; display: block; }
                    .sphere-content { font-size: 12px; line-height: 1.5; white-space: pre-wrap; }

                    .top3-container { border: 4px solid #000; padding: 25px; background: #ffde5915 !important; margin-bottom: 30px; -webkit-print-color-adjust: exact; }
                    .top3-item { display: flex; gap: 15px; align-items: flex-start; margin-bottom: 15px; border-bottom: 1px dashed #ccc; padding-bottom: 10px; }
                    .top3-num { font-size: 24px; font-weight: 900; line-height: 1; }
                    .top3-text { font-size: 14px; font-weight: 700; text-transform: uppercase; }

                    .avoid-break { break-inside: avoid; page-break-inside: avoid; margin-bottom: 25px; }
                    .reflection-box { border: 2px solid #000; padding: 20px; font-size: 14px; line-height: 1.6; background: #fff !important; -webkit-print-color-adjust: exact; white-space: pre-wrap; }
                    
                    .mini-box { border: 2px solid #000; padding: 15px; }
                    .mini-label { font-weight: 800; text-transform: uppercase; font-size: 10px; margin-bottom: 10px; display: block; }

                    .footer-print { text-align: center; font-size: 10px; color: #999; text-transform: uppercase; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; }
                </style>

                <table class="report-table">
                    <thead>
                        <tr>
                            <td>
                                <div class="tool-title-area">
                                    <h1 class="title-report">Propósito Inabalável</h1>
                                    <p class="subtitle-report">Relatório de Alinhamento e Missão</p>
                                </div>

                                <div class="header-info">
                                    <div class="info-box"><span class="info-label">Coachee</span><div class="info-content">${coachee}</div></div>
                                    <div class="info-box"><span class="info-label">Coach</span><div class="info-content">${coach}</div></div>
                                    <div class="info-box"><span class="info-label">Data</span><div class="info-content">${data}</div></div>
                                </div>
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <div class="avoid-break vitoria-worthy">
                                    <h2 class="section-title">1. Reflexão</h2>
                                    <div class="mini-box">
                                        <span class="mini-label">Pequena Vitória</span>
                                        <div class="sphere-content">${getVal('pi-vitoria')}</div>
                                    </div>
                                    <div class="mini-box">
                                        <span class="mini-label">Por que valeu a pena?</span>
                                        <div class="sphere-content">${getVal('pi-worthy')}</div>
                                    </div>
                                </div>

                                <div class="page-break avoid-break">
                                    <h2 class="section-title">2. As Esferas de Motivação</h2>
                                    <div class="sphere-grid">
                                        <div class="sphere-box">
                                            <span class="sphere-label">Pessoal (EU)</span>
                                            <div class="sphere-content">${getVal('pi-eu')}</div>
                                        </div>
                                        <div class="sphere-box">
                                            <span class="sphere-label">Coletiva (NÓS)</span>
                                            <div class="sphere-content">${getVal('pi-nos')}</div>
                                        </div>
                                        <div class="sphere-box">
                                            <span class="sphere-label">Global (MUNDO)</span>
                                            <div class="sphere-content">${getVal('pi-mundo')}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="avoid-break">
                                    <h2 class="section-title">3. Propósitos Inabaláveis (Top 3)</h2>
                                    <div class="top3-container">
                                        <div class="top3-item">
                                            <span class="top3-num">1.</span>
                                            <span class="top3-text">${getVal('pi-top1')}</span>
                                        </div>
                                        <div class="top3-item">
                                            <span class="top3-num">2.</span>
                                            <span class="top3-text">${getVal('pi-top2')}</span>
                                        </div>
                                        <div class="top3-item" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
                                            <span class="top3-num">3.</span>
                                            <span class="top3-text">${getVal('pi-top3')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="avoid-break">
                                    <h2 class="section-title">4. Percepção</h2>
                                    <div class="reflection-box">${getVal('pi-percepcao')}</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr>
                            <td>
                                <div class="footer-print">
                                    Kotini App - Gerado em ${new Date().toLocaleDateString('pt-BR')}
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            `;

            setTimeout(() => { window.print(); }, 500);
        } catch (e) { console.error(e); }
    }
};

if (typeof window !== 'undefined') window.PropositoTool = PropositoTool;
