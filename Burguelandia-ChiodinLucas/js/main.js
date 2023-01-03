// PRODUCTOS
const API_URL = '../productos.json' 
const productos = [
    {
        id: "Tijuana",
        titulo: "Tijuana",
        imagen: "./img/hamburguesa1.png",
        categoria: {
            nombre: "Hamburguesa",
            id: "hamburguesa"
        },
        precio: 750
    },
    {
        id: "Criolla",
        titulo: "Criolla",
        imagen: "./img/hamburguesa2.png",
        categoria: {
            nombre: "Hamburguesa",
            id: "hamburguesa"
        },
        precio: 800
    },
    {
        id: "Roquefeller",
        titulo: "Roquefeller",
        imagen: "./img/hamburguesa3.png",
        categoria: {
            nombre: "Hamburguesa",
            id: "hamburguesa"
        },
        precio: 900
    },
    {
        id: "Rockstar",
        titulo: "Rockstar",
        imagen: "./img/hamburguesa4.png",
        categoria: {
            nombre: "Hamburguesa",
            id: "hamburguesa"
        },
        precio: 1000
    },
    {
        id: "Coca-Cola",
        titulo: "Coca-Cola",
        imagen: "./img/coca.png",
        categoria: {
            nombre: "Bebida",
            id: "bebida"
        },
        precio: 500
    },
    {
        id: "Fanta",
        titulo: "Fanta",
        imagen: "./img/fanta.png",
        categoria: {
            nombre: "Bebida",
            id: "bebida"
        },
        precio: 500
    },
    {
        id: "Sprite",
        titulo: "Sprite",
        imagen: "./img/sprite.png",
        categoria: {
            nombre: "Bebida",
            id: "bebida"
        },
        precio: 500
    },
    {
        id: "Paso los Toros",
        titulo: "Paso los Toros",
        imagen: "./img/pasotoros.png",
        categoria: {
            nombre: "Bebida",
            id: "bebida"
        },
        precio: 500
    },
    {
        id: "Papas",
        titulo: "Papas",
        imagen: "./img/papas1.png",
        categoria: {
            nombre: "Papas",
            id: "papas"
        },
        precio: 400
    },
    {
        id: "Papas c/ cheddar",
        titulo: "Papas c/ cheddar",
        imagen: "./img/papas2.png",
        categoria: {
            nombre: "Papas",
            id: "papas"
        },
        precio: 600
    },
    {
        id: "Papas Rusticas",
        titulo: "Papas Rusticas",
        imagen: "./img/papas3.png",
        categoria: {
            nombre: "Papas",
            id: "papas"
        },
        precio: 500
    },
    {
        id: "Papas c/ salsa",
        titulo: "Papas con Salsa",
        imagen: "./img/papas4.png",
        categoria: {
            nombre: "Papas",
            id: "papas"
        },
        precio: 800
    }
];


async function obtenerInfoProductos(){
    try{
        const response = await fetch (API_URL)
        const data = await response.json()

            if (data.length > 0){
                productos.push(...data)
                cargarProductos(productos)
                   
            }

    } catch (error) {
        console.log(error)
    }
}
    
obtenerInfoProductos()


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML =  ` 
        <div class="carta card m-5 p-5 border-warning">
        <img src="${producto.imagen}" class="producto-imagen card-img-top" alt="${producto.titulo}">
        <div class="card-body">
        <h5 class="producto-titulo card-title">${producto.titulo}</h5>
        <div class="producto-precio card-footer-precio">
            <big class="producto-precio text">$${producto.precio}</big>
          </div>
          <a class="producto-agregar btn btn-dark" id="${producto.id}" role="button">Agregar al carrito</a>
        </div>
        </div>
        </div>
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}