// src/App.js
import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import useCart from "./components/CartLogic";
// import Auth from "./components/Auth";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, totalPrice, addToCart, handlePurchase } = useCart();

  useEffect(() => {
    fetch("/products.json")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar los productos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Ruta">
      <h1>Tienda</h1>
      {loading ? <p>Cargando productos...</p> : <ProductList products={products} addToCart={addToCart} />}
      <Cart cart={cart} totalPrice={totalPrice} />
      <button id="comprar-btn" onClick={handlePurchase}>Comprar</button>
    </div>
  );
};

export default App;
