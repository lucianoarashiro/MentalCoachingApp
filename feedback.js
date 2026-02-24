/* ==========================================
   FEEDBACK & ENGAGEMENT TOOL
   ========================================== */

const FeedbackTool = {
    init: function () {
        this.injectFAB();
        this.listenForPrint();
        console.log('FeedbackTool initialized');
    },

    injectFAB: function () {
        if (document.getElementById('feedback-fab')) return;

        const fab = document.createElement('button');
        fab.id = 'feedback-fab';
        fab.className = 'no-print';
        fab.innerHTML = '<i class="fas fa-comment-dots"></i>';
        fab.title = 'Enviar Feedback';
        fab.onclick = () => this.showFeedbackModal();

        document.body.appendChild(fab);
    },

    showFeedbackModal: function () {
        this.createModal({
            title: 'Sua opinião é fundamental',
            maxWidth: 'max-w-2xl',
            content: `
                <div class="mb-4">
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfBwESvBTldS1dgsflts--qiPMMm1Oa0m8-dwgmk7hwdycdGg/viewform?embedded=true" 
                        width="100%" height="500" frameborder="0" marginheight="0" marginwidth="0" class="border-2 border-black shadow-[4px_4px_0px_0px_black]">
                        Carregando…
                    </iframe>
                </div>
                <div class="text-right">
                    <button onclick="FeedbackTool.closeModal()" class="py-2 px-4 font-black uppercase text-[10px] text-gray-500 hover:text-black transition-all">
                        Fechar Formulário
                    </button>
                </div>
            `
        });
    },

    showContributionReminder: function () {
        this.createModal({
            title: 'Relatório Gerado! 🚀',
            content: `
                <p class="mb-6 font-medium text-gray-700">
                    Se este relatório e o Kotini App são úteis para o seu trabalho, 
                    considere apoiar o projeto para continuarmos evoluindo com novas ferramentas.
                </p>
                <div class="space-y-4">
                    <button onclick="Navigation.view('apoio'); FeedbackTool.closeModal();" class="btn-main w-full text-xs">
                        <i class="fas fa-heart text-red-500"></i> Apoiar Projeto
                    </button>
                    <button onclick="FeedbackTool.closeModal()" class="w-full py-3 font-black uppercase text-[10px] text-gray-400 hover:text-black transition-all">
                        Agora não, obrigado
                    </button>
                </div>
            `
        });
    },

    createModal: function ({ title, content, maxWidth = 'max-w-md' }) {
        this.closeModal(); // Remove existing

        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'feedback-modal-overlay';
        modalOverlay.className = 'no-print';
        modalOverlay.onclick = (e) => { if (e.target === modalOverlay) this.closeModal(); };

        modalOverlay.innerHTML = `
            <div class="feedback-modal-content bc-card p-6 md:p-8 ${maxWidth} w-full mx-4 animate-in zoom-in duration-300">
                <div class="flex justify-between items-start mb-6">
                    <h3 class="text-2xl font-black uppercase leading-tight">${title}</h3>
                    <button onclick="FeedbackTool.closeModal()" class="text-xl hover:scale-110 transition-transform">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                ${content}
            </div>
        `;

        document.body.appendChild(modalOverlay);
    },

    closeModal: function () {
        const modal = document.getElementById('feedback-modal-overlay');
        if (modal) modal.remove();
    },

    listenForPrint: function () {
        window.onafterprint = () => {
            // Pequeno delay para o navegador fechar a janela de print antes de abrir o modal
            setTimeout(() => {
                this.showContributionReminder();
            }, 1000);
        };
    }
};

if (typeof window !== 'undefined') window.FeedbackTool = FeedbackTool;
