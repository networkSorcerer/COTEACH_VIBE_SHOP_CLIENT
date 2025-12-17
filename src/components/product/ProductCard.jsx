import React from "react";
import { useNavigate } from "react-router-dom";
import "../product/productCard.style.css"; // CSS 파일 임포트

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const showProduct = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card" onClick={showProduct}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <p className="product-category">
          {product.category.map((c) => `#${c} `)}
        </p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₩ {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
