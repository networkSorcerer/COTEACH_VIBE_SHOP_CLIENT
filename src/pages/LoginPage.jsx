import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import "../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus({ loading: true, error: "" });
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="brand-row">
          <div className="logo-circle">NIKE</div>
          <div className="logo-circle">JORDAN</div>
        </div>

        <h2 className="auth-title">로그인</h2>
        <p className="auth-sub">나이키 멤버로 쇼핑을 시작하세요</p>

        <form className="auth-form" onSubmit={handleSubmit}>
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
