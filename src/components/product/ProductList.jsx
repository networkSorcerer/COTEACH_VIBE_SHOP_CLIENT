import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { getProductList } from "../../features/product/productSlice";
import ProductCard from "./ProductCard";
import "./productList.style.css"; // CSS 파일 임포트

const ProductList = () => {
  const dispatch = useDispatch();
  const { productList, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductList({
        name: null,
        category: null
    }));
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">신상품</h2>
      <Row>
        {productList && productList.length > 0 ? (
          productList.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col>No products found.</Col>
        )}
      </Row>
    </div>
  );
};

export default ProductList;

