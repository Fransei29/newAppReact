//              --- >>> CREACION CARRITO DE COMPRAS <<< --- 

// Definición de la CLASE Producto
class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

//  --- FUNCIONES ---
// Agrega productos al carrito o incrementa su cantidad
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
        boton.addEventListener('click', () => agregarAlCarrito(producto));
    });
}

// Actualiza el carrito en el DOM
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



// Inicialización del programa
// Lista de productos usando la nueva clase Producto
const productos = [
    new Producto(1, 'Zapatilla', 50, 'zapatilla'),
    new Producto(2, 'Ojota', 20, 'ojota'),
    new Producto(3, 'Pantalon', 30, 'pantalones_1203-8308.jpg'),
    new Producto(4, 'Remera', 30, 'remera'),
    new Producto(5, 'Campera', 50, 'campera'),
    new Producto(6, 'Lentes', 40, 'lentes')
];

// Variables y funciones globales
let cart = [];

// Inicialización del DOM y programa
document.addEventListener('DOMContentLoaded', function() {
    cargarCarritoDeLocalStorage();
    agregarProductosAlHTML();
    agregarEventosDeCarrito();
    document.getElementById('comprar-btn').addEventListener('click', async function() {
        console.log('Usted ha comprado: ', cart);

        try {
            const response = await fetch('/comprar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart })
            });

            if (response.ok) {
                alert('¡Compra realizada! Revisa la consola para ver los detalles.');
                cart = [];
                actualizarLocalStorage();
                updateCart();
            } else {
                alert('Hubo un problema al procesar la compra.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al conectarse con el servidor.');
        }
    });
});

// --------------------- Formulario de Registro

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Guardar el usuario en local storage
    localStorage.setItem(username, JSON.stringify({password: password}));
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
  
    alert('Usuario registrado con éxito!');
});

// --------------------- Formulario de Inicio de Sesion

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Verificar usuario y contraseña
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
        alert('Inicio de sesión exitoso!');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
         // Muestra un mensaje de bienvenida o cambia el contenido
        const welcomeMsg = document.getElementById('welcomeMessage');
        welcomeMsg.style.display = 'block';  // Muestra el mensaje
        welcomeMsg.textContent = 'Bienvenido, ' + username + '!';
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});