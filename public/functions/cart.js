// Definición de la CLASE Producto
// Esta clase representa un producto en la tienda con su id, nombre, precio e imagen.
class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

// Lista de productos usando la nueva clase Producto
// Este array contiene la lista de productos disponibles en la tienda.
const productos = [
    new Producto(1, 'Zapatilla', 50, 'zapatilla'),
    new Producto(2, 'Ojota', 20, 'ojota'),
    new Producto(3, 'Pantalon', 30, 'pantalones_1203-8308.jpg'),
    new Producto(4, 'Remera', 30, 'remera'),
    new Producto(5, 'Campera', 50, 'campera'),
    new Producto(6, 'Lentes', 40, 'lentes')
];

// Variables globales
// Esta variable contiene el carrito de compras del usuario.
let cart = [];

// Funciones para manejar el carrito

// Agrega productos al carrito o incrementa su cantidad si ya está en el carrito.
function agregarAlCarrito(producto) {
    const productoExistente = cart.find(p => p.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        cart.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }
    actualizarLocalStorage();
    updateCart();
}

// Renderiza los productos en el contenedor HTML.
function agregarProductosAlHTML() {
    const contenedorProductos = document.getElementById('productos-container');
    productos.forEach((producto, index) => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('ali', `Art${index + 1}`);
        divProducto.innerHTML = `
            <img src="./img/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="buttonplace" id="addToCart${producto.id}">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(divProducto);
    });
}

function agregarEventosDeCarrito() {
    productos.forEach((producto) => {
        const boton = document.getElementById(`addToCart${producto.id}`);
        boton.addEventListener('click', () => agregarAlCarrito(producto));
    });
}

function updateCart() {
    const cartElement = document.getElementById('cartItems');
    cartElement.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.nombre} - Precio: $${product.precio * product.cantidad} - Cantidad: ${product.cantidad}`;
        cartElement.appendChild(listItem);
        totalPrice += product.precio * product.cantidad;
    });
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Total: $${totalPrice}`;
}

function actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(cart));
}

function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        cart = JSON.parse(carritoGuardado);
        updateCart();
    }
}

export {
    productos,
    cart,
    agregarAlCarrito,
    agregarProductosAlHTML,
    agregarEventosDeCarrito,
    updateCart,
    actualizarLocalStorage,
    cargarCarritoDeLocalStorage
};
