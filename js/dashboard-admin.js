/* dashboard-admin.js
   Abas, barras animadas, editar (com perfil), remover e adicionar. */

document.addEventListener('DOMContentLoaded', () => {

    const abas    = document.querySelectorAll('.aba-btn');
    const paineis = document.querySelectorAll('.aba-painel');

    /* 1. ABAS: mostra só o painel correspondente à aba clicada */
    function ativarAba(alvo) {
        abas.forEach(aba => {
            aba.setAttribute('aria-selected', aba.dataset.tab === alvo ? 'true' : 'false');
        });
        paineis.forEach(painel => {
            painel.classList.toggle('active', painel.id === alvo);
        });
    }

    abas.forEach(aba => {
        aba.addEventListener('click', () => ativarAba(aba.dataset.tab));
    });

    ativarAba('aba-visao-geral');

    /* 2. BARRAS: enchem de forma animada ao abrir a página */
    setTimeout(() => {
        document.querySelectorAll('.barra__preench').forEach(barra => {
            barra.style.width = barra.dataset.valor + '%';
        });
    }, 150);


    /* 3. MODAL DE EDIÇÃO */
    const modalEditar = document.getElementById('modal-editar');
    const formEditar  = document.getElementById('form-editar');
    const editNome    = document.getElementById('edit-nome');
    const editPerfil  = document.getElementById('edit-perfil');
    const editStatus  = document.getElementById('edit-status');
    const btnCancelar = document.getElementById('btn-cancelar-edicao');

    let linhaEmEdicao = null;

    /* Perfil padrão do modal, de acordo com a tabela onde a linha está */
    function perfilDaAba(painel) {
        return painel && painel.id === 'aba-professores' ? 'professor' : 'aluno';
    }

    function abrirEdicao(linha, painel) {
        linhaEmEdicao = linha;
        editNome.value   = linha.cells[0].textContent.trim();
        editPerfil.value = perfilDaAba(painel);

        const statusTexto = linha.cells[3].textContent.trim().toLowerCase();
        editStatus.value  = statusTexto === 'inativo' ? 'inativo' : 'ativo';

        modalEditar.showModal();
    }

    function fecharEdicao() {
        modalEditar.close();
        linhaEmEdicao = null;
    }

    btnCancelar.addEventListener('click', fecharEdicao);

    /* Salvar: atualiza nome e status; se o perfil mudou, move a linha para a outra tabela */
    formEditar.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        if (!linhaEmEdicao) return;

        const novoNome   = editNome.value.trim();
        const novoPerfil = editPerfil.value;
        const novoStatus = editStatus.value;

        if (!novoNome) return;

        const painelAtual = linhaEmEdicao.closest('.aba-painel');
        const perfilAtual = perfilDaAba(painelAtual);

        /* perfil de administrador: a linha sai das tabelas de alunos e professores */
        if (novoPerfil === 'administrador') {
            linhaEmEdicao.remove();
            fecharEdicao();
            await avisar(`${novoNome} agora é administrador. Ele não aparece mais nas listas de alunos e professores.`);
            return;
        }

        /* se o perfil não mudou, só atualiza os dados */
        if (novoPerfil === perfilAtual) {
            linhaEmEdicao.cells[0].textContent = novoNome;

            const badge = linhaEmEdicao.cells[3].querySelector('.status');
            if (badge) {
                badge.className = 'status status--' + novoStatus;
                badge.textContent = novoStatus === 'ativo' ? 'Ativo' : 'Inativo';
            }

            fecharEdicao();
            return;
        }

        /* perfil mudou entre aluno e professor: cria a linha na tabela de destino */
        const idDestino    = novoPerfil === 'professor' ? 'aba-professores' : 'aba-alunos';
        const tbodyDestino = document.querySelector(`#${idDestino} tbody`);

        const textoStatus = novoStatus === 'ativo' ? 'Ativo' : 'Inativo';
        const colunas = novoPerfil === 'professor'
            ? [novoNome, 'Disciplina a definir', textoStatus]
            : [novoNome, 'Curso a definir', 'Módulo 01', textoStatus];

        const novaLinha = document.createElement('tr');

        colunas.forEach((texto, i) => {
            const td = document.createElement('td');
            if (i === colunas.length - 1) {
                td.innerHTML = `<span class="status status--${novoStatus}">${texto}</span>`;
            } else {
                td.textContent = texto;
            }
            novaLinha.appendChild(td);
        });

        novaLinha.appendChild(criarCelulaAcoes());

        tbodyDestino.prepend(novaLinha);
        linhaEmEdicao.remove();

        fecharEdicao();
    });


    /* 4. AÇÕES NAS LINHAS: editar, remover e adicionar */
    function criarCelulaAcoes() {
        const td = document.createElement('td');
        td.className = 'acoes';
        td.innerHTML =
            '<button class="btn-acao btn-acao--editar">Editar</button>' +
            '<button class="btn-acao btn-acao--remover">Remover</button>';
        return td;
    }

    document.querySelector('main').addEventListener('click', async (evento) => {
        const botao = evento.target.closest('button');
        if (!botao) return;

        /* Remover: pede confirmação e apaga a linha */
        if (botao.classList.contains('btn-acao--remover')) {
            const linha = botao.closest('tr');
            const nome  = linha.cells[0].textContent.trim();
            if (await confirmar('Remover “${nome}”? Essa ação não pode ser desfeita.')) {
                linha.remove();
            }
            return;
        }

        /* Editar: abre o modal com o perfil atual */
        if (botao.classList.contains('btn-acao--editar')) {
            const linha  = botao.closest('tr');
            const painel = botao.closest('.aba-painel');
            abrirEdicao(linha, painel);
            return;
        }

        /* Adicionar: aviso por enquanto (o cadastro será ligado à API depois) */
        if (botao.classList.contains('btn-adicionar')) {
            const tipo = botao.dataset.tipo === 'professor' ? 'professor' : 'aluno';
           await avisar(`Abrir formulário para cadastrar ${tipo} (em construção)`);
        }
    });

});