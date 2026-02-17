/*-- ==========================================
TOOL: CLAREZA PLENA (Repetição Automática de Cabeçalho)
========================================== */

const ClarezaTool = {
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
                    @page { size: A4; margin: 5mm; }
                    body { margin: 0; padding: 0; background: white !important; }
                    
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
                                    Master Performance System - Gerado em ${new Date().toLocaleDateString('pt-BR')}
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