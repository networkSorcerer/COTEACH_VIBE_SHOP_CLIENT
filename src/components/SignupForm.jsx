import { useState } from "react";
import { Link } from "react-router-dom";

function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    tos: false,
    privacy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <form className="auth-form">
      <label className="field">
        <span>이름</span>
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>

      <label className="field">
        <span>이메일</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="field">
        <span>비밀번호</span>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>

      <label className="field">
        <span>비밀번호 확인</span>
        <input
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
      </label>

      <label className="checkbox">
        <input type="checkbox" name="tos" onChange={handleChange} />
        <span>이용약관 동의 (필수)</span>
      </label>

      <label className="checkbox">
        <input type="checkbox" name="privacy" onChange={handleChange} />
        <span>개인정보 처리방침 동의 (필수)</span>
      </label>

      <button className="primary">회원가입</button>

      <Link to="/login">
        <button type="button" className="ghost">
          로그인으로 돌아가기
        </button>
      </Link>
    </form>
  );
}

export default SignupForm;
