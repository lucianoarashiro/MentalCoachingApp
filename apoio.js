/* ==========================================
   APOIO TOOL - GERENCIAMENTO DE DOAÇÕES
   ========================================== */

const ApoioTool = {
    load: function () {
        const container = document.getElementById('view-apoio');
        if (!container) return;

        // Chave PIX Placeholder - Usuário deve substituir ou informar
        const pixKey = "kotiniapp@gmail.com"; // Usando o e-mail do caminho do arquivo como placeholder provável

        const html = `
            <div class="max-w-3xl mx-auto">
                <!-- Header Estilo Mural -->
                <div class="text-center mb-12">
                    <span class="text-[12px] font-black uppercase bg-black text-white px-3 py-1 mb-4 inline-block shadow-[4px_4px_0px_0px_black] border-2 border-black">
                        Comunidade
                    </span>
                    <h2 class="text-5xl font-black uppercase leading-tight mb-4">
                        Apoie este <mark class="bg-[#ffde59] px-2 italic">Projeto</mark>
                    </h2>
                    <p class="text-xl font-bold text-gray-700 leading-relaxed">
                        Este aplicativo foi criado para ajudar coaches a transformarem vidas. 
                        Sua ajuda garante que ele continue evoluindo e acessível para todos.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <!-- Card de Meta -->
                    <div class="bc-card p-8 bg-white relative overflow-hidden">
                        <div class="absolute top-2 right-2 opacity-10">
                            <i class="fas fa-globe text-6xl"></i>
                        </div>
                        <h3 class="text-2xl font-black uppercase mb-4">Meta: Domínio Próprio</h3>
                        <p class="text-gray-600 mb-6 font-medium">
                            Queremos migrar para o domínio <span class="font-bold text-black px-1 border-b-2 border-[#ffde59]">kotini.app</span>. 
                            O custo anual é de aproximadamente <span class="font-black text-black">R$ 300,00</span>.
                        </p>
                        
                        <!-- Progress Bar Estilo Neo-Brutalista -->
                        <div class="w-full h-8 border-4 border-black bg-gray-100 mb-2 relative">
                            <div id="support-progress" class="h-full bg-[#ffde59] border-r-4 border-black flex items-center justify-end px-2 font-black text-xs" style="width: 15%">
                                15%
                            </div>
                        </div>
                        <p class="text-[10px] font-black uppercase text-gray-400">Arrecadado até agora: R$ 45,00</p>
                    </div>

                    <!-- Card de Doação -->
                    <div class="bc-card p-8 bg-[#1a1a1a] text-white">
                        <h3 class="text-2xl font-black uppercase mb-4 text-[#ffde59]">Doe via PIX</h3>
                        <p class="text-gray-400 mb-6 text-sm">
                            Escaneie o QR Code ou copie a chave abaixo para enviar qualquer valor. Cada centavo ajuda!
                        </p>
                        
                        <div class="bg-white p-2 w-32 h-32 mx-auto mb-6 border-4 border-[#ffde59]">
                             <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pixKey}" alt="QR Code PIX" class="w-full h-full grayscale">
                        </div>

                        <div class="relative group">
                            <input type="text" value="${pixKey}" readonly 
                                class="w-full bg-black border-2 border-gray-700 text-[#ffde59] font-mono text-center py-3 px-4 text-sm outline-none focus:border-[#ffde59] transition-all">
                            <button onclick="ApoioTool.copyPix()" 
                                class="mt-4 w-full bg-[#ffde59] text-black font-black py-3 uppercase text-xs hover:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                                Copiar Chave PIX
                            </button>
                            <span id="copy-feedback" class="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] px-2 py-1 font-black uppercase hidden">
                                Copiado com sucesso!
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Lista de Benefícios -->
                <div class="bc-card p-8 bg-[#f4eee1] font-medium border-dashed">
                    <h3 class="text-xl font-black uppercase mb-6 flex items-center gap-2">
                        <i class="fas fa-heart text-black"></i> Por que apoiar?
                    </h3>
                    <ul class="space-y-4">
                        <li class="flex items-start gap-3">
                            <div class="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">1</div>
                            <p>Manutenção e hospedagem do servidor em alta velocidade.</p>
                        </li>
                        <li class="flex items-start gap-3">
                            <div class="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">2</div>
                            <p>Novas ferramentas sugeridas pela nossa comunidade de coaches.</p>
                        </li>
                        <li class="flex items-start gap-3">
                            <div class="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">3</div>
                            <p>Mantemos o projeto livre de anúncios e interrupções.</p>
                        </li>
                    </ul>
                </div>
                
                <p class="text-center mt-8 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    Obrigado por fazer parte desta jornada!
                </p>
            </div>
        `;

        container.innerHTML = html;
    },

    copyPix: function () {
        const input = document.querySelector('#view-apoio input');
        input.select();
        document.execCommand('copy');

        const feedback = document.getElementById('copy-feedback');
        feedback.classList.remove('hidden');
        setTimeout(() => feedback.classList.add('hidden'), 2000);
    }
};

if (typeof window !== 'undefined') window.ApoioTool = ApoioTool;
