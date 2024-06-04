// src/App.js
import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
// import Auth from "./components/Auth";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Obtener productos de la API simulada
    fetch("/products.json")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error al cargar los productos:", error));

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
    <div className="Ruta">
      <h1>Tienda</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} totalPrice={totalPrice} />
      <button id="comprar-btn" onClick={handlePurchase}>Comprar</button>
    </div>
  );
};

export default App;
