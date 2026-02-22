/*-- ==========================================
SYSTEM: ABOUT KOTINI APP SKETCHBOOK (GT STYLE)
========================================== */

const CoachingAbout = {
    load: function () {
        const container = document.getElementById('view-about-coaching');
        if (!container) return;

        container.innerHTML = '';

        const html = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Indie+Flower&display=swap');

                .sketchbook-main {
                    background: #f4eee1;
                    min-height: 100vh;
                    font-family: 'Gochi Hand', cursive;
                    color: #2d2d2d;
                    overflow-x: hidden;
                    padding-bottom: 200px;
                }

                .notebook-paper {
                    max-width: 800px;
                    margin: 0 auto;
                    background: #fff;
                    background-image: linear-gradient(#e1e1e1 1px, transparent 1px);
                    background-size: 100% 30px;
                    padding: 80px 40px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                    min-height: 250vh;
                    border-left: 8px solid #dcdcdc;
                    position: relative;
                }

                .notebook-paper::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 60px;
                    bottom: 0; width: 2px;
                    background: #ffbcb5;
                }

                .sketch-section {
                    margin-bottom: 120px;
                    opacity: 0;
                    transform: translateY(60px);
                    transition: opacity 1s cubic-bezier(0.17, 0.67, 0.83, 0.67), 
                                transform 1.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
                    position: relative;
                    z-index: 1;
                    padding: 40px 0;
                }

                .sketch-section.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }

                /* --- MICROINTERACTION: DOODLE WOBBLE --- */
                @keyframes wobble {
                    0% { transform: rotate(0deg) scale(1); }
                    25% { transform: rotate(0.5deg) scale(1.005); }
                    50% { transform: rotate(-0.5deg) scale(0.995); }
                    75% { transform: rotate(0.3deg) scale(1.002); }
                    100% { transform: rotate(0deg) scale(1); }
                }

                .rough-svg {
                    filter: url(#roughness);
                    fill: none;
                    stroke: #1A1A1A;
                    stroke-width: 2.5;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    animation: wobble 0.6s infinite ease-in-out;
                }

                .doodle-title {
                    font-family: 'Indie Flower', cursive;
                    font-size: 3.5rem;
                    text-align: center;
                    margin-bottom: 40px;
                    background: #ffde59;
                    display: inline-block;
                    padding: 10px 30px;
                    transform: rotate(-2deg);
                    box-shadow: 5px 5px 0 #000;
                    border: 4px solid #000;
                }

                .sketch-bubble {
                    border: 3px solid #000;
                    padding: 30px;
                    border-radius: 40% 60% 70% 30% / 40% 40% 60% 60%;
                    margin: 30px 0;
                    background: #fff;
                    font-size: 1.8rem;
                    line-height: 1.4;
                    box-shadow: 8px 8px 0 rgba(0,0,0,0.05);
                }

                .sketch-illustration {
                    width: 180px;
                    height: 180px;
                    margin: 30px auto;
                    display: block;
                }

                .arrow-sketch {
                    cursor: pointer;
                    animation: bounce 2s infinite, wobble 0.8s infinite ease-in-out;
                    transition: transform 0.2s;
                    display: inline-block;
                    vertical-align: middle;
                    stroke-width: 15 !important;
                }

                .arrow-sketch:hover {
                    transform: scale(1.1);
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                    40% {transform: translateY(-20px);}
                    60% {transform: translateY(-10px);}
                }

                /* --- MICROINTERACTION: ANIMATED HIGHLIGHT --- */
                .hand-highlighter {
                    position: relative;
                    padding: 0 2px;
                    display: inline-block;
                    z-index: 1;
                }

                .hand-highlighter::before {
                    content: '';
                    position: absolute;
                    top: 55%; left: -4%;
                    width: 0%; /* Start at 0 */
                    height: 75%;
                    background: #ffec85;
                    z-index: -1;
                    transform: translateY(-50%) rotate(-1deg);
                    border-radius: 2px 8px 3px 10px;
                    filter: url(#roughness);
                    opacity: 0.7;
                    pointer-events: none;
                    transition: width 0.8s cubic-bezier(0.19, 1, 0.22, 1);
                    transition-delay: 0.6s; /* Wait for user to focus on text */
                }

                .sketch-section.visible .hand-highlighter.active::before {
                    width: 108%; /* Grow when text itself is visible enough */
                }

                /* --- MICROINTERACTION: REACTIVE STEPS --- */
                .staircase-container {
                    position: relative;
                    margin: 60px 0;
                    padding-left: 40px;
                }

                .stair-step {
                    background: #fff;
                    border: 3px solid #000;
                    padding: 20px;
                    width: 250px;
                    margin-bottom: -10px;
                    position: relative;
                    box-shadow: 6px 6px 0 rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    z-index: 5;
                }

                .stair-step:hover, .stair-step:active {
                    transform: translate(5px, 5px) rotate(0deg) !important;
                    box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
                    background: #fffdf0;
                }

                .step-side-note {
                    position: absolute;
                    left: 105%; top: 50%;
                    transform: translateY(-50%);
                    width: 220px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.4s;
                }

                .stair-step:hover .step-side-note,
                .stair-step:active .step-side-note {
                    opacity: 1;
                    left: 110%;
                }

                .side-arrow {
                    width: 40px; height: 40px;
                    flex-shrink: 0;
                }

                .side-text {
                    font-size: 1.1rem;
                    line-height: 1.2;
                    color: #555;
                    font-style: italic;
                    background: #ffec85;
                    padding: 8px;
                    border: 1px dashed #000;
                    box-shadow: 3px 3px 0 rgba(0,0,0,0.05);
                }
                .stair-step:nth-child(1) { margin-left: 0; transform: rotate(-1deg); }
                .stair-step:nth-child(2) { margin-left: 60px; transform: rotate(1deg); }
                .stair-step:nth-child(3) { margin-left: 120px; transform: rotate(-0.5deg); }
                .stair-step:nth-child(4) { margin-left: 180px; transform: rotate(1.5deg); }

                .stair-number {
                    font-family: 'Indie Flower', cursive;
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: #e63946;
                    display: block;
                    margin-bottom: 5px;
                }

                .stair-text h3 { font-size: 1.6rem; font-weight: black; text-transform: uppercase; margin-bottom: 5px; }
                .stair-text p { font-size: 1.2rem; line-height: 1.2; }

                .climb-arrow {
                    position: absolute;
                    left: -30px; top: 0;
                    height: 100%; width: 60px;
                    opacity: 0.3;
                    pointer-events: none;
                }

                /* --- MICROINTERACTION: ONOMATOPOEIA --- */
                .onomatopeia {
                    position: fixed;
                    pointer-events: none;
                    font-family: 'Indie Flower', cursive;
                    font-size: 2rem;
                    color: #ff3e00;
                    z-index: 9999;
                    animation: popOut 0.5s forwards;
                    font-weight: bold;
                }

                @keyframes popOut {
                    0% { transform: scale(0) rotate(-10deg); opacity: 0; }
                    50% { transform: scale(1.5) rotate(10deg); opacity: 1; }
                    100% { transform: scale(1.2) translateY(-50px) rotate(-5deg); opacity: 0; }
                }

                /* --- MICROINTERACTION: ANIMATED MAP PATH --- */
                @keyframes pathRun {
                    0% { stroke-dashoffset: 200; }
                    100% { stroke-dashoffset: 0; }
                }

                .map-trail {
                    stroke-dasharray: 6;
                    animation: pathRun 15s linear infinite;
                    animation-play-state: paused;
                    transition: stroke 0.3s;
                }

                .sketch-illustration .rough-svg {
                    animation-play-state: paused; /* Maps stay still by default */
                }

                .sketch-illustration:hover .map-trail,
                .sketch-illustration:active .map-trail,
                .sketch-illustration:hover .rough-svg,
                .sketch-illustration:active .rough-svg {
                    animation-play-state: running; /* Everything moves on interaction */
                    stroke: #e63946;
                }

                .state-box {
                    border: 4px solid #000;
                    padding: 15px 25px;
                    font-size: 1.8rem;
                    font-weight: black;
                    display: inline-block;
                    background: #fff;
                }

                .progress-line {
                    position: absolute;
                    top: 0; left: 40px;
                    width: 6px; height: 100%;
                    background: repeating-linear-gradient(to bottom, #000, #000 15px, transparent 15px, transparent 30px);
                    opacity: 0.1;
                    z-index: 0;
                }

                /* --- MICROINTERACTION: CONFETTI SKETCH --- */
                .confetti-sketch {
                    position: fixed;
                    z-index: 1000;
                    pointer-events: none;
                    font-size: 24px;
                    animation: fall 1.5s linear forwards;
                }

                @keyframes fall {
                    0% { transform: translateY(0) rotate(0); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
            </style>

            <svg width="0" height="0" style="position:fixed">
                <filter id="roughness">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
                </filter>
            </svg>

            <div class="sketchbook-main">
                <div class="notebook-paper">
                    <div class="progress-line"></div>

                    <!-- SLIDE 1: O CONCEITO -->
                    <div class="sketch-section">
                        <div style="text-align: center;">
                            <h1 class="doodle-title text-black">O que é Coaching?</h1>
                            <p class="text-3xl mt-6">Mas afinal, o que é o coaching e pra que serve?</p>
                            <div class="sketch-bubble" style="margin-top: 40px;">
                                "É tirar alguém do <span class="hand-highlighter">Estado Atual</span> e levá-lo ao <span class="hand-highlighter">Estado Desejado</span> no menor tempo possível."
                            </div>
                            <svg class="sketch-illustration rough-svg arrow-sketch" onclick="CoachingAbout.handleArrowClick(this)" viewBox="0 0 100 100" style="width: 60px; height: 60px; margin: 40px auto 0;">
                                <path d="M50,10 L50,90 M20,60 L50,90 L80,60" />
                            </svg>
                        </div>
                    </div>

                    <!-- SLIDE 2: ESTADO A -->
                    <div class="sketch-section">
                        <div style="text-align: center;">
                            <div class="state-box" style="border-color: #e63946;">ESTADO A</div>
                            <h2 class="text-4xl mt-6 font-black uppercase">O início da jornada</h2>
                            <svg class="sketch-illustration" viewBox="0 0 180 120" style="width: 450px; height: 300px;">
                                <path class="rough-svg" d="M18,12 L72,18 L108,12 L162,24 L153,96 L90,102 L27,96 Z" fill="#fffef0" />
                                <circle cx="54" cy="60" r="4" fill="#000" />
                                <text x="45" y="52" font-family="Gochi Hand" font-size="12" fill="#000" font-weight="bold">VOCÊ</text>
                                <path class="rough-svg map-trail" d="M54,60 Q81,36 108,66 T162,48" stroke-dasharray="4" />
                            </svg>
                            <p class="text-2xl mt-4 italic">É onde você está hoje. Um lugar conhecido, mas talvez limitado pela rotina e pelo <span class="hand-highlighter">piloto automático</span>.</p>
                            <svg class="sketch-illustration rough-svg arrow-sketch" onclick="CoachingAbout.handleArrowClick(this)" viewBox="0 0 100 100" style="width: 60px; height: 60px; margin: 40px auto 0;">
                                <path d="M50,10 L50,90 M20,60 L50,90 L80,60" />
                            </svg>
                        </div>
                    </div>

                    <!-- SLIDE 3: ESTADO B -->
                    <div class="sketch-section">
                        <div style="text-align: center;">
                            <div class="state-box" style="border-color: #2ecc71; transform: rotate(3deg);">ESTADO B</div>
                            <h2 class="text-4xl mt-6 font-black uppercase">O destino final</h2>
                            <svg class="sketch-illustration" viewBox="0 0 180 120" style="width: 450px; height: 300px;">
                                <!-- Map Part 2 -->
                                <path class="rough-svg" d="M18,24 L72,12 L108,18 L162,12 L171,102 L99,96 L27,102 Z" fill="#fffef0" />
                                <path class="rough-svg map-trail" d="M18,48 Q54,72 90,36 T153,60" stroke-dasharray="4" />
                                <!-- X Marker centered at 153, 60 -->
                                <path class="rough-svg" d="M144,51 L162,69 M144,69 L162,51" stroke="#e63946" stroke-width="5" />
                                <text x="153" y="42" font-family="Gochi Hand" font-size="12" fill="#000" font-weight="bold" text-anchor="middle">Goal</text>
                            </svg>
                            <p class="text-2xl mt-4">É a sua <span class="hand-highlighter">visão de futuro</span>. Onde seus valores estão alinhados e seus grandes objetivos foram atingidos.</p>
                            <svg class="sketch-illustration rough-svg arrow-sketch" onclick="CoachingAbout.handleArrowClick(this)" viewBox="0 0 100 100" style="width: 60px; height: 60px; margin: 40px auto 0;">
                                <path d="M50,10 L50,90 M20,60 L50,90 L80,60" />
                            </svg>
                        </div>
                    </div>

                    <!-- SLIDE 4: A PONTE -->
                    <div class="sketch-section">
                        <h2 class="text-4xl mb-10 font-black underline decoration-wavy decoration-[#ffde59] text-center uppercase">Ponte da Transformação</h2>
                        
                        <div class="staircase-container">
                            <svg class="climb-arrow rough-svg" viewBox="0 0 100 500">
                                <path d="M20,480 L20,20 M20,20 L10,35 M20,20 L30,35" stroke-width="4" />
                            </svg>

                            <div class="stair-step" onclick="CoachingAbout.handleStepClick(this)">
                                <div class="stair-text">
                                    <span class="stair-number">1. Clareza</span>
                                    <h3>Onde chegar?</h3>
                                </div>
                                <div class="step-side-note">
                                    <svg class="side-arrow rough-svg" viewBox="0 0 100 100">
                                        <path d="M10,50 L90,50 M60,20 L90,50 L60,80" stroke-width="6"/>
                                    </svg>
                                    <div class="side-text">Sair da névoa. Definir metas e entender seus valores.</div>
                                </div>
                            </div>

                            <div class="stair-step" onclick="CoachingAbout.handleStepClick(this)">
                                <div class="stair-text">
                                    <span class="stair-number">2. Planejamento</span>
                                    <h3>Como chegar?</h3>
                                </div>
                                <div class="step-side-note">
                                    <svg class="side-arrow rough-svg" viewBox="0 0 100 100">
                                        <path d="M10,50 L90,50 M60,20 L90,50 L60,80" stroke-width="6"/>
                                    </svg>
                                    <div class="side-text">Criar o mapa. Dividir o objetivo em marcos menores.</div>
                                </div>
                            </div>

                            <div class="stair-step" onclick="CoachingAbout.handleStepClick(this)">
                                <div class="stair-text">
                                    <span class="stair-number">3. Ação</span>
                                    <h3>20 metros/dia</h3>
                                </div>
                                <div class="step-side-note">
                                    <svg class="side-arrow rough-svg" viewBox="0 0 100 100">
                                        <path d="M10,50 L90,50 M60,20 L90,50 L60,80" stroke-width="6"/>
                                    </svg>
                                    <div class="side-text">Movimento constante. Sair da teoria para a execução.</div>
                                </div>
                            </div>

                            <div class="stair-step" onclick="CoachingAbout.handleStepClick(this)">
                                <div class="stair-text">
                                    <span class="stair-number">4. Melhoria</span>
                                    <h3>Ajustar as velas</h3>
                                </div>
                                <div class="step-side-note">
                                    <svg class="side-arrow rough-svg" viewBox="0 0 100 100">
                                        <path d="M10,50 L90,50 M60,20 L90,50 L60,80" stroke-width="6"/>
                                    </svg>
                                    <div class="side-text">Feedback constante. Analisar e otimizar a performance.</div>
                                </div>
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 40px;">
                            <svg class="sketch-illustration rough-svg arrow-sketch" onclick="CoachingAbout.handleArrowClick(this)" viewBox="0 0 100 100" style="width: 60px; height: 60px;">
                                <path d="M50,10 L50,90 M20,60 L50,90 L80,60" />
                            </svg>
                        </div>
                    </div>

                    <!-- SLIDE 5: CONCLUSÃO -->
                    <div class="sketch-section" style="text-align: center;">
                        <h2 class="text-5xl font-black mb-10 uppercase transform rotate-1">Bora assumir o controle?</h2>
                        <svg class="sketch-illustration rough-svg" viewBox="0 0 100 100" style="width: 220px;">
                            <path d="M10,90 Q50,10 90,90" />
                            <path d="M30,60 L50,40 L70,60" />
                            <path d="M50,40 L50,70" />
                        </svg>
                        <p class="text-2xl mb-10">"O sucesso acontece para quem decide, não para quem espera."</p>
                        <button onclick="CoachingAbout.handleFinalAction()" class="bg-[#ffde59] border-6 border-black px-12 py-6 text-3xl font-black shadow-[15px_15px_0_#000] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all uppercase">
                           Assumir o Controle
                        </button>
                    </div>

                </div>
            </div>
        `;

        container.innerHTML = html;
        this.initAnimations();
    },

    scrollToNext: function (element) {
        const currentSection = element.closest('.sketch-section');
        if (!currentSection) return;

        document.querySelectorAll('.stair-step').forEach((s, i) => {
            const offsets = [0, 60, 120, 180];
            const rotations = [-1, 1, -0.5, 1.5];
            s.style.marginLeft = offsets[i] + 'px';
            s.style.transform = `rotate(${rotations[i]}deg)`;
        });

        const sections = Array.from(document.querySelectorAll('.sketch-section'));
        const currentIndex = sections.indexOf(currentSection);

        const nextSection = sections[currentIndex + 1];
        if (nextSection) {
            const offset = 100;
            const elementPosition = nextSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    handleArrowClick: function (element) {
        const rect = element.getBoundingClientRect();
        // Position slightly to the right/top of the arrow
        this.spawnOnomatopoeia(rect.right + 10, rect.top, ["Vrau!", "Scroll!", "Bora!", "Fui!"]);
        setTimeout(() => this.scrollToNext(element), 300);
    },

    handleStepClick: function (element) {
        const rect = element.getBoundingClientRect();
        this.spawnOnomatopoeia(rect.right - 20, rect.top, ["Check!", "Piso!", "Firme!", "Subiu!"]);
    },

    handleFinalAction: function () {
        this.spawnConfetti();
        const rect = event.target.getBoundingClientRect();
        this.spawnOnomatopoeia(rect.left + rect.width / 2, rect.top, ["SOU FODA!", "VAI!", "UHU!", "GO!"]);
        setTimeout(() => Navigation.view('home'), 1500);
    },

    spawnOnomatopoeia: function (x, y, options) {
        const text = options[Math.floor(Math.random() * options.length)];
        const div = document.createElement('div');
        div.className = 'onomatopeia';
        div.textContent = text;
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 800);
    },

    spawnConfetti: function () {
        const colors = ["#ffde59", "#ff3e00", "#1A1A1A", "#e63946"];
        const glyphs = ["~", "}", "{", "/", "\\", "|", "*", "•"];
        for (let i = 0; i < 50; i++) {
            const span = document.createElement('span');
            span.className = 'confetti-sketch';
            span.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
            span.style.left = Math.random() * 100 + 'vw';
            span.style.top = '-20px';
            span.style.color = colors[Math.floor(Math.random() * colors.length)];
            span.style.animationDelay = Math.random() * 0.5 + 's';
            span.style.fontSize = (Math.random() * 20 + 20) + 'px';
            document.body.appendChild(span);
            setTimeout(() => span.remove(), 2000);
        }
    },

    initAnimations: function () {
        // Observer for sections (entry animation)
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: "-20px 0px"
        });

        // Observer for individual highlighters (triggering when word is visible)
        const highlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, {
            threshold: 0.8, // Trigger only when almost fully visible
            rootMargin: "-20% 0px -20% 0px"
        });

        document.querySelectorAll('.sketch-section').forEach(s => sectionObserver.observe(s));
        document.querySelectorAll('.hand-highlighter').forEach(h => highlightObserver.observe(h));
    }
};

if (typeof window !== 'undefined') window.CoachingAbout = CoachingAbout;
