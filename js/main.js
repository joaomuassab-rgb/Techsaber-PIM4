// MAIN JS - TechSaber+
// Quiz demonstrativo da landing page

function abrirQuiz() {

    const perguntas = [
        {
            pergunta: "Qual tag é usada para inserir uma imagem?",
            opcoes: ["<img>", "<photo>", "<picture>"],
            correta: 0
        },
        {
            pergunta: "Qual tag é usada para criar um parágrafo?",
            opcoes: ["<text>", "<p>", "<div>"],
            correta: 1
        },
        {
            pergunta: "Qual propriedade muda o tamanho da fonte?",
            opcoes: ["font-size", "text-size", "font-style"],
            correta: 0
        }
    ];

    let atual = 0;
    let acertos = 0;

    const modal = document.createElement("div");
    modal.id = "quiz-modal";
    modal.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    const caixa = document.createElement("div");
    caixa.style.cssText = `
        background: #2d1052;
        border: 1px solid #6b21a8;
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        color: white;
        font-family: 'Poppins', sans-serif;
    `;

    modal.appendChild(caixa);
    document.body.appendChild(modal);

    function mostrarPergunta() {

        if (atual === perguntas.length) {
            caixa.innerHTML = `
                <h2 style="color:#ec4899; margin-bottom:1rem;">Resultado!</h2>
                <p style="font-size:1.5rem; margin-bottom:1rem;">
                    Você acertou <strong>${acertos}</strong> de <strong>${perguntas.length}</strong>
                </p>
                <button onclick="document.getElementById('quiz-modal').remove()"
                    style="background:#6b21a8; color:white; border:none; padding:0.8rem 2rem;
                    border-radius:8px; cursor:pointer; font-family:'Poppins',sans-serif; font-size:1rem;">
                    Fechar
                </button>
            `;
            return;
        }

        const q = perguntas[atual];

        // limpa e monta a pergunta
        caixa.innerHTML = `
            <p style="color:#d8b4fe; margin-bottom:0.5rem;">
                Pergunta ${atual + 1} de ${perguntas.length}
            </p>
            <h3 style="margin-bottom:1.5rem; font-size:1.1rem;">${q.pergunta}</h3>
            <div id="opcoes" style="display:flex; flex-direction:column; gap:0.8rem;">
            </div>
        `;

        // cria os botões das opções separadamente para evitar problema com HTML especial
        const divOpcoes = caixa.querySelector("#opcoes");
        q.opcoes.forEach((opcao, i) => {
            const btn = document.createElement("button");
            btn.textContent = opcao; // textContent resolve o problema dos símbolos < >
            btn.style.cssText = `
                background: #1a0a2e;
                color: white;
                border: 1px solid #6b21a8;
                padding: 0.8rem;
                border-radius: 8px;
                cursor: pointer;
                font-family: 'Poppins', sans-serif;
                font-size: 1rem;
            `;
            btn.onclick = () => responder(i);
            divOpcoes.appendChild(btn);
        });
    }

    window.responder = function(indice) {
        const q = perguntas[atual];
        const botoes = document.querySelectorAll("#opcoes button");

        botoes.forEach((btn, i) => {
            btn.style.pointerEvents = "none";
            if (i === q.correta) btn.style.background = "#10b981";
            else if (i === indice) btn.style.background = "#ef4444";
        });

        if (indice === q.correta) acertos++;

        setTimeout(() => {
            atual++;
            mostrarPergunta();
        }, 1000);
    };

    mostrarPergunta();
}