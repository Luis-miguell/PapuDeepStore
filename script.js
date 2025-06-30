//Productos de la tienda
let productos = JSON.parse(localStorage.getItem("productos")) || [
    {
        Name: "Air Force One",
        Image: "m1.webp",
        Price: 100000,
        Category: "moda",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Abrigo",
        Image: "m2.webp",
        Price: 60000,
        Category: "moda",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Jogger",
        Image: "m3.webp",
        Price: 90000,
        Category: "moda",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Laptop",
        Image: "t1.webp",
        Price: 2300000,
        Category: "tecnologia",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Air Pods Pro 2",
        Image: "t2.webp",
        Price: 460000,
        Category: "tecnologia",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Samsung Galaxy S25 Ultra",
        Image: "t3.webp",
        Price: 7000000,
        Category: "tecnologia",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Balón De Fuchibol",
        Image: "d1.webp",
        Price: 80000,
        Category: "deporte",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Camiseta De Fuchibol",
        Image: "d2.webp",
        Price: 100000,
        Category: "deporte",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Balón De Voleibol",
        Image: "d3.webp",
        Price: 150000,
        Category: "deporte",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Anillo",
        Image: "l1.webp",
        Price: 25000,
        Category: "lujos",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Cadena",
        Image: "l2.webp",
        Price: 30000,
        Category: "lujos",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
    {
        Name: "Rolex",
        Image: "l3.webp",
        Price: 40000000,
        Category: "lujos",
        Index: 0,
        Index2: 0,
        External:false,
        Cart: false
    },
];


//Revolvér?
let shuffle = localStorage.getItem("shuffle");
shuffle = shuffle == null ? true : JSON.parse(shuffle);

//Referencia entre filtros
let referenciaFiltros;


//Variable de productos barajeados
let productosRevueltos = JSON.parse(localStorage.getItem("productosRevueltos")) || "";


//Variable controladora de permisos
let tienePermisos = JSON.parse(localStorage.getItem("permisos")) || false;


//Svg del carrito
const svgCart = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>`


//Generador de índices
function indexGenerator(){
    productos.forEach((producto, i) => {
        producto.Index = i;
    })
    shuffle ? shuffleProducts(productos) : index2Generator();
};


//Generador de indices en shuffle
function index2Generator(){
    productosRevueltos.forEach((producto, i) => {
        producto.Index2 = i;
        let proReal = productos.find((pro) => pro.Name == producto.Name);
        proReal.Index2 = i;
    });
    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("productosRevueltos", JSON.stringify(productosRevueltos));
};


//Revolvedor de productos
function shuffleProducts(array){
    let arr = array.slice();
    for (let i = 0; i < arr.length; i++) {   
        const ref = Math.floor(Math.random() * arr.length);
        [arr[i], arr[ref]] = [arr[ref], arr[i]];
    };
    shuffle = false;
    localStorage.setItem("shuffle", JSON.stringify(shuffle));
    productosRevueltos = arr;
    referenciaFiltros = arr;
    index2Generator();
}


//Renderizador de productos
function productsRender(array){
    const productsSection = document.getElementById("products-section");

    productsSection.innerHTML = "";
    array.forEach(producto => {
        
        const article = document.createElement("article");
        article.setAttribute("class", "product-card");

        const img = document.createElement("img");
        img.setAttribute("class", "product-image-card");
        img.setAttribute("src", producto.External ? producto.Image : `Recursos/${producto.Image}`);
        img.setAttribute("alt", `Imagen alusiva a: ${producto.Name}`);
        article.appendChild(img);

        const h2 = document.createElement("h2");
        h2.setAttribute("class", "product-name-card");
        h2.innerText = producto.Name;
        article.appendChild(h2);

        const div = document.createElement("div");

        const span = document.createElement("span");
        span.setAttribute("class", "product-price-card");
        span.innerText = "$" + producto.Price.toLocaleString();
        div.appendChild(span);

        const boton = document.createElement("button");
        boton.setAttribute("class", "product-cart-btn");
        boton.append("Añadir");
        boton.innerHTML += svgCart;
        div.appendChild(boton);
        article.appendChild(div);

        const botonRmv = document.createElement("button");
        botonRmv.setAttribute("class", `product-rem-btn ${tienePermisos ? " visible-rem-btn" : ""}`);
        botonRmv.innerHTML += "&cross;";
        botonRmv.onclick = () => deleteProduct(producto.Index, producto.Index2)
        article.appendChild(botonRmv);

        productsSection.appendChild(article);

        if(!["moda", "lujos", "deporte", "tecnologia"].includes(producto.Category.toLowerCase())){
            let newCat = document.createElement("option");
            newCat.setAttribute("value", producto.Category.toLowerCase());
            newCat.innerText = producto.Category[0].toUpperCase() + producto.Category.slice(1).toLowerCase();
            document.getElementById("categories-select").appendChild(newCat);
        } 
    });
};


//Filtrado por categorias
function categoriesFilter(){
    const valor = document.getElementById("categories-select").value;
    if (valor == "todas"){
        referenciaFiltros = productosRevueltos;
    }else {
        referenciaFiltros = productos.filter((producto) => {
            return producto.Category == valor;
        });
    }
    pricesFilter();
}


//Filtrado por precios
function pricesFilter(e){
    if (e) e.preventDefault();
    const minPrice = Number(document.getElementById("min-price").value);
    const maxPrice = Number(document.getElementById("max-price").value);
    if(maxPrice < minPrice){
        alert("El precio máximo no puede ser menor que el precio mínimo.");
        return;
    };
    let filtrados = referenciaFiltros.filter(producto => producto.Price >= minPrice);
    maxPrice && (filtrados = filtrados.filter(producto => producto.Price <= maxPrice));
    productsRender(filtrados);
}


//Borrar Productos
function deleteProduct(index, index2){
    if (tienePermisos){
        productos.splice(index, 1);
        productosRevueltos.splice(index2, 1);
        indexGenerator();
        categoriesFilter();
    } else {
        alert("No puedes modificar la tienda si no tienes los permisos. \nConsiguelos ingresando la DKey.")
    }
}


//Permisos de administrador
function permissions(e){
    let DKeyBtn = e.target;
    let botones = Array.from(document.getElementsByClassName("product-rem-btn"));
    if (!tienePermisos) {
        let clave = prompt("Ingresa la clave para obtener los permisos...").trim();
        if(clave === "PapuClave"){
            tienePermisos = true;
            botones.forEach(boton => boton.classList.add("visible-rem-btn"));
            DKeyBtn.classList.add("active-admin");
            alert("Permisos concedidos.");
        } else {
            alert("Dkey errónea.\nPermisos no concedidos.")
        }
    } else {
        if(confirm("Seguro que quieres dejar los permisos especiales?")){
            tienePermisos = false;
            botones.forEach(boton => boton.classList.remove("visible-rem-btn"));
            DKeyBtn.classList.remove("active-admin");
            alert("Permisos removidos.")
        }
    }
    localStorage.setItem("permisos", JSON.stringify(tienePermisos));
};


function addProducts(e) {
    e.preventDefault();
    let nombre = document.getElementById("product-name-input").value.trim();
    let precio = Number(document.getElementById("product-price-input").value.trim());
    let imagen = document.getElementById("product-image-input").value.trim();
    let categoria = document.getElementById("product-category-input").value.trim();
    let producto = {
        Name: nombre, 
        Image: imagen,
        Price: precio,
        Category: categoria, 
        Index: 0,
        Index2: 0,
        External:true,
        Cart: false
    };
    productos.push(producto);
    productosRevueltos.push(producto);
    e.target.reset();
    document.getElementById("product-form-modal").classList.remove("modal-visible");
    indexGenerator();
    categoriesFilter();
}


function toggleModal(){
    if(tienePermisos){
        document.getElementById("product-form-modal").classList.toggle("modal-visible");
    } else {
        alert("No puedes modificar la tienda si no tienes los permisos. \nConsiguelos ingresando la DKey.");
    }
}


function clickOutModal(e){
    let form = document.getElementById("product-form");
    if(!form.contains(e.target)){
        document.getElementById("product-form-modal").classList.remove("modal-visible");
    };
}


document.getElementById("categories-select").addEventListener("change", categoriesFilter);
document.getElementById("prices-form").addEventListener("submit", pricesFilter);
document.getElementById("btn-admin-acces").addEventListener("click", permissions);
document.getElementById("product-form").addEventListener("submit", addProducts);
document.getElementById("add-product-btn").addEventListener("click", toggleModal);
document.getElementById("product-form-close-button").addEventListener("click", toggleModal);
document.getElementById("product-form-modal").addEventListener("click", clickOutModal);
indexGenerator();
productsRender(productosRevueltos);
if(tienePermisos){
    document.getElementById("btn-admin-acces").classList.add("active-admin");
}