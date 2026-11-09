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

/* BOTÃO DE INÍCIO (casinha)
   Coloca a casinha no começo da barra de cima de todas as telas.
   Na tela inicial (index.html) ela não aparece, porque já é a própria tela inicial. */
(function botaoInicio() {
    const SVG_CASA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>';

    function montar() {
        const pagina = window.location.pathname.split("/").pop();
        if (pagina === "" || pagina === "index.html") return;
        if (document.querySelector(".btn-inicio")) return;

        /* algumas telas têm os botões direto na nav, sem o bloco .topo-botoes:
           junta esses botões num grupo, para a casinha ficar ao lado deles */
        let areas = document.querySelectorAll(".topo-botoes");
        if (areas.length === 0) {
            areas = [];
            document.querySelectorAll(".topo-nav").forEach((nav) => {
                const grupo = document.createElement("div");
                grupo.className = "topo-botoes";
                grupo.style.cssText = "display:flex;align-items:center;gap:0.5rem;";
                Array.from(nav.children)
                    .filter((el) => !el.classList.contains("logo"))
                    .forEach((el) => grupo.appendChild(el));
                if (grupo.children.length > 0) {
                    nav.appendChild(grupo);
                    areas.push(grupo);
                }
            });
        }

        areas.forEach((area) => {
            const link = document.createElement("a");
            link.href = "index.html";
            link.className = "btn-inicio";
            link.title = "Início";
            link.setAttribute("aria-label", "Voltar ao início");
            link.innerHTML = SVG_CASA;

            const primeiroBotao = area.querySelector(".btn-voltar-pagina, .btn-vidro, .btn-sair-pagina, .btn-cta");
            if (primeiroBotao) area.insertBefore(link, primeiroBotao);
            else area.appendChild(link);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", montar);
    } else {
        montar();
    }
})();