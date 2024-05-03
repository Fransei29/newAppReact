//              --- >>> CREACION CARRITO DE COMPRAS <<< --- 

const productos = [
    { id: 1, nombre: 'Zapatilla', precio: 50, imagen: 'zapatilla' },
    { id: 2, nombre: 'Ojota', precio: 20, imagen: 'ojota' },
    { id: 3, nombre: 'Pantalon', precio: 30, imagen: 'pantalones_1203-8308.jpg' },
    { id: 4, nombre: 'Remera', precio: 30, imagen: 'remera' },
    { id: 5, nombre: 'Campera', precio: 50, imagen: 'campera' },
    { id: 6, nombre: 'Lentes', precio: 40, imagen: 'lentes' }
];

// Carga inicial del DOM
document.addEventListener('DOMContentLoaded', function() {
    cargarCarritoDeLocalStorage();
    agregarProductosAlHTML();
    agregarEventosDeCarrito();
});

// Renderiza los productos en el HTML
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

// Agrega eventos a los botones de agregar al carrito
function agregarEventosDeCarrito() {
    productos.forEach((producto) => {
        const boton = document.getElementById(`addToCart${producto.id}`);
        boton.addEventListener('click', function() {
            addToCart(producto.id, producto.nombre, producto.precio);
        });
    });
}

let cart = [];

// Agrega productos al carrito o incrementa su cantidad
function addToCart(productId, productName, productPrice) {
    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.find(product => product.id === productId);
    if (existingProduct) {
        // Incrementar la cantidad si el producto ya existe
        existingProduct.quantity++;
    } else {
        // Agregar nuevo producto al carrito si no existe
        const product = { id: productId, name: productName, price: productPrice, quantity: 1 };
        cart.push(product);
    }
    actualizarLocalStorage();
    updateCart();
}
// Actualiza el carrito en el DOM
function updateCart() {
    const cartElement = document.getElementById('cartItems');
    cartElement.innerHTML = '';  // Limpiar el elemento para asegurar que se reflejan los cambios actuales
    let totalPrice = 0;

    cart.forEach(product => {
        // Crea un elemento de lista para cada producto
        const listItem = document.createElement('li');
        // El texto del elemento de lista incluye el nombre, el precio y la cantidad
        listItem.textContent = `${product.name} - Precio: $${product.price * product.quantity} - Cantidad: ${product.quantity} `;

        // Añade el elemento de lista al contenedor del carrito
        cartElement.appendChild(listItem);

        // Calcula el precio total multiplicando el precio por la cantidad y sumándolo al total
        totalPrice += product.price * product.quantity;
    });

    // Actualiza el elemento del precio total en el HTML
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Total: $${totalPrice}`;
}

// Guarda el carrito en localStorage
function actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(cart));
}

// Carga el carrito desde localStorage
function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        cart = JSON.parse(carritoGuardado);
        updateCart();
    }
}

// Agrega evento de clic al botón "Comprar"
document.getElementById('comprar-btn').addEventListener('click', function() {
    console.log('Usted ha comprado: ', cart);
    alert('¡Compra realizada! Revisa la consola para ver los detalles.');
    cart = [];
    actualizarLocalStorage();
    updateCart();
});