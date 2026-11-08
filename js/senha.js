/* SENHA.JS - olhinho fixo em todo campo de senha.
   Funciona mesmo quando o navegador preenche a senha sozinho
   ou quando a página mostra o campo depois de carregar. */
(function () {
    const ICONE_VER = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>`;

    const ICONE_OCULTAR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/></svg>`;

    function adicionarOlho(input) {
        /* já tem olho: não monta de novo */
        if (input.dataset.olhoPronto === "true") return;
        input.dataset.olhoPronto = "true";

        /* impede o navegador de sugerir senha salva */
        input.setAttribute("autocomplete", "new-password");
        input.setAttribute("data-lpignore", "true");
        input.setAttribute("data-1p-ignore", "true");

        const wrap = document.createElement("div");
        wrap.className = "campo-senha";
        input.parentNode.insertBefore(wrap, input);
        wrap.appendChild(input);

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-olho";
        btn.setAttribute("aria-label", "Mostrar senha");
        btn.setAttribute("aria-pressed", "false");
        btn.innerHTML = ICONE_VER;

        btn.addEventListener("click", () => {
            const estaVisivel = input.type === "text";
            input.type = estaVisivel ? "password" : "text";
            btn.innerHTML = estaVisivel ? ICONE_VER : ICONE_OCULTAR;
            btn.setAttribute("aria-label", estaVisivel ? "Mostrar senha" : "Ocultar senha");
            btn.setAttribute("aria-pressed", String(!estaVisivel));
            input.focus();
        });

        wrap.appendChild(btn);
    }

    function iniciar() {
        document.querySelectorAll('input[type="password"]').forEach(adicionarOlho);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }

    /* pega campos de senha que aparecem depois (ex.: formulários montados pelo JS) */
    const observador = new MutationObserver(iniciar);
    observador.observe(document.body || document.documentElement, { childList: true, subtree: true });

    window.addEventListener("load", iniciar);
})();