// LOGIN JS - TechSaber+
// Controla a navegação entre telas e validação do login

let perfilSelecionado = ""; // guarda o perfil escolhido

/* chamada ao clicar em um card de perfil */
function escolherPerfil(perfil) {
    perfilSelecionado = perfil;

    /* esconde a tela de perfil e mostra o formulário */
    document.getElementById("tela-perfil").style.display = "none";
    document.getElementById("tela-login").style.display = "flex";
}

/* volta para a tela de escolha de perfil */
function voltarPerfil() {
    document.getElementById("tela-login").style.display = "none";
    document.getElementById("tela-perfil").style.display = "block";

    /* limpa mensagens e campos */
    document.getElementById("msg-erro").style.display = "none";
    document.getElementById("msg-sucesso").style.display = "none";
    document.getElementById("login-email").value = "";
    document.getElementById("login-senha").value = "";
}

/* simulação de login com usuários fictícios */
function fazerLogin() {
    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-senha").value.trim();
    const erro = document.getElementById("msg-erro");
    const sucesso = document.getElementById("msg-sucesso");

    /* esconde mensagens anteriores */
    erro.style.display = "none";
    sucesso.style.display = "none";

    /* valida se os campos estão preenchidos */
    if (!email || !senha) {
        erro.style.display = "block";
        return;
    }

    /* usuários fictícios para demonstração */
    const usuarios = {
        aluno:     { email: "aluno@techsaber.com",     senha: "aluno123" },
        professor: { email: "professor@techsaber.com", senha: "prof123"  },
        admin:     { email: "admin@techsaber.com",     senha: "admin123" }
    };

    const usuario = usuarios[perfilSelecionado];

    /* verifica se email e senha batem */
    if (email === usuario.email && senha === usuario.senha) {
        sucesso.style.display = "block";

        /* limpa progresso anterior */
        Object.keys(localStorage)
            .filter(k => k.startsWith('progresso-') || k.startsWith('concluido-'))
            .forEach(k => localStorage.removeItem(k));

        if (perfilSelecionado === "aluno") {
            /* simula aluno com alguns dias de uso */
            localStorage.setItem("diasConsecutivos", "6");
            localStorage.setItem("ultimoAcesso", new Date().toDateString());

            localStorage.setItem("progresso-Front-End", "3");
            localStorage.setItem("progresso-Banco-de-Dados", "2");
            localStorage.setItem("progresso-Soft-Skills", "5");
            localStorage.setItem("concluido-Soft-Skills", "true");

            localStorage.setItem("ultimoCurso", "Front-End");
            localStorage.setItem("ultimoCursoNome", "Front End");
        }

        /* redireciona para o dashboard correto após 1 segundo */
        setTimeout(() => {
            if (perfilSelecionado === "aluno")     window.location.href = "dashboard-aluno.html";
            if (perfilSelecionado === "professor") window.location.href = "dashboard-professor.html";
            if (perfilSelecionado === "admin")     window.location.href = "dashboard-admin.html";
        }, 1000);

    } else {
        erro.style.display = "block";
    }
}