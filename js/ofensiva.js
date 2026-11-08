/* OFENSIVA.JS - dias de ofensiva guardados no navegador (localStorage).
   Começa em 0. Ao concluir uma lição, quiz ou avaliação, registra o dia de atividade:
   - mesmo dia: não soma de novo
   - dia seguinte ao último: soma 1 na sequência
   - pulou um dia ou mais: a sequência volta para 1
   Ao entrar na plataforma, se o último dia de atividade não foi hoje nem ontem,
   a sequência aparece como 0.
   O banco de dados depois só troca a origem desses números; as telas não mudam. */
(function () {
    const CHAVE_DIAS = "diasConsecutivos";
    const CHAVE_ULTIMO = "ultimoDiaAtividade";
    const CHAVE_ATIVOS = "diasAtivos";

    /* Reinício único dos dados de demonstração.
       Quando esta versão do arquivo entra no ar, zera o progresso antigo do navegador
       para a demonstração começar limpa. Para forçar outro reinício, mude o número abaixo. */
    const VERSAO_DEMO = "2";
    try {
        if (localStorage.getItem("versaoDemo") !== VERSAO_DEMO) {
            [CHAVE_DIAS, CHAVE_ULTIMO, CHAVE_ATIVOS, "ultimoCurso", "ultimoCursoNome"]
                .forEach((k) => localStorage.removeItem(k));
            Object.keys(localStorage).forEach((k) => {
                if (k.startsWith("progresso-") || k.startsWith("concluido-")) {
                    localStorage.removeItem(k);
                }
            });
            localStorage.setItem("versaoDemo", VERSAO_DEMO);
        }
    } catch (e) {
        /* sem localStorage: nada a limpar */
    }

    function formatar(data) {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function hoje() {
        return formatar(new Date());
    }

    function ontem() {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return formatar(d);
    }

    function lerTexto(chave) {
        try {
            return localStorage.getItem(chave);
        } catch (e) {
            return null;
        }
    }

    function gravarTexto(chave, valor) {
        try {
            localStorage.setItem(chave, valor);
        } catch (e) {
            /* sem localStorage: o número só aparece nesta página */
        }
    }

    function lerNumero(chave) {
        return parseInt(lerTexto(chave) || "0", 10) || 0;
    }

    /* sequência atual, já considerando se ela quebrou */
    function ler() {
        const ultimo = lerTexto(CHAVE_ULTIMO);
        if (ultimo !== hoje() && ultimo !== ontem()) return 0;
        return lerNumero(CHAVE_DIAS);
    }

    /* total de dias em que a pessoa teve atividade */
    function diasAtivos() {
        return lerNumero(CHAVE_ATIVOS);
    }

    function mostrar() {
        const dias = ler();
        document.querySelectorAll("[data-ofensiva]").forEach((el) => {
            el.textContent = dias;
        });
        document.querySelectorAll("[data-dias-ativos]").forEach((el) => {
            el.textContent = diasAtivos();
        });
    }

    /* chamada quando a pessoa conclui uma lição, quiz ou avaliação */
    function registrarAtividade() {
        const ultimo = lerTexto(CHAVE_ULTIMO);
        if (ultimo === hoje()) {
            mostrar();
            return ler();
        }

        const novaSequencia = ultimo === ontem() ? ler() + 1 : 1;
        gravarTexto(CHAVE_DIAS, String(novaSequencia));
        gravarTexto(CHAVE_ULTIMO, hoje());
        gravarTexto(CHAVE_ATIVOS, String(diasAtivos() + 1));
        mostrar();
        return novaSequencia;
    }

    window.TechSaberOfensiva = { registrarAtividade, mostrar, ler, diasAtivos };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mostrar);
    } else {
        mostrar();
    }
})();