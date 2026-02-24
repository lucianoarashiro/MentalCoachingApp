/*-- ==========================================
TOOL: CLAREZA PLENA (Repetição Automática de Cabeçalho)
========================================== */

const ClarezaTool = {
    load: () => {
        const container = document.getElementById('view-tool-clareza');
        if (!container) return;
        if (container.querySelector('#clareza-main')) return; // already built

        const html = `
            <div id="clareza-main" class="mb-6 flex justify-between items-center border-b-2 border-black pb-4">
                <div class="w-20"></div>
                <div class="text-center">
                    <h2 class="font-black uppercase text-xl">Clareza Plena</h2>
                </div>
                <div class="w-20"></div>
            </div>

            <div class="no-print mb-8">
                <details class="bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] group overflow-hidden transition-all">
                    <summary class="list-none cursor-pointer p-4 flex justify-between items-center font-black uppercase text-sm hover:bg-gray-50 transition-colors">
                        <span class="flex items-center gap-3">
                            <i class="fas fa-chalkboard-teacher text-[#ffde59]"></i>
                            Roteiro e Orientações de Aplicação
                        </span>
                        <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                    </summary>
                    
                    <div class="p-6 border-t-4 border-black bg-gray-50 space-y-4 text-sm leading-relaxed">
                        <div class="space-y-4 text-gray-800">
                            <p><strong>Objetivo:</strong> Trazer clareza absoluta sobre o estado atual e o destino desejado, alinhando a identidade do coachee ao processo.</p>
                            
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-white p-3 border-2 border-black">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Dicas de Condução:</h4>
                                    <ul class="list-disc pl-4 space-y-1 text-xs">
                                        <li><strong>EPP:</strong> Foque na vitória da semana anterior para gerar dopamina.</li>
                                        <li><strong>Fotografia:</strong> Peça para descrever com detalhes sensoriais (o que vê, ouve e sente).</li>
                                    </ul>
                                </div>
                                <div class="bg-white p-3 border-2 border-black">
                                    <h4 class="font-bold border-b-2 border-[#ffde59] mb-2 pb-1 uppercase text-xs italic">Perguntas Poderosas:</h4>
                                    <ul class="list-disc pl-4 space-y-1 text-xs">
                                        <li>"O que te impede de desistir?"</li>
                                        <li>"Quem você se torna quando alcança isso?"</li>
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
                        <input type="text" id="cp-name" class="persist input-field" placeholder="Nome do cliente">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Data</label>
                        <input type="date" id="cp-date" class="persist input-field">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase block mb-1">Coach</label>
                        <input type="text" id="cp-coach" class="persist input-field" placeholder="Nome do coach">
                    </div>
                </div>
                
                <div class="space-y-12">
                    <!-- Perguntas -->
                    <div class="print-block">
                        <label class="label-main">Resultado esperado</label>
                        <label class="label-reference">O que você veio buscar aqui? O que traz você aqui na minha frente?</label>
                        <textarea id="cp-actual" class="persist input-field min-h-[120px] auto-resize" placeholder="Resposta do coachee..."></textarea>
                    </div>

                    <div class="print-block">
                        <label class="label-main">Resultado esperado do processo</label>
                        <label class="label-reference">Sabendo que o processo de coaching dura aproximadamente 10 sessões, o que vai fazer o processo de coaching ter sido surreal?</label>
                        <textarea id="cp-desired" class="persist input-field min-h-[120px] auto-resize" placeholder="Resposta do coachee..."></textarea>
                    </div>

                    <div class="print-block">
                        <label class="label-main">Fotografia</label>
                        <label class="label-reference">Quando isso acontecer, se você pudesse bater uma foto de um momento que simboliza essa conquista, qual seria o momento?</label>
                        <textarea id="cp-picture" class="persist input-field min-h-[120px] auto-resize" placeholder="Resposta do coachee..."></textarea>
                    </div>

                    <div class="print-block">
                        <label class="label-main">Propósito Inabalável</label>
                        <label class="label-reference">Por que isso é importante pra você? Quem vai ter orgulho de você?</label>
                        <textarea id="cp-purpose" class="persist input-field min-h-[120px] auto-resize" placeholder="Resposta do coachee..."></textarea>
                    </div>

                    <!-- Pergunta 5 Sintetizada -->
                    <div class="p-6 bg-gray-50 border-4 border-black border-dashed print-block">
                        <label class="label-main mb-6 break-words-mobile">Comprometimento e Autorresponsabilidade</label>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <label class="text-[10px] font-black uppercase text-gray-500 block mb-2">Quem é responsável?</label>
                                <input type="text" id="cp-resp-who" class="persist input-field bg-white py-2" placeholder="Ex: Eu mesmo.">
                            </div>

                            <div>
                                <label class="text-[10px] font-black uppercase text-gray-500 block mb-2">Nível de responsabilidade (0-100%)</label>
                                <div class="flex items-center gap-3">
                                    <input type="range" id="cp-resp-level" min="0" max="100" value="100" class="persist range-slider" oninput="document.getElementById('resp-val').innerText = this.value + '%'">
                                    <span id="resp-val" class="text-xl font-black font-mono w-16">100%</span>
                                </div>
                            </div>

                            <div>
                                <label class="text-[10px] font-black uppercase text-gray-500 block mb-2">Comprometimento (1 a 5)</label>
                                <div class="grid grid-cols-5 gap-1 commit-group">
                                    <label><input type="radio" name="commit" value="1" class="persist persist-radio"><div class="commit-label">1</div></label>
                                    <label><input type="radio" name="commit" value="2" class="persist persist-radio"><div class="commit-label">2</div></label>
                                    <label><input type="radio" name="commit" value="3" class="persist persist-radio"><div class="commit-label">3</div></label>
                                    <label><input type="radio" name="commit" value="4" class="persist persist-radio"><div class="commit-label">4</div></label>
                                    <label><input type="radio" name="commit" value="5" class="persist persist-radio" checked><div class="commit-label">5</div></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="print-block">
                        <label class="label-main">Pequena vitória</label>
                        <label class="label-reference">O que seria um pequeno passo para começar hoje mesmo?</label>
                        <textarea id="cp-epp" class="persist input-field min-h-[120px] auto-resize" placeholder="Resposta do coachee..."></textarea>
                    </div>

                    <div class="print-block">
                        <label class="label-main">Por que valeu a pena</label>
                        <label class="label-reference">Por que valeu demais essa sessão pra você?</label>
                        <textarea id="cp-worthy" class="persist input-field min-h-[120px] auto-resize" placeholder="Resposta do coachee..."></textarea>
                    </div>
                </div>

                <div class="no-print fixed bottom-0 left-0 w-full lg:bottom-8 lg:left-auto lg:right-8 lg:w-auto flex gap-3 p-4 lg:p-0 bg-white lg:bg-transparent border-t-4 border-black lg:border-t-0 z-50">
    
                    <button onclick="ClarezaTool.clearForm()" 
                            class="flex-1 lg:flex-none bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-trash-alt text-red-500 group-active:scale-90 transition-transform"></i>
                        <span class="font-black text-xs uppercase text-black">Limpar</span>
                    </button>
                    
                    <button onclick="ClarezaTool.print()" 
                            class="flex-[2] lg:flex-none bg-[#ffde59] border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_0px_black] transition-all flex items-center justify-center gap-2 group">
                        <i class="fas fa-print text-lg text-black group-active:scale-90 transition-transform"></i>
                        <span class="font-black text-xs uppercase text-black">Imprimir Relatório</span>
                    </button>
                </div>

                <div class="h-28 lg:hidden"></div>
            </div>
        `;

        container.innerHTML = html;
    },

    clearForm: () => {
        if (confirm("Deseja realmente limpar todo o formulário de Clareza Plena?")) {
            // IDs de todos os campos da ferramenta
            const fields = [
                'cp-epp', 'cp-worthy', 'cp-actual', 'cp-desired',
                'cp-picture', 'cp-purpose', 'cp-resp-who', 'cp-resp-level',
                'cp-name', 'cp-coach', 'cp-date'
            ];

            fields.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.value = '';
                    localStorage.removeItem(id);
                }
            });

            // Limpa o comprometimento
            localStorage.removeItem('commit');
            document.querySelectorAll('input[name="commit"]').forEach(r => r.checked = false);

            // Reseta visualmente o badge de %
            const badge = document.getElementById('resp-val');
            if (badge) badge.innerText = '0%';

            // TRUQUE: Adiciona o hash na URL e recarrega
            window.location.hash = 'tool-clareza';
            window.location.reload();
        }
    },

    print: () => {
        try {
            const getVal = (id) => document.getElementById(id)?.value || '---';
            // Função robusta para pegar o rádio (Comprometimento)
            const getRadio = (name) => {
                const checked = document.querySelector(`input[name="${name}"]:checked`);
                return checked ? checked.value : '---';
            };

            const coachee = getVal('cp-name').toUpperCase();
            const coach = getVal('cp-coach').toUpperCase();
            const data = getVal('cp-date');
            const vitoria = getVal('cp-epp');
            const valeuPena = getVal('cp-worthy');

            const mapping_questions = [
                { label: "1. Resultado esperado", val: getVal('cp-actual') },
                { label: "2. Resultado do processo", val: getVal('cp-desired') },
                { label: "3. Fotografia", val: getVal('cp-picture') },
                { label: "4. Propósito Inabalável", val: getVal('cp-purpose') }
            ];

            const printArea = document.getElementById('print-area');
            if (!printArea) return;

            printArea.innerHTML = `
                <style>
                    @media print {
                        @page { size: A4; margin: 0; }
                        body { margin: 0; padding: 15mm; background: white !important; }
                    }
                    
                    /* Estrutura de repetição automática */
                    .report-table { width: 100%; border-collapse: collapse; }
                    .report-header-space { height: 160px; } /* Reserva espaço para o cabeçalho fixo */
                    
                    .header-fixed {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        background: white;
                    }

                    /* TÍTULO E BLOCOS AMARELOS */
                    .tool-title-area {
                        border-bottom: 4px solid #1a1a1a;
                        padding-bottom: 10px;
                        margin-bottom: 15px;
                    }
                    .title-report { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 800; text-transform: uppercase; margin: 0; }
                    .subtitle-report { font-weight: 700; color: #666; text-transform: uppercase; margin: 0; font-size: 10px; letter-spacing: 1px; }

                    .header-info { display: flex; gap: 10px; margin-bottom: 20px; }
                    .info-box { flex: 1; background: #ffde59 !important; border: 2px solid #000; padding: 8px 12px; -webkit-print-color-adjust: exact; }
                    .info-label { font-size: 8px; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; display: block; color: #000; }
                    .info-content { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #000; }

                    /* CONTEÚDO */
                    .avoid-break { break-inside: avoid; page-break-inside: avoid; margin-bottom: 20px; display: block; }

                    .capa-label { font-family: 'Space Grotesk', sans-serif; text-transform: uppercase; margin-bottom: 10px; font-weight: 800; border-left: 6px solid #1a1a1a; padding-left: 15px; font-size: 16px; }
                    .capa-box { border: 2px solid #1a1a1a; padding: 20px; font-size: 14px; white-space: pre-wrap; background: #fffde5 !important; line-height: 1.6; -webkit-print-color-adjust: exact; }

                    .page-break { page-break-before: always; }

                    .tech-title { font-family: 'Space Grotesk', sans-serif; text-transform: uppercase; font-size: 16px; border-bottom: 3px solid #ffde59; padding-bottom: 5px; margin-bottom: 20px; display: inline-block; }
                    .tech-label { font-family: 'Space Grotesk', sans-serif; text-transform: uppercase; font-size: 11px; margin-bottom: 6px; font-weight: 800; border-left: 4px solid #ffde59; padding-left: 10px; color: #444; }
                    .tech-box { border: 1px solid #ddd; padding: 12px; font-size: 12px; white-space: pre-wrap; background: #fafafa; margin-bottom: 15px; }

                    .metrics-container { border: 2px solid #1a1a1a; padding: 20px; margin-top: 10px; }
                    .metrics-grid { display: flex; justify-content: space-between; gap: 20px; }
                    .highlight { color: #000; font-size: 20px; font-weight: 800; border-bottom: 4px solid #ffde59; display: inline-block; }

                    .footer-print { text-align: center; font-size: 9px; color: #999; text-transform: uppercase; padding: 20px 0; }
                </style>

                <table class="report-table">
                    <thead>
                        <tr>
                            <td>
                                <div class="header-fixed-placeholder" style="height: 150px;">
                                    <div class="tool-title-area">
                                        <h1 class="title-report">Relatório de Sessão</h1>
                                        <p class="subtitle-report">Ferramenta: Clareza Plena</p>
                                    </div>
                                    <div class="header-info">
                                        <div class="info-box"><span class="info-label">Coachee</span><div class="info-content">${coachee}</div></div>
                                        <div class="info-box"><span class="info-label">Coach</span><div class="info-content">${coach}</div></div>
                                        <div class="info-box"><span class="info-label">Data</span><div class="info-content">${data}</div></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <div class="avoid-break">
                                    <h3 class="capa-label">Pequena Vitória (EPP)</h3>
                                    <div class="capa-box">${vitoria || '---'}</div>
                                </div>
                                <div class="avoid-break">
                                    <h3 class="capa-label">Por que valeu a pena?</h3>
                                    <div class="capa-box">${valeuPena || '---'}</div>
                                </div>

                                <div class="page-break"></div>

                                <h2 class="tech-title">Detalhamento Técnico</h2>
                                ${mapping_questions.map(q => `
                                    <div class="avoid-break">
                                        <h3 class="tech-label">${q.label}</h3>
                                        <div class="tech-box">${q.val || '---'}</div>
                                    </div>
                                `).join('')}

                                <div class="avoid-break">
                                    <div class="metrics-container">
                                        <h3 style="font-family: 'Space Grotesk', sans-serif; text-transform: uppercase; font-size: 11px; margin-bottom: 15px; font-weight: 800;">5. Autorresponsabilidade</h3>
                                        <div class="metrics-grid">
                                            <div style="flex: 2;">
                                                <span style="font-size: 9px; font-weight: 700; text-transform: uppercase; color: #666;">Responsável</span>
                                                <div style="font-weight: 700; font-size: 13px; border-bottom: 1px solid #ddd;">${getVal('cp-resp-who')}</div>
                                            </div>
                                            <div style="flex: 1; text-align: center;">
                                                <span style="font-size: 9px; font-weight: 700; text-transform: uppercase; color: #666;">Nível</span>
                                                <div class="highlight">${getVal('cp-resp-level')}%</div>
                                            </div>
                                            <div style="flex: 1; text-align: right;">
                                                <span style="font-size: 9px; font-weight: 700; text-transform: uppercase; color: #666;">Compromisso</span>
                                                <div class="highlight">${getRadio('commit')} / 5</div>
                                            </div>
                                        </div>
                                    </div>
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

// Compatibilidade: expõe também em window para código que ainda usa global
if (typeof window !== 'undefined') window.ClarezaTool = ClarezaTool;