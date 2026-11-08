/* xp.js - TechSaber+: pontos de experiência (XP) e nível, guardados no navegador.
   Cada tarefa dá XP só uma vez (ex.: "aval-Front-End"). */
(function () {
    const CHAVE_XP = "xpTotal";
    const CHAVE_FEITOS = "xpConcedidos";
    const XP_NIVEL_2 = 150;

    function lerJSON(chave, padrao) {
        try {
            const valor = localStorage.getItem(chave);
            return valor ? JSON.parse(valor) : padrao;
        } catch (e) {
            return padrao;
        }
    }

    function gravar(chave, valor) {
        try {
            localStorage.setItem(chave, JSON.stringify(valor));
        } catch (e) { /* sem acesso ao armazenamento: segue sem salvar */ }
    }

    function total() {
        return Number(lerJSON(CHAVE_XP, 0)) || 0;
    }

    function nivel() {
        return total() >= XP_NIVEL_2 ? 2 : 1;
    }

    /* Caixinha de aviso que aparece embaixo da tela e some sozinha */
    function mostrarAviso(texto) {
        const caixa = document.createElement("div");
        caixa.textContent = texto;
        caixa.style.cssText =
            "position:fixed;left:50%;bottom:32px;transform:translateX(-50%) translateY(20px);" +
            "background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;" +
            "padding:14px 24px;border-radius:999px;font-family:Poppins,sans-serif;font-weight:600;" +
            "box-shadow:0 12px 30px rgba(37,99,235,.35);opacity:0;" +
            "transition:opacity .4s ease, transform .4s ease;z-index:9999;";
        document.body.appendChild(caixa);

        requestAnimationFrame(() => {
            caixa.style.opacity = "1";
            caixa.style.transform = "translateX(-50%) translateY(0)";
        });

        setTimeout(() => {
            caixa.style.opacity = "0";
            setTimeout(() => caixa.remove(), 400);
        }, 2600);
    }

    /* Dá XP uma única vez para a chave informada */
    function ganhar(chave, valor, motivo) {
        const feitos = lerJSON(CHAVE_FEITOS, []);
        if (feitos.includes(chave)) {
            return { ganhou: false, total: total(), subiu: false };
        }

        const nivelAntes = nivel();
        const novoTotal = total() + valor;

        gravar(CHAVE_XP, novoTotal);
        gravar(CHAVE_FEITOS, feitos.concat(chave));

        const subiu = nivelAntes < 2 && novoTotal >= XP_NIVEL_2;

        mostrarAviso("+" + valor + " XP" + (motivo ? " · " + motivo : ""));
        if (subiu) {
            setTimeout(() => mostrarAviso("Nível 2 desbloqueado!"), 2900);
        }

        return { ganhou: true, total: novoTotal, subiu: subiu };
    }

    window.TechSaberXP = {
        ganhar: ganhar,
        total: total,
        nivel: nivel,
        XP_NIVEL_2: XP_NIVEL_2
    };
})();