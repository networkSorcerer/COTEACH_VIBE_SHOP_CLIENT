import React from "react";
import "./ItemSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../../page/LandingPage/components/ProductCard";

const ItemSlider = ({ products, responsive }) => {
  return (
    <div>
      {" "}
      <Carousel
        responsive={responsive}
        infinite={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        centerMode={true}
      >
        {products.map((item, index) => (
          <ProductCard item={item} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default ItemSlider;
