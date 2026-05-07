const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 15",
            preco: 4999.90,
            categoria: "Celulares",
            imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600",
            descricao: "Smartphone Apple com ótimo desempenho, câmera avançada e design moderno.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Samsung Galaxy S24",
            preco: 4299.90,
            categoria: "Celulares",
            imagem: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600",
            descricao: "Celular Android potente, com tela de alta qualidade e excelente câmera.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Notebook Gamer Acer Nitro",
            preco: 5299.90,
            categoria: "Notebooks",
            imagem: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600",
            descricao: "Notebook gamer ideal para jogos, estudos e trabalho pesado.",
            emEstoque: true
        },
        {
            id: 4,
            nome: "MacBook Air M2",
            preco: 7999.90,
            categoria: "Notebooks",
            imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600",
            descricao: "Notebook leve, rápido e com bateria de longa duração.",
            emEstoque: false
        },
        {
            id: 5,
            nome: "Mouse Gamer RGB",
            preco: 149.90,
            categoria: "Acessórios",
            imagem: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=600",
            descricao: "Mouse gamer com iluminação RGB, boa precisão e pegada confortável.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Teclado Mecânico",
            preco: 299.90,
            categoria: "Acessórios",
            imagem: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600",
            descricao: "Teclado mecânico resistente, ideal para jogos e programação.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "PlayStation 5",
            preco: 3699.90,
            categoria: "Games",
            imagem: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600",
            descricao: "Console de nova geração com jogos exclusivos e alto desempenho.",
            emEstoque: false
        },
        {
            id: 8,
            nome: "Controle Xbox",
            preco: 399.90,
            categoria: "Games",
            imagem: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=600",
            descricao: "Controle confortável, preciso e compatível com Xbox e PC.",
            emEstoque: true
        }
    ]
};

// Seleção de elementos usando getElementById
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

// Seleção de elementos usando querySelector
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    // Uso obrigatório de style pelo JavaScript
    card.style.border = "1px solid #ddd";

    const image = document.createElement("img");
    image.setAttribute("src", produto.imagem);
    image.setAttribute("alt", produto.nome);

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.innerText = produto.nome;

    const price = document.createElement("p");
    price.innerText = formatPrice(produto.preco);

    const category = document.createElement("p");
    category.innerText = "Categoria: " + produto.categoria;

    const stock = document.createElement("p");
    stock.innerText = produto.emEstoque ? "Em estoque" : "Fora de estoque";

    const btnDetails = document.createElement("button");
    btnDetails.innerText = "Ver detalhes";
    btnDetails.classList.add("btn-details");

    btnDetails.addEventListener("click", function () {
        showProductDetails(produto);
    });

    const btnHighlight = document.createElement("button");
    btnHighlight.innerText = "Destacar";
    btnHighlight.classList.add("btn-highlight");

    btnHighlight.addEventListener("click", function () {
        card.classList.add("highlight");
    });

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(stock);
    card.appendChild(btnDetails);
    card.appendChild(btnHighlight);

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(function (produto) {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    // Uso obrigatório de querySelectorAll
    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        console.log("Card renderizado com data-id:", card.getAttribute("data-id"));
        card.style.minHeight = "360px";
    });
}

function renderCategories() {
    categorySelect.innerHTML = "";

    const optionAll = document.createElement("option");
    optionAll.setAttribute("value", "Todas");
    optionAll.innerText = "Todas";
    categorySelect.appendChild(optionAll);

    const categorias = [];

    data.produtos.forEach(function (produto) {
        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorias.forEach(function (categoria) {
        const option = document.createElement("option");
        option.setAttribute("value", categoria);
        option.innerText = categoria;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${produto.emEstoque ? "Em estoque" : "Fora de estoque"}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

function filterProducts() {
    const textoBusca = searchInput.value.toLowerCase();
    const categoriaEscolhida = categorySelect.value;

    const produtosFiltrados = data.produtos.filter(function (produto) {
        const nomeCombina = produto.nome.toLowerCase().includes(textoBusca);
        const categoriaCombina = categoriaEscolhida === "Todas" || produto.categoria === categoriaEscolhida;

        return nomeCombina && categoriaCombina;
    });

    return produtosFiltrados;
}

searchInput.addEventListener("input", function () {
    const produtosFiltrados = filterProducts();
    renderProducts(produtosFiltrados);
});

categorySelect.addEventListener("change", function () {
    const produtosFiltrados = filterProducts();
    renderProducts(produtosFiltrados);
});

btnRender.addEventListener("click", function () {
    const produtosFiltrados = filterProducts();
    renderProducts(produtosFiltrados);
});

renderCategories();
renderProducts(data.produtos);
