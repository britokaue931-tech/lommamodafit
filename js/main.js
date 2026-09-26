/* =========================================================
   Loma Moda Fit — main.js
   Catálogo de produtos, filtros por categoria, sacola de
   compras (com checkout via WhatsApp), menu mobile e
   formulário de newsletter.
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1) CATÁLOGO DE PRODUTOS
     Troque o campo "img" por um caminho real (ex.: "img/produtos/legging-nascer-do-sol.jpg")
     assim que tiver as fotos. Enquanto isso, uma imagem placeholder
     é gerada automaticamente nas cores da categoria.
     --------------------------------------------------------- */
  const PRODUTOS = [
    { id: "knox", nome: "Conjunto nox", categoria: "Conjuntos", preco: 129.99, tamanho: "M", cores: "marinho e cinza", img: "js/css/img/conjunto nox.jpeg" },
    { id: "cropped-tela", nome: "Cropped tela", categoria: "Cropped", preco: 45.00, tamanho: "M", cores: "azul marinho", img: "js/css/img/cropped tela.jpeg" },
    { id: "flar-lavinia", nome: "Conjunto Calça Flar-Lavínia", categoria: "Conjuntos", preco: 109.9, tamanho: "G", cores: "marrom e rosa bebê", img: "js/css/img/conjunto calça flar lavinia.jpeg" },
    { id: "short-saia", nome: "Conjunto Short Saia Beach Tênis", categoria: "Conjuntos", preco: 120, tamanho: "P", cores: "azul bebê e off", img: "js/css/img/conjunto short saia beatch tenis.jpeg" },
    { id: "regata-mille", nome: "Regata Mily", categoria: "Regatas", preco: 49.99, tamanho: "Único", cores: "chocolate, branco e preto", img: "js/css/img/regata mily.jpeg" },
    { id: "amora", nome: "Macaquinho Amora", categoria: "Macacões", preco: 100, tamanho: "G", cores: "marinho", img: "js/css/img/macacão amora marinho.jpeg" },
    { id: "short-duplo", nome: "Short Duplo", categoria: "Shorts", preco: 79.99,tamanho:"G",cores: "branco e preto", img: "js/css/img/short duplo.jpeg" },
    { id: "blusa-ioga", nome: "Blusa Yoga", categoria: "Blusas", preco: 45, tamanho: "Único", cores: "areia e branca", img: "js/css/img/blusa yoga.jpeg" },
    { id: "eclipse", nome: "Macaquinho Eclipse", categoria: "Macacões", preco: 89.99, tamanho: "Único", cores: "disponível em outras cores", img: "js/css/img/macaquinho eclipse.jpeg" },
    { id: "jaqueta-premium", nome: "Jaqueta Premium", categoria: "Jaquetas", preco: 109.99, tamanho: "M", cores: "preto, branco, rosa e marrom", img: "js/css/img/jaqueta premium.jpeg", img2: "js/css/img/jaqueta premium2.jpeg" },
    { id: "Conjunto helena", nome: "Conjunto helena", categoria: "Conjuntos", preco: 159.99, tamanho: "M", cores: "disponível em outras cores", img: "js/css/img/conjunto helena.jpeg", img2: "js/css/img/conjunto helena2.jpeg" },
    { id: "inspiracao", nome: "Macaquinho Inspiração", categoria: "Macacões", preco: 89.99, tamanho: "G", img: "js/css/img/macacão inspiraçao.jpeg", img2: "js/css/img/macacão inspiraçao2.jpeg" },
    { id: "cj05", nome: "Conjunto Pérola", categoria: "Conjuntos", preco: 99.99, tamanho: "Único", cores: "disponível em outras cores", img: "js/css/img/conjunto pérola.jpeg", img2: "js/css/img/conjunto pérola2.jpeg" },
    { id: "mc01", nome: "Macacão Friso", categoria: "Macacões", preco: 129.99, tamanho: "M", img: "js/css/img/macacão friso.jpeg", img2: "js/css/img/macacão friso2.jpeg" },
    { id: "cj04", nome: "Conjunto Pulse", categoria: "Conjuntos", preco: 139.99, tamanho: "M", img: "js/css/img/conjunto pulse.jpeg", img2: "js/css/img/conjunto pulse 2.jpeg" },
    { id: "cj02", nome: "Conjunto Calça Bloom", categoria: "Conjuntos", preco: 129.99, tamanho: "G", img: "js/css/img/conjunto calça bloom.jpeg", img2: "js/css/img/conjunto calça bloom2.jpeg" },
    { id: "mc02", nome: "Macacão Rubi", categoria: "Macacões", preco: 119.99, tamanho: "Único", img: "js/css/img/macacão ruby.jpeg", img2: "js/css/img/macacão ruby2.jpeg" },
    { id: "cj01", nome: "Conjunto Baby Look Azul", categoria: "Conjuntos", preco: 119.99,tamanho:"M", img: "js/css/img/conjunto baby look azul.jpeg", img2: "js/css/img/conjunto baby look azul2.jpeg" },
    { id: "cj03", nome: "Conjunto Grip", categoria: "Conjuntos", preco: 129.99,tamanho:"M", img: "js/css/img/conjunto grip.jpeg" },
  ];
  const TAMANHOS = ["P", "M", "G", "GG", "Único"];

  const CORES_CATEGORIA = {
    Macacões: ["#3B1E52", "#7A1F3D"],
    Leggings: ["#3B1E52", "#7A1F3D"],
    Tops: ["#E63946", "#FF8C42"],
    Shorts: ["#FF8C42", "#FFC857"],
    Conjuntos: ["#3B1E52", "#E63946"],
  };

  function placeholderProduto(nome, categoria) {
    const [c1, c2] = CORES_CATEGORIA[categoria] || ["#3B1E52", "#E63946"];
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${c1}"/>
            <stop offset="1" stop-color="${c2}"/>
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#g)"/>
        <text x="200" y="250" fill="#FFF9F5" font-family="sans-serif" font-size="22"
          font-weight="600" text-anchor="middle" dominant-baseline="middle">${nome}</text>
      </svg>`;
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
  }

  function imagemProduto(produto) {
    return produto.img || placeholderProduto(produto.nome, produto.categoria);
  }

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function precoCredito(valor) {
    return valor + 10;
  }

  function opcoesPagamento(valor, classe = "", valorCartao = precoCredito(valor)) {
    return `<div class="opcoes-pagamento ${classe}">
      <span><small>À vista</small>${formatarPreco(valor)}</span>
      <span><small>Cartão (+R$ 10,00)</small>${formatarPreco(valorCartao)}</span>
    </div>`;
  }

  /* ---------------------------------------------------------
     2) FILTROS + GRADE DE PRODUTOS
     --------------------------------------------------------- */
  const elFiltros = document.getElementById("filtros");
  const elGrade = document.getElementById("grade");
  let categoriaAtiva = "Todos";

  function montarFiltros() {
    const categorias = ["Todos", ...new Set(PRODUTOS.map((p) => p.categoria))];
    elFiltros.innerHTML = categorias
      .map(
        (cat) =>
          `<button type="button" data-cat="${cat}" aria-pressed="${cat === categoriaAtiva}">${cat}</button>`
      )
      .join("");
  }

  function montarGrade() {
    const lista =
      categoriaAtiva === "Todos"
        ? PRODUTOS
        : PRODUTOS.filter((p) => p.categoria === categoriaAtiva);

    elGrade.innerHTML = lista
      .map(
        (p) => `
      <article class="produto" data-id="${p.id}">
        <div class="miniatura galeria">
          <div class="galeria-faixa">
            <img src="${imagemProduto(p)}" alt="${p.nome}" width="400" height="500" loading="lazy" draggable="false">
            ${p.img2 ? `<img src="${p.img2}" alt="${p.nome}, segunda foto" width="400" height="500" loading="lazy" draggable="false">` : ""}
          </div>
          ${p.img2 ? `<button type="button" class="seta-galeria anterior" data-direcao="anterior" aria-label="Ver foto anterior de ${p.nome}">‹</button><button type="button" class="seta-galeria proxima" data-direcao="proxima" aria-label="Ver próxima foto de ${p.nome}">›</button>` : ""}
          <button type="button" class="ampliar" aria-label="Ampliar imagem de ${p.nome}" aria-pressed="false">⌕</button>
        </div>
        <div class="info">
          <p class="categoria">${p.categoria}</p>
          <h3>${p.nome}</h3>
          ${p.tamanho || p.cores ? `<p class="detalhes">${p.tamanho ? `Tamanho: ${p.tamanho}` : ""}${p.tamanho && p.cores ? "<br>" : ""}${p.cores ? `Cores: ${p.cores}` : ""}</p>` : ""}
          ${opcoesPagamento(p.preco)}
          <label class="seletor-tamanho">
            Tamanho
            <select class="tamanho" required>
              ${p.tamanho ? `<option value="${p.tamanho}" selected>${p.tamanho}</option>` : `<option value="" selected disabled>Escolha</option>${TAMANHOS.map((tamanho) => `<option value="${tamanho}">${tamanho}</option>`).join("")}`}
            </select>
          </label>
          <button type="button" class="adicionar" data-id="${p.id}">Adicionar à sacola</button>
        </div>
      </article>`
      )
      .join("");
  }

  elFiltros.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button[data-cat]");
    if (!btn) return;
    categoriaAtiva = btn.dataset.cat;
    montarFiltros();
    montarGrade();
  });

  elGrade.addEventListener("click", (ev) => {
    const seta = ev.target.closest("button.seta-galeria");
    if (seta) {
      const faixa = seta.closest(".galeria").querySelector(".galeria-faixa");
      const passo = faixa.clientWidth;
      faixa.scrollBy({ left: seta.dataset.direcao === "proxima" ? passo : -passo, behavior: "smooth" });
      return;
    }
    const zoomBtn = ev.target.closest("button.ampliar");
    if (zoomBtn) {
      const faixa = zoomBtn.closest(".galeria").querySelector(".galeria-faixa");
      const imagens = faixa.querySelectorAll("img");
      const indice = Math.round(faixa.scrollLeft / faixa.clientWidth);
      const imagem = imagens[indice] || imagens[0];
      const ampliada = imagem.classList.toggle("ampliada");
      zoomBtn.setAttribute("aria-pressed", String(ampliada));
      zoomBtn.textContent = ampliada ? "×" : "⌕";
      return;
    }
    const btn = ev.target.closest("button.adicionar");
    if (!btn) return;
    const produto = btn.closest("article.produto");
    const tamanho = produto.querySelector("select.tamanho").value;
    if (!tamanho) {
      produto.querySelector("select.tamanho").focus();
      return;
    }
    adicionarAoCarrinho(btn.dataset.id, tamanho);
    btn.textContent = "Adicionado ✓";
    btn.classList.add("adicionado");
    setTimeout(() => {
      btn.textContent = "Adicionar à sacola";
      btn.classList.remove("adicionado");
    }, 1200);
  });

  let arraste = null;
  elGrade.addEventListener("pointerdown", (ev) => {
    const faixa = ev.target.closest(".galeria-faixa");
    if (!faixa || ev.target.closest("img.ampliada")) return;
    arraste = { faixa, inicioX: ev.clientX, scrollInicial: faixa.scrollLeft };
    faixa.classList.add("arrastando");
    faixa.setPointerCapture(ev.pointerId);
  });

  elGrade.addEventListener("pointermove", (ev) => {
    if (!arraste) return;
    arraste.faixa.scrollLeft = arraste.scrollInicial - (ev.clientX - arraste.inicioX);
  });

  function finalizarArraste(ev) {
    if (!arraste) return;
    arraste.faixa.classList.remove("arrastando");
    if (arraste.faixa.hasPointerCapture(ev.pointerId)) arraste.faixa.releasePointerCapture(ev.pointerId);
    arraste = null;
  }

  elGrade.addEventListener("pointerup", finalizarArraste);
  elGrade.addEventListener("pointercancel", finalizarArraste);

  /* ---------------------------------------------------------
     3) SACOLA (CARRINHO)
     --------------------------------------------------------- */
  const NUMERO_WHATSAPP = "5583999922010";
  let carrinho = []; // { id, tamanho, qtd }

  const elVeu = document.getElementById("veu");
  const elSacola = document.getElementById("sacola");
  const elItens = document.getElementById("itens");
  const elTotal = document.getElementById("total");
  const elQtd = document.getElementById("qtd");
  const elFinalizar = document.getElementById("finalizar");

  function adicionarAoCarrinho(id, tamanho) {
    const item = carrinho.find((i) => i.id === id && i.tamanho === tamanho);
    if (item) item.qtd += 1;
    else carrinho.push({ id, tamanho, qtd: 1 });
    atualizarSacola();
  }

  function alterarQtd(id, tamanho, delta) {
    const item = carrinho.find((i) => i.id === id && i.tamanho === tamanho);
    if (!item) return;
    item.qtd += delta;
    if (item.qtd <= 0) carrinho = carrinho.filter((i) => !(i.id === id && i.tamanho === tamanho));
    atualizarSacola();
  }

  function removerItem(id, tamanho) {
    carrinho = carrinho.filter((i) => !(i.id === id && i.tamanho === tamanho));
    atualizarSacola();
  }

  function atualizarSacola() {
    const totalItens = carrinho.reduce((soma, i) => soma + i.qtd, 0);
    elQtd.textContent = totalItens;

    if (carrinho.length === 0) {
      elItens.innerHTML = '<li class="vazia">Sua sacola está vazia.</li>';
      elTotal.innerHTML = opcoesPagamento(0, "precos-total", 0);
      elFinalizar.hidden = true;
      return;
    }

    let totalValor = 0;
    let totalCredito = 0;
    elItens.innerHTML = carrinho
      .map(({ id, tamanho, qtd }) => {
        const p = PRODUTOS.find((prod) => prod.id === id);
        const subtotal = p.preco * qtd;
        totalValor += subtotal;
        totalCredito += precoCredito(p.preco) * qtd;
        return `
        <li class="item" data-id="${id}" data-tamanho="${tamanho}">
          <img src="${imagemProduto(p)}" alt="" width="56" height="56">
          <div>
            <p class="nome">${p.nome}</p>
            <p class="preco-un">Tamanho: ${tamanho}</p>
            ${opcoesPagamento(p.preco, "precos-sacola")} 
            <div class="qtd-controle">
              <button type="button" data-acao="menos" aria-label="Diminuir quantidade">−</button>
              <span>${qtd}</span>
              <button type="button" data-acao="mais" aria-label="Aumentar quantidade">+</button>
            </div>
          </div>
          <button type="button" class="remover" data-acao="remover">Remover</button>
        </li>`;
      })
      .join("");

    elTotal.innerHTML = opcoesPagamento(totalValor, "precos-total", totalCredito);
    elFinalizar.hidden = false;

    const linhas = carrinho.map(({ id, tamanho, qtd }) => {
      const p = PRODUTOS.find((prod) => prod.id === id);
      return `• ${qtd}x ${p.nome} (tamanho ${tamanho}) — à vista ${formatarPreco(p.preco * qtd)} ou cartão ${formatarPreco(precoCredito(p.preco) * qtd)}`;
    });
    const mensagem =
      `Olá! Quero fechar meu pedido na Lomma Moda Fit:%0A%0A` +
      encodeURIComponent(linhas.join("\n")) +
      `%0A%0ATotal à vista: ${encodeURIComponent(formatarPreco(totalValor))}` +
      `%0A Total no cartão: ${encodeURIComponent(formatarPreco(totalCredito))}`;
    elFinalizar.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`;
  }

  elItens.addEventListener("click", (ev) => {
    const li = ev.target.closest("li.item");
    if (!li) return;
    const id = li.dataset.id;
    const tamanho = li.dataset.tamanho;
    const acao = ev.target.closest("button")?.dataset.acao;
    if (acao === "mais") alterarQtd(id, tamanho, 1);
    if (acao === "menos") alterarQtd(id, tamanho, -1);
    if (acao === "remover") removerItem(id, tamanho);
  });

  function abrirSacola() {
    elSacola.classList.add("aberta");
    elVeu.classList.add("ativo");
    elSacola.setAttribute("aria-hidden", "false");
  }
  function fecharSacola() {
    elSacola.classList.remove("aberta");
    elVeu.classList.remove("ativo");
    elSacola.setAttribute("aria-hidden", "true");
  }

  document.getElementById("abrirCarrinho").addEventListener("click", abrirSacola);
  document.getElementById("fechar").addEventListener("click", fecharSacola);
  elVeu.addEventListener("click", fecharSacola);
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") fecharSacola();
  });

  /* ---------------------------------------------------------
     4) MENU MOBILE
     --------------------------------------------------------- */
  const btnMenu = document.getElementById("btnMenu");
  const menu = document.getElementById("menu");

  btnMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    btnMenu.setAttribute("aria-expanded", String(aberto));
    btnMenu.textContent = aberto ? "Fechar" : "Menu";
  });

  menu.addEventListener("click", (ev) => {
    if (ev.target.tagName === "A" && menu.classList.contains("aberto")) {
      menu.classList.remove("aberto");
      btnMenu.setAttribute("aria-expanded", "false");
      btnMenu.textContent = "Menu";
    }
  });

  /* ---------------------------------------------------------
     5) CABEÇALHO COM SOMBRA AO ROLAR
     --------------------------------------------------------- */
  const topo = document.querySelector(".topo");
  window.addEventListener(
    "scroll",
    () => {
      topo.classList.toggle("rolado", window.scrollY > 12);
    },
    { passive: true }
  );

  /* ---------------------------------------------------------
     6) NEWSLETTER (com EmailJS, se configurado)
     Para ativar o envio de verdade, preencha as três constantes
     abaixo com os dados da sua conta em emailjs.com e descomente
     a chamada emailjs.init(...) e emailjs.send(...).
     --------------------------------------------------------- */
  const EMAILJS_PUBLIC_KEY = "";
  const EMAILJS_SERVICE_ID = "";
  const EMAILJS_TEMPLATE_ID = "";

  const formNews = document.getElementById("formNews");
  const msgNews = document.getElementById("msgNews");

  if (EMAILJS_PUBLIC_KEY && window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  formNews.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const email = document.getElementById("email").value.trim();
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valido) {
      msgNews.textContent = "Digite um e-mail válido.";
      msgNews.dataset.tipo = "erro";
      return;
    }

    if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && window.emailjs) {
      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { email })
        .then(() => {
          msgNews.textContent = "Recebido! Você vai receber nossas novidades em breve.";
          msgNews.dataset.tipo = "ok";
          formNews.reset();
        })
        .catch(() => {
          msgNews.textContent = "Não deu para enviar agora. Tente novamente em instantes.";
          msgNews.dataset.tipo = "erro";
        });
    } else {
      // Sem EmailJS configurado ainda: apenas confirma visualmente.
      msgNews.textContent = "Recebido! Você vai receber nossas novidades em breve.";
      msgNews.dataset.tipo = "ok";
      formNews.reset();
    }
  });

  /* ---------------------------------------------------------
     7) ANO NO RODAPÉ
     --------------------------------------------------------- */
  document.getElementById("ano").textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     INICIALIZAÇÃO
     --------------------------------------------------------- */
  montarFiltros();
  montarGrade();
  atualizarSacola();
})();
