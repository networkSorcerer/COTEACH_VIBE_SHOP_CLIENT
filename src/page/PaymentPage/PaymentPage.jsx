import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import OrderReceipt from "./component/OrderReceipt";
import PaymentForm from "./component/PaymentForm";
import "./style/paymentPage.style.css";
import { cc_expires_format } from "../../utils/number";
import { createOrder } from "../../features/order/orderSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderNum } = useSelector((state) => state.order);
  const { cartList, totalPrice } = useSelector((state) => state.cart);

  const [cardValue, setCardValue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });

  const [firstLoading, setFirstLoading] = useState(true);

  // 1. 주문 성공 시 페이지 이동 (Redux State 감시)
  useEffect(() => {
    if (firstLoading) {
      setFirstLoading(false);
    } else {
      if (orderNum !== "") {
        navigate("/payment/success");
      }
    }
  }, [orderNum, navigate, firstLoading]);

  // 장바구니가 비어있으면 뒤로가기
  useEffect(() => {
    if (cartList.length === 0) {
      navigate("/cart");
    }
  }, [cartList, navigate]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === "expiry") {
      let newValue = cc_expires_format(value);
      setCardValue({ ...cardValue, [name]: newValue });
      return;
    }
    setCardValue({ ...cardValue, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  // 2. 포트원 결제 실행 함수
  const handleSubmit = (event) => {
    event.preventDefault();

    const { IMP } = window;
    if (!IMP) {
      alert("결제 모듈을 불러올 수 없습니다. 다시 시도해주세요.");
      return;
    }
    
    // 고객사 식별 코드 초기화
    IMP.init("imp46772407"); 

    // 결제 데이터 구성
    const data = {
      pg: "html5_inicis",           // PG사 선택 (예: KG이니시스)
      pay_method: "card",           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호 생성
      amount: totalPrice,           // 결제 금액
      name: "상품 결제",             // 주문명
      buyer_name: `${shipInfo.lastName}${shipInfo.firstName}`,
      buyer_tel: shipInfo.contact,
      buyer_addr: shipInfo.address,
      buyer_postcode: shipInfo.zip,
    };

    // 3. 결제 요청창 호출
    IMP.request_pay(data, (response) => {
      if (response.success) {
        // 결제 성공 시 -> 서버에 오더 생성 요청
        const { firstName, lastName, contact, address, city, zip } = shipInfo;
        dispatch(
          createOrder({
            totalPrice,
            shipTo: { address, city, zip },
            contact: { firstName, lastName, contact },
            orderList: cartList.map((item) => ({
              productId: item.productId._id,
              price: item.productId.price,
              qty: item.qty,
              size: item.size,
            })),
          })
        );
      } else {
        // 결제 실패 시
        alert(`결제에 실패하였습니다. 에러 내용: ${response.error_msg}`);
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col lg={7}>
          <div>
            <h2 className="mb-2">배송 주소</h2>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label>성</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="lastName"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="firstName"
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>연락처</Form.Label>
                  <Form.Control
                    placeholder="010-xxx-xxxxx"
                    onChange={handleFormChange}
                    required
                    name="contact"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>주소</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    onChange={handleFormChange}
                    required
                    name="address"
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required
                      name="city"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required
                      name="zip"
                    />
                  </Form.Group>
                </Row>
                <div className="mobile-receipt-area">
                  <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
                </div>
                <div>
                  <h2 className="payment-title">결제 정보</h2>
                  <PaymentForm
                    cardValue={cardValue}
                    handleInputFocus={handleInputFocus}
                    handlePaymentInfoChange={handlePaymentInfoChange}
                  />
                </div>

                <Button
                  variant="dark"
                  className="payment-button pay-button"
                  type="submit"
                >
                  결제하기
                </Button>
              </Form>
            </div>
          </div>
        </Col>
        <Col lg={5} className="receipt-area">
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;