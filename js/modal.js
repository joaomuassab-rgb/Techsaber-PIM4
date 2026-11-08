(function () {
  const css = `
  .modal-fundo{position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:9999}
  .modal-caixa{background:#fff;color:#1d2b3a;border-radius:14px;padding:24px;max-width:380px;width:90%;box-shadow:0 10px 30px rgba(0,0,0,.25);font-family:Poppins,sans-serif}
  .modal-caixa p{margin:0 0 18px;font-size:16px;line-height:1.5}
  .modal-botoes{display:flex;gap:10px;justify-content:flex-end}
  .modal-botoes button{padding:9px 18px;border:none;border-radius:8px;cursor:pointer;font-weight:600}
  .modal-ok{background:#1fa2d8;color:#fff}
  .modal-cancelar{background:#e6ebf0;color:#1d2b3a}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function abrir(mensagem, comCancelar) {
    return new Promise((resolve) => {
      const fundo = document.createElement("div");
      fundo.className = "modal-fundo";
      fundo.innerHTML = '<div class="modal-caixa" role="dialog" aria-modal="true"><p></p><div class="modal-botoes"></div></div>';
      fundo.querySelector("p").textContent = mensagem;
      const botoes = fundo.querySelector(".modal-botoes");

      function fechar(valor) {
        fundo.remove();
        resolve(valor);
      }

      if (comCancelar) {
        const nao = document.createElement("button");
        nao.className = "modal-cancelar";
        nao.textContent = "Cancelar";
        nao.onclick = () => fechar(false);
        botoes.appendChild(nao);
      }

      const ok = document.createElement("button");
      ok.className = "modal-ok";
      ok.textContent = "OK";
      ok.onclick = () => fechar(true);
      botoes.appendChild(ok);

      document.body.appendChild(fundo);
      ok.focus();
    });
  }

  window.avisar = (msg) => abrir(msg, false);
  window.confirmar = (msg) => abrir(msg, true);
})();