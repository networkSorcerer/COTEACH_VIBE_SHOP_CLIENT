import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";
import "../../../components/product/productCard.style.css";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="product-card" onClick={() => showProduct(item._id)}>
      <img src={item?.image} alt={item?.image} className="product-image" />
      <div className="product-info">
        <p className="product-category">
          {item.category?.map((c) => `#${c} `)}
        </p>
        <h3 className="product-name">{item?.name}</h3>
        <p className="product-price">₩ {currencyFormat(item?.price)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
