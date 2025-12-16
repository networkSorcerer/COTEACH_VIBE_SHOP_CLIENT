import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { loginWithToken } from "../features/user/userSlice";

const PrivateRoute = ({ permissionLevel }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  // 앱 시작 시 토큰으로 로그인 시도
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(loginWithToken()).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  // 로딩 중이면 아무것도 렌더링하지 않음
  if (loading) return null;

  // 권한 체크
  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
