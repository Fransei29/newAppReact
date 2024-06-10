// src/components/Cart.js
import React from "react";

const Cart = ({ cart, totalPrice, handlePurchase }) => (
  <div className="ruta">
    <h2 className="titleCarro">Carrito de compras <i className="fa-solid fa-cart-shopping"></i></h2>
    <ul id="cartItems">
      {cart.map((item, index) => (
        <li key={index}>
          {item.nombre} - Cantidad: {item.cantidad}
        </li>
      ))}
    </ul>
    <p id="totalPrice">Total: ${totalPrice}</p>
    {/* <button id="comprar-btn" onClick={handlePurchase}>Comprar</button> */}
  </div>
);

export default Cart;
