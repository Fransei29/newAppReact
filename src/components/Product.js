// src/components/Product.js
const Product = ({ product, addToCart }) => (
    <div className="ali">
      <img src={`./img/${product.imagen}`} alt={product.nombre} />
      <h3>{product.nombre}</h3>
      <p>Precio: ${product.precio}</p>
      <button className="buttonplace" onClick={() => addToCart(product)}>Agregar al carrito</button>
    </div>
);

export default Product;
