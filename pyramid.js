const PyramidTool = {
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

document.addEventListener('DOMContentLoaded', PyramidTool.init);