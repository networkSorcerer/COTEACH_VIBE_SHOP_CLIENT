import React from "react";
import "./ItemSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../../page/LandingPage/components/ProductCard";

const ItemSlider = ({ products, responsive }) => {
  return (
    // slider-wrapper로 감싸서 버튼이 들어갈 공간을 확보합니다.
    <div className="slider-wrapper">
      <Carousel
        responsive={responsive}
        infinite={true}
        containerClass="carousel-container"
        itemClass="product-slider-item"
        centerMode={false} // 버튼 겹침 방지를 위해 false 권장 (필요시 true 유지)
        draggable={true}
        swipeable={true}
      >
        {products.map((item, index) => (
          <ProductCard item={item} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default ItemSlider;