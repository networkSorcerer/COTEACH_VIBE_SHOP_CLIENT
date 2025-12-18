import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import { getCartList } from "../../features/cart/cartSlice";
import ItemSlider from "../../components/ItemSlider/ItemSlider";

const LandingPage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product.productList);
  const loading = useSelector((state) => state.product.loading);
  const [query] = useSearchParams();
  const name = query.get("name");
  console.log("productList ++++++",productList)
  useEffect(() => {
    dispatch(
      getProductList({
        name,
      })
    );
    dispatch(getCartList());
  }, [query, dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  // if (!loading && productList.length === 0) {
  //   return (
  //     <div className="text-align-center empty-bag">
  //       {name === "" ? <h2></h2> : <h2>{name}과 일치한 상품이 없습니다!</h2>}
  //     </div>
  //   );
  // }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  

  return (
    <Container>
      <ItemSlider products={productList} responsive={responsive} />
    </Container>
  );
};

export default LandingPage;
