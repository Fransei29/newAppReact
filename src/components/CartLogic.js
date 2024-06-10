import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../index.css";

const useCart = () => {
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
    updateCart(newCart);
  };

  const updateCart = (newCart) => {
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
    Swal.fire({
      title: "Felicitaciones!",
      text: "El producto está en camino",
      icon: "success",
      confirmButtonText: "Ok",
      customClass: {
        container: "custom-swal"
      }
    });
    setCart([]);
    localStorage.removeItem("carrito");
    setTotalPrice(0);
  };

  return {
    cart,
    totalPrice,
    addToCart,
    handlePurchase
  };
};

export default useCart;
