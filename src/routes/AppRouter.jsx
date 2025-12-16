import React from "react";
import { Route, Routes } from "react-router";

// import CartPage from "../page/CartPage/CartPage";
// import MyPage from "../page/MyPage/MyPage";
// import OrderCompletePage from "../page/OrderCompletePage/OrderCompletePage";
// import PaymentPage from "../page/PaymentPage/PaymentPage";
// import ProductDetail from "../page/ProductDetailPage/ProductDetailPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProductPage from "../page/AdminProductPage/AdminProductPage";
import AdminOrderPage from "../page/AdminOrderPage/AdminOrderPage"
const AppRouter = () => {
  return (
    <Routes>
     <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/product/:id" element={<ProductDetail />} />
      <Route element={<PrivateRoute permissionLevel="customer" />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<OrderCompletePage />} />
        <Route path="/account/purchase" element={<MyPage />} />
      </Route> */}
      <Route element={<PrivateRoute permissionLevel="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />       
        <Route path="/admin/product" element={<AdminProductPage />} />
        <Route path="/admin/order" element={<AdminOrderPage />} /> 
      </Route>
    </Routes>
  );
};

export default AppRouter;

