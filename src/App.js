import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import useCart from "./components/CartLogic";
import ReactDOM from "react-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const { cart, totalPrice, addToCart, handlePurchase } = useCart();

  useEffect(() => {
    fetch("/products.json")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error("Error al cargar los productos:", error);
      });
  }, []);

  useEffect(() => {
    // Renderiza los formularios en los contenedores adecuados
    ReactDOM.render(<RegisterForm />, document.getElementById("registerFormContainer"));
    ReactDOM.render(<LoginForm />, document.getElementById("loginFormContainer"));
  }, []);

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
