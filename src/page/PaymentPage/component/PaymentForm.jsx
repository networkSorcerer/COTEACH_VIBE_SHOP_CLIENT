import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const PaymentForm = ({
  handleInputFocus,
  cardValue,
  handlePaymentInfoChange,
}) => {
  return (
    <Row className="display-flex">
      {/* 카드가 렌더링될 자리 (나중에 대체 라이브러리 사용 시) */}
      <Col md={6} xs={12}>
        <div className="credit-card-display-placeholder">
          {/* 이곳에 카드 정보를 시각적으로 표시할 placeholder 또는 직접 구현 */}
          <div className="card-number-display">{cardValue.number || "#### #### #### ####"}</div>
          <div className="card-name-display">{cardValue.name || "YOUR NAME"}</div>
          <div className="card-expiry-display">{cardValue.expiry || "MM/YY"}</div>
        </div>
      </Col>
      <Col md={6} xs={12}>
        <div className="form-area">
          <Form.Control
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            maxLength={16}
            minLength={16}
            value={cardValue.number}
          />

          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            value={cardValue.name}
          />
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="expiry"
                placeholder="MM/DD"
                onChange={handlePaymentInfoChange}
                onFocus={handleInputFocus}
                required
                value={cardValue.expiry}
                maxLength={7}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="cvc"
                placeholder="CVC"
                onChange={handlePaymentInfoChange}
                onFocus={handleInputFocus}
                required
                maxLength={3}
                value={cardValue.cvc}
              />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default PaymentForm;
