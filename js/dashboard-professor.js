/* dashboard-professor.js
   Adicionar atividade (com formulário), modo de edição, remover e acessar.
   Os avisos e confirmações usam as caixas do próprio site, não as do navegador. */

document.addEventListener('DOMContentLoaded', () => {

    const tabela       = document.querySelector('.activities-table tbody');
    const tabelaWrap   = document.getElementById('tabela-wrap');
    const btnEditar    = document.getElementById('btn-editar-atividades');
    const btnAbrir     = document.getElementById('btn-abrir-modal');

    const modalAdd     = document.getElementById('modal-add');
    const form         = document.getElementById('form-atividade');
    const inputTitulo  = document.getElementById('input-titulo');
    const inputTurma   = document.getElementById('input-turma');
    const inputDesc    = document.getElementById('input-desc');
    const btnCancelar  = document.getElementById('btn-cancelar-modal');

    const modalConfirmar = document.getElementById('modal-confirmar');
    const confirmarTexto = document.getElementById('confirmar-texto');
    const btnSimConfirm  = document.getElementById('btn-sim-confirmar');
    const btnNaoConfirm  = document.getElementById('btn-nao-confirmar');

    const modalAviso   = document.getElementById('modal-aviso');
    const avisoTexto   = document.getElementById('aviso-texto');
    const btnFecharAviso = document.getElementById('btn-fechar-aviso');

    let modoEdicao = false;
    let acaoPendente = null;

    /* ---------- CAIXAS DO SITE ---------- */

    function mostrarAviso(texto) {
        avisoTexto.textContent = texto;
        modalAviso.showModal();
    }

    function pedirConfirmacao(texto, aoConfirmar) {
        confirmarTexto.textContent = texto;
        acaoPendente = aoConfirmar;
        modalConfirmar.showModal();
    }

    btnFecharAviso.addEventListener('click', () => modalAviso.close());

    btnNaoConfirm.addEventListener('click', () => {
        acaoPendente = null;
        modalConfirmar.close();
    });

    btnSimConfirm.addEventListener('click', () => {
        if (acaoPendente) acaoPendente();
        acaoPendente = null;
        modalConfirmar.close();
    });

    /* ---------- MODAL DE ADICIONAR ---------- */

    btnAbrir.addEventListener('click', () => modalAdd.showModal());

    btnCancelar.addEventListener('click', () => {
        limparErros();
        form.reset();
        modalAdd.close();
    });

    function limparErros() {
        document.querySelectorAll('.erro-campo').forEach(el => el.hidden = true);
        document.querySelectorAll('.field').forEach(el => el.classList.remove('com-erro'));
    }

    function marcarErro(campo, idErro) {
        campo.closest('.field').classList.add('com-erro');
        document.getElementById(idErro).hidden = false;
    }

    /* Publicar: valida os campos e cria a linha no topo da tabela */
    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        limparErros();

        const titulo = inputTitulo.value.trim();
        const turma  = inputTurma.value;
        const desc   = inputDesc.value.trim();
        let valido   = true;

        if (!titulo) {
            marcarErro(inputTitulo, 'erro-titulo');
            valido = false;
        }

        if (!turma) {
            marcarErro(inputTurma, 'erro-turma');
            valido = false;
        }

        if (!valido) return;

        const hoje = new Date().toLocaleDateString('pt-BR');
        const linha = criarLinha(titulo, turma, hoje, 'Ativa');

        tabela.prepend(linha);
        atualizarBotoesEdicao();

        form.reset();
        limparErros();
        modalAdd.close();

        mostrarAviso(`A atividade "${titulo}" foi publicada para a ${turma}.`);
        if (desc) console.info('Descrição da atividade:', desc);
    });

    /* Cria uma linha da tabela com as células e os botões */
    function criarLinha(nome, turmaTexto, data, statusTexto) {
        const linha = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.textContent = nome;

        const tdTurma = document.createElement('td');
        tdTurma.textContent = turmaTexto;

        const tdData = document.createElement('td');
        tdData.textContent = data;

        const tdStatus = document.createElement('td');
        const badge = document.createElement('span');
        badge.className = statusTexto === 'Ativa' ? 'badge badge--active' : 'badge badge--done';
        badge.textContent = statusTexto;
        tdStatus.appendChild(badge);

        const tdAcoes = document.createElement('td');
        const btnAcesse = document.createElement('button');
        btnAcesse.className = 'btn-action';
        btnAcesse.textContent = 'Acesse';
        tdAcoes.appendChild(btnAcesse);

        linha.append(tdNome, tdTurma, tdData, tdStatus, tdAcoes);
        return linha;
    }

    /* ---------- MODO DE EDIÇÃO E REMOVER ---------- */

    function atualizarBotoesEdicao() {
        tabela.querySelectorAll('tr').forEach(linha => {
            const acoes = linha.cells[4];
            const existente = acoes.querySelector('.btn-remover');

            if (modoEdicao && !existente) {
                const btn = document.createElement('button');
                btn.className = 'btn-action btn-remover';
                btn.textContent = 'Remover';
                acoes.appendChild(btn);
            } else if (!modoEdicao && existente) {
                existente.remove();
            }
        });
    }

    btnEditar.addEventListener('click', () => {
        modoEdicao = !modoEdicao;
        btnEditar.textContent = modoEdicao ? 'Concluir' : 'Editar';
        btnEditar.setAttribute('aria-pressed', String(modoEdicao));
        tabelaWrap.classList.toggle('modo-edicao', modoEdicao);
        atualizarBotoesEdicao();
    });

    /* Cliques na tabela: remover (com confirmação) ou acessar */
    tabela.addEventListener('click', (evento) => {
        const btnRemover = evento.target.closest('.btn-remover');
        if (btnRemover) {
            const linha = btnRemover.closest('tr');
            const nome  = linha.cells[0].textContent;
            pedirConfirmacao(
                `Remover "${nome}"? Essa ação não pode ser desfeita.`,
                () => linha.remove()
            );
            return;
        }

        const btnAcesse = evento.target.closest('.btn-action');
        if (btnAcesse) {
            const nome = btnAcesse.closest('tr').cells[0].textContent;
            mostrarAviso(`Abrindo a atividade "${nome}". Essa tela ainda está em construção.`);
        }
    });

});