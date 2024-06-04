// src/App.js
import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const initialProducts = [
  { id: 1, nombre: "Zapatilla", precio: 50, imagen: "zapatilla.jpg" },
  { id: 2, nombre: "Ojota", precio: 20, imagen: "ojota.jpg" },
  { id: 3, nombre: "Pantalon", precio: 30, imagen: "pantalones_1203-8308.jpg" },
  { id: 4, nombre: "Remera", precio: 30, imagen: "remera.jpg" },
  { id: 5, nombre: "Campera", precio: 50, imagen: "campera.jpg" },
  { id: 6, nombre: "Lentes", precio: 40, imagen: "lentes.jpg" }
];

const App = () => {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      const parsedCart = JSON.parse(carritoGuardado);
      setCart(parsedCart);
      updateTotalPrice(parsedCart);
    }
  }, []);

  const addToCart = (product) => {
    const productoExistente = cart.find(p => p.id === product.id);
    let newCart;
    if (productoExistente) {
      newCart = cart.map(p => p.id === product.id ? { ...p, cantidad: p.cantidad + 1 } : p);
    } else {
      newCart = [...cart, { ...product, cantidad: 1 }];
    }
    setCart(newCart);
    updateTotalPrice(newCart);
    localStorage.setItem("carrito", JSON.stringify(newCart));
  };

  const updateTotalPrice = (cart) => {
    const total = cart.reduce((sum, product) => sum + product.precio * product.cantidad, 0);
    setTotalPrice(total);
  };

  const handlePurchase = () => {
    console.log("Usted ha comprado: ", cart);
    alert("¡Compra realizada! Revisa la consola para ver los detalles.");
    setCart([]);
    localStorage.removeItem("carrito");
    setTotalPrice(0);
  };

  return (
    <div>
      <h1>Tienda</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} totalPrice={totalPrice} />
      <button id="comprar-btn" onClick={handlePurchase}>Comprar</button>
    </div>
  );
};

export default App;
