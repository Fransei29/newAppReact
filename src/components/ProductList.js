import React from "react";
import Product from "./Product";
import { Carousel } from "react-bootstrap";
import "../index.css"; // Asegúrate de tener este archivo CSS para los estilos personalizados

const ProductList = ({ products, addToCart }) => {
  const groupedProducts = [];
  for (let i = 0; i < products.length; i += 5) {
    groupedProducts.push(products.slice(i, i + 5));
  }

  return (
    <div id="productos-container">
      <Carousel>
        {groupedProducts.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="product-group">
              {group.map((product) => (
                <div key={product.id} className="product">
                  <Product product={product} addToCart={addToCart} />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductList;
