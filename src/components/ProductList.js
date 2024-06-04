// src/components/ProductList.js
import React from "react";
import Product from "./Product";

const ProductList = ({ products, addToCart }) => (
  <div id="productos-container">
    {products.map((product, index) => (
      <Product key={index} product={product} addToCart={addToCart} />
    ))}
  </div>
);

export default ProductList;
