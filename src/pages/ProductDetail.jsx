import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Dropdown, Button, Alert } from "react-bootstrap";
import { getProductDetail } from "../features/product/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import "./productDetail.style.css"; // CSS 파일 임포트

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, error } = useSelector((state) => state.product);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (cartSuccess) {
      const timer = setTimeout(() => setCartSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [cartSuccess]);

  const handleQtyChange = (num) => {
    const newQty = qty + num;
    if (newQty < 1) return;
    setQty(newQty);
  };

  const addItemToCart = () => {
    if (selectedSize === "") {
      setSizeError(true);
      return;
    }
    dispatch(addToCart({ id, size: selectedSize, qty }));
    setCartSuccess(true);
  };

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }
  if (!selectedProduct) {
    return <div>Loading product details...</div>;
  }

  const totalStock = selectedProduct.stock ? Object.values(selectedProduct.stock).reduce((total, num) => total + num, 0) : 0;

  return (
    <Container className="product-detail-container">
      <Row>
        <Col md={6}>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="product-detail-image"
          />
        </Col>
        <Col md={6} className="product-detail-info">
          <p className="product-category">
            {selectedProduct.category.map((c) => `#${c} `)}
          </p>
          <h1 className="product-name">{selectedProduct.name}</h1>
          <p className="product-description">{selectedProduct.description}</p>
          <p className="product-price">₩ {selectedProduct.price.toLocaleString()}</p>

          <div className="product-options">
            {sizeError && (
              <Alert variant="danger">Please select a size.</Alert>
            )}
            {cartSuccess && (
              <Alert variant="success">Item added to cart!</Alert>
            )}
            <Dropdown onSelect={(size) => {
                setSelectedSize(size);
                setSizeError(false);
            }}>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                {selectedSize === "" ? "사이즈 선택" : selectedSize.toUpperCase()}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(selectedProduct.stock).map((size) => (
                  <Dropdown.Item
                    key={size}
                    eventKey={size}
                    disabled={selectedProduct.stock[size] === 0}
                  >
                    {size.toUpperCase()} ({selectedProduct.stock[size]} left)
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <div className="qty-selector mt-3">
              <Button variant="outline-secondary" onClick={() => handleQtyChange(-1)}>-</Button>
              <span className="mx-3">{qty}</span>
              <Button variant="outline-secondary" onClick={() => handleQtyChange(1)}>+</Button>
            </div>

            <Button
              variant="dark"
              className="add-to-cart-button mt-4"
              onClick={addItemToCart}
              disabled={totalStock === 0}
            >
              {totalStock > 0 ? "장바구니" : "재고 없음"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
