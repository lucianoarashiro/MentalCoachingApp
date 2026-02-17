const SWOTTool = {
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