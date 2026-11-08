/* assistente.js - Plus AI, o assistente da TechSaber+
   Responde só com respostas prontas, sem chamar a IA. */
(function () {

    const PERGUNTAS_SUGERIDAS = [
        "O que é a TechSaber+?",
        "Como funciona a trilha de um curso?",
        "Como ganho dias de ofensiva?",
        "Como funcionam os quizzes?"
    ];

    /* Perguntas que ainda não foram clicadas. Cada resposta remove a pergunta da lista. */
    let pendentes = [...PERGUNTAS_SUGERIDAS];

    /* Respostas prontas. As palavras-chave são comparadas sem acento e sem maiúsculas. */
    const RESPOSTAS = [
        {
            palavras: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "tudo bem", "e ai"],
            resposta: "Oi! Tudo bem por aqui. Posso te ajudar com a plataforma: cadastro, login, biblioteca, trilhas, quizzes, avaliação, ofensiva e perfil. Escolha uma pergunta ou escreva a sua."
        },
        {
            palavras: ["o que e a techsaber", "o que e a plataforma", "o que e o techsaber", "sobre a plataforma", "o que somos"],
            resposta: "A TechSaber+ é uma plataforma de estudos gamificada de tecnologia. " +
                "Você aprende Front-End, Back-End, Banco de Dados, Engenharia de Software, " +
                "Soft Skills, Libras e Inteligência Artificial, avançando por artigos, quizzes e avaliações. " +
                "Conforme estuda, você ganha conquistas, sobe de etapa e mantém sua sequência diária."
        },
        {
            palavras: ["trilha", "trilhas"],
            resposta: "Cada curso tem uma trilha com 5 etapas, feitas em ordem:\n" +
                "1. Artigo 1\n2. Artigo 2\n3. Quiz 1\n4. Quiz 2\n5. Avaliação final\n" +
                "Cada etapa libera a próxima. A etapa em andamento aparece com o botão Iniciar. " +
                "Quando você conclui todas, o módulo fica marcado como concluído."
        },
        {
            palavras: ["ofensiva", "dias seguidos", "sequencia"],
            resposta: "A ofensiva é a sua sequência de dias seguidos estudando na plataforma. " +
                "Para mantê-la, estude todos os dias, mesmo que seja pouco. " +
                "Você acompanha sua sequência no painel e no seu perfil."
        },
        {
            palavras: ["quiz", "quizzes"],
            resposta: "Cada quiz tem 5 perguntas de múltipla escolha. Escolha uma alternativa e clique em Enviar. " +
                "Você vê na hora se acertou: a correta fica verde e a sua resposta, se estiver errada, fica vermelha. " +
                "Para passar no quiz, é preciso acertar pelo menos 3 das 5 perguntas."
        },
        {
            palavras: ["avaliacao", "avaliacoes", "prova"],
            resposta: "A avaliação final fica no fim da trilha de cada curso. São 10 questões, " +
                "e você precisa acertar pelo menos 7 para concluir o módulo. " +
                "Durante a avaliação, o Plus AI não está disponível."
        },
        {
            palavras: ["cadastro", "cadastrar", "criar conta"],
            resposta: "Para criar sua conta, clique em Cadastrar no topo da página, preencha nome, e-mail e senha e confirme. " +
                "A conta criada é de aluno."
        },
        {
            palavras: ["login", "entrar", "senha"],
            resposta: "Para entrar, clique em Entrar no topo, escolha seu perfil (aluno, professor ou administrador) " +
                "e digite seu e-mail e senha. Use o olhinho ao lado do campo para ver a senha."
        },
        {
            palavras: ["biblioteca", "categorias", "cursos"],
            resposta: "Na Biblioteca de Cursos você escolhe uma categoria: Front End, Back End, Banco de Dados, " +
                "Engenharia de Software, Soft Skills, Libras ou Inteligência Artificial. " +
                "Passe o mouse sobre a categoria para ver o nome completo e clique para abrir o curso."
        },
        {
            palavras: ["perfil", "conquistas"],
            resposta: "No seu perfil você vê seus dias consecutivos, quantos cursos iniciou e quantas etapas já concluiu."
        }
    ];

    const RESPOSTA_PADRAO =
        "Ainda não consigo responder essa pergunta. Tente uma das sugestões abaixo " +
        "ou pergunte sobre cadastro, login, biblioteca, trilhas, quizzes, avaliação, ofensiva ou perfil.";

    function normalizar(texto) {
        return " " + texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9 ]/g, " ")
            .replace(/\s+/g, " ")
            .trim() + " ";
    }

    function buscarResposta(texto) {
        const t = normalizar(texto);
        const achado = RESPOSTAS.find(item =>
            item.palavras.some(p => t.includes(" " + p + " "))
        );
        return achado ? achado.resposta : RESPOSTA_PADRAO;
    }

    const css = `
    .ts-ai-btn{position:fixed;right:1.5rem;bottom:1.5rem;z-index:9999;width:60px;height:60px;border-radius:50%;border:none;display:grid;place-items:center;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;font:300 2.1rem/1 'Space Grotesk',sans-serif;cursor:pointer;box-shadow:0 14px 34px rgba(37,99,235,.4);transition:transform .25s ease}
    .ts-ai-btn:hover{transform:scale(1.08)}
    .ts-ai-btn:focus-visible{outline:3px solid #22d3ee;outline-offset:4px}
    .ts-ai-btn::after{content:attr(data-tip);position:absolute;right:72px;top:50%;transform:translateY(-50%);white-space:nowrap;background:#0f172a;color:#fff;font:600 .8rem 'Poppins',sans-serif;padding:.4rem .75rem;border-radius:10px;opacity:0;pointer-events:none;transition:opacity .2s}
    .ts-ai-btn:hover::after{opacity:1}
    .ts-ai-painel{position:fixed;right:1.5rem;bottom:6.5rem;z-index:9999;width:min(380px,calc(100vw - 2rem));height:min(520px,70vh);display:none;flex-direction:column;border-radius:22px;overflow:hidden;background:rgba(255,255,255,.97);border:1px solid rgba(255,255,255,.95);box-shadow:0 30px 80px rgba(15,23,42,.25);font-family:'Poppins',sans-serif;color:#0f172a}
    .ts-ai-painel.aberto{display:flex;animation:tsEntra .35s cubic-bezier(.2,.7,.2,1) both}
    @keyframes tsEntra{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}
    .ts-ai-topo{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.1rem;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff}
    .ts-ai-topo strong{font-family:'Space Grotesk',sans-serif;font-size:1rem}
    .ts-ai-fechar{background:transparent;border:none;color:#fff;font-size:1.5rem;cursor:pointer;line-height:1}
    .ts-ai-msgs{flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.6rem;background:#f8fafc}
    .ts-ai-msg{max-width:85%;padding:.6rem .85rem;border-radius:14px;font-size:.9rem;line-height:1.5;white-space:pre-wrap;word-break:break-word}
    .ts-ai-msg--user{align-self:flex-end;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;border-bottom-right-radius:4px}
    .ts-ai-msg--bot{align-self:flex-start;background:#fff;border:1px solid #e2e8f0;border-bottom-left-radius:4px}
    .ts-ai-chips{display:flex;flex-wrap:wrap;gap:.5rem;padding:.25rem 0}
    .ts-ai-chip{padding:.5rem .8rem;border-radius:999px;border:1px solid rgba(37,99,235,.3);background:#fff;color:#2563eb;font:600 .8rem 'Poppins',sans-serif;cursor:pointer;transition:background .2s,color .2s}
    .ts-ai-chip:hover{background:#2563eb;color:#fff}
    .ts-ai-form{display:flex;gap:.5rem;padding:.8rem;border-top:1px solid #e2e8f0;background:#fff}
    .ts-ai-form input{flex:1;padding:.7rem .9rem;border:1px solid rgba(37,99,235,.25);border-radius:12px;font:inherit;font-size:.9rem;outline:none}
    .ts-ai-form input:focus{border-color:#2563eb;box-shadow:0 0 0 4px rgba(37,99,235,.15)}
    .ts-ai-form button{padding:.7rem 1rem;border:none;border-radius:12px;background:#2563eb;color:#fff;font-weight:700;cursor:pointer}
    @media (prefers-reduced-motion: reduce){.ts-ai-painel.aberto{animation:none}.ts-ai-btn{transition:none}}
    `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const btn = document.createElement("button");
    btn.className = "ts-ai-btn";
    btn.setAttribute("aria-label", "Abrir Plus AI");
    btn.setAttribute("data-tip", "Plus AI");
    btn.textContent = "+";

    const painel = document.createElement("section");
    painel.className = "ts-ai-painel";
    painel.setAttribute("aria-label", "Plus AI");
    painel.innerHTML = `
        <header class="ts-ai-topo">
            <strong>Plus AI</strong>
            <button class="ts-ai-fechar" aria-label="Fechar">×</button>
        </header>
        <div class="ts-ai-msgs" aria-live="polite"></div>
        <form class="ts-ai-form">
            <input type="text" placeholder="Pergunte algo sobre a plataforma..." maxlength="200" autocomplete="off">
            <button type="submit">Enviar</button>
        </form>`;

    document.body.append(btn, painel);

    const msgs  = painel.querySelector(".ts-ai-msgs");
    const form  = painel.querySelector(".ts-ai-form");
    const input = painel.querySelector("input");

    function adicionar(texto, quem) {
        const bolha = document.createElement("div");
        bolha.className = "ts-ai-msg ts-ai-msg--" + quem;
        bolha.textContent = texto;
        msgs.appendChild(bolha);
        msgs.scrollTop = msgs.scrollHeight;
    }

    /* Mostra só as perguntas que ainda não foram clicadas */
    function mostrarSugestoes() {
        removerSugestoes();
        if (pendentes.length === 0) return;

        const caixa = document.createElement("div");
        caixa.className = "ts-ai-chips";
        pendentes.forEach(texto => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "ts-ai-chip";
            chip.textContent = texto;
            chip.addEventListener("click", () => enviarPergunta(texto));
            caixa.appendChild(chip);
        });
        msgs.appendChild(caixa);
        msgs.scrollTop = msgs.scrollHeight;
    }

    function removerSugestoes() {
        const caixa = msgs.querySelector(".ts-ai-chips");
        if (caixa) caixa.remove();
    }

    function enviarPergunta(pergunta) {
        if (!pergunta) return;

        /* Se a pergunta for uma das sugeridas, ela sai da lista */
        pendentes = pendentes.filter(p => p !== pergunta);

        removerSugestoes();
        adicionar(pergunta, "user");
        input.value = "";
        adicionar(buscarResposta(pergunta), "bot");
        mostrarSugestoes();
        input.focus();
    }

    btn.addEventListener("click", () => {
        painel.classList.toggle("aberto");
        if (painel.classList.contains("aberto")) {
            input.focus();
            if (!msgs.children.length) {
                adicionar("Oi! Eu sou o Plus AI. Posso te ajudar a usar a plataforma ou tirar dúvidas sobre os conteúdos. Escolha uma pergunta ou escreva a sua:", "bot");
                mostrarSugestoes();
            }
        }
    });

    painel.querySelector(".ts-ai-fechar").addEventListener("click", () => {
        painel.classList.remove("aberto");
    });

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        enviarPergunta(input.value.trim());
    });
})();