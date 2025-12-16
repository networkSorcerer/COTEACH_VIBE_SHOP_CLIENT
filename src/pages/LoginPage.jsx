import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail } from "../features/user/userSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, loginError} = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors());
    }
  }, [navigate]);

  const handleLoginWithEmail = (event) => {
    event.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  if (user) {
    navigate("/");
  }

  return (
    <div className="page">
      <div className="card">
        <div className="brand-row">
          <div className="logo-circle">NIKE</div>
          <div className="logo-circle">JORDAN</div>
        </div>

        <h2 className="auth-title">로그인</h2>
        <p className="auth-sub">나이키 멤버로 쇼핑을 시작하세요</p>

        <form className="auth-form" onSubmit={handleLoginWithEmail}>
          <label className="field">
            <span>이메일</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="field">
            <span>비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {status.error && <div className="alert error">{status.error}</div>}

          <button className="primary" disabled={status.loading}>
            {status.loading ? "로그인 중..." : "로그인"}
          </button>

          <div className="actions">
            <Link to="/signup">
              <button type="button" className="ghost">
                회원가입
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
