import {
    productos,
    cart,
    agregarAlCarrito,
    agregarProductosAlHTML,
    agregarEventosDeCarrito,
    updateCart,
    actualizarLocalStorage,
    cargarCarritoDeLocalStorage
} from './cart.js';

document.addEventListener('DOMContentLoaded', function() {
    agregarProductosAlHTML();
    agregarEventosDeCarrito();

    document.getElementById('comprar-btn').addEventListener('click', async function() {
        try {
            const response = await fetch('/comprar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart })
            });

            if (response.ok) {
                alert('¡Compra realizada');
                cart.length = 0; // Limpiar el carrito
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
