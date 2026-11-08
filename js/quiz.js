// js/quiz.js

/* Pega o curso da URL */
const params = new URLSearchParams(window.location.search);
const cursoKey = params.get("curso") || "Front-End";
const tipo = params.get("tipo") || "quiz";

// Garante fallback caso a key não exista
const curso = todosCursos[cursoKey] || todosCursos["Front-End"];

let atual = 0;
let acertos = 0;
let respostaSelecionada = null;

/* Inicializa o título da página */
document.getElementById("quiz-titulo").textContent = curso.titulo;

function mostrarPergunta() {
    const q = curso.perguntas[atual];
    document.getElementById("quiz-progresso").textContent =
        `Pergunta ${atual + 1} de ${curso.perguntas.length}`;
    document.getElementById("quiz-pergunta").textContent =
        `${atual + 1}. ${q.pergunta}`;

    const opcoes = document.getElementById("quiz-opcoes");
    opcoes.innerHTML = "";
    respostaSelecionada = null;
    document.getElementById("btn-enviar").disabled = true;

    const letras = ["A", "B", "C", "D"];
    q.opcoes.forEach((opcao, i) => {
        const li = document.createElement("li");
        li.className = "quiz-opcao";
        li.innerHTML = `<span class="opcao-letra">${letras[i]})</span> ${opcao}`;
        li.onclick = () => selecionarOpcao(li, i);
        opcoes.appendChild(li);
    });
}

function selecionarOpcao(el, indice) {
    document.querySelectorAll(".quiz-opcao").forEach(op => {
        op.classList.remove("selecionada");
    });
    el.classList.add("selecionada");
    respostaSelecionada = indice;
    document.getElementById("btn-enviar").disabled = false;
}

function enviarResposta() {
    const q = curso.perguntas[atual];
    const opcoes = document.querySelectorAll(".quiz-opcao");

    opcoes.forEach((op, i) => {
        op.onclick = null;
        if (i === q.correta) op.classList.add("correta");
        else if (i === respostaSelecionada) op.classList.add("errada");
    });

    if (respostaSelecionada === q.correta) acertos++;

    document.getElementById("btn-enviar").disabled = true;

    setTimeout(() => {
        atual++;
        if (atual < curso.perguntas.length) {
            mostrarPergunta();
        } else {
            mostrarResultado();
        }
    }, 1200);
}

function mostrarResultado() {
    const passou = acertos >= 3;

    if (passou) {
        const progressoKey = `progresso-${cursoKey}`;
        const progressoAtual = parseInt(localStorage.getItem(progressoKey) || "2");
        localStorage.setItem(progressoKey, progressoAtual + 1);
    }

    document.querySelector(".quiz-main").innerHTML = `
        <section class="resultado-card card">
            <h1>${passou ? "🎉 Parabéns!" : "😅 Tente novamente!"}</h1>
            <p>Você acertou <strong>${acertos}</strong> de <strong>${curso.perguntas.length}</strong></p>
            <p>${passou ? "Quiz concluído! Próxima atividade desbloqueada." : "Você precisa acertar pelo menos 3 questões."}</p>
            <nav class="resultado-botoes">
                ${passou
                    ? `<a href="avaliacao.html?curso=${cursoKey}"><button class="btn-destaque">Ir para Avaliação Final →</button></a>`
                    : `<button class="btn-primario" onclick="location.reload()">Tentar novamente</button>`
                }
                <a href="curso.html?curso=${cursoKey}"><button class="btn-primario">Voltar ao Curso</button></a>
            </nav>
        </section>
    `;
}

// Inicia automaticamente o Quiz ao carregar o arquivo
mostrarPergunta();