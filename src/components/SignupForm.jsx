import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../api/users.js";

function SignupForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    user_type: "customer",
    address: "",
    terms: {
      all: false,
      tos: false,
      privacy: false,
      marketing: false,
    },
  });
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const allRequiredChecked = useMemo(
    () => form.terms.tos && form.terms.privacy,
    [form.terms.tos, form.terms.privacy]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTermsChange = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
      setForm((prev) => ({
        ...prev,
        terms: { all: checked, tos: checked, privacy: checked, marketing: checked },
      }));
    } else {
      setForm((prev) => {
        const nextTerms = { ...prev.terms, [name]: checked };
        const all = nextTerms.tos && nextTerms.privacy && nextTerms.marketing;
        return { ...prev, terms: { ...nextTerms, all } };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, error: "", success: "" });

    if (!allRequiredChecked) {
      return setStatus({ loading: false, error: "필수 약관에 동의해주세요.", success: "" });
    }

    if (form.password !== form.confirmPassword) {
      return setStatus({ loading: false, error: "비밀번호가 일치하지 않습니다.", success: "" });
    }

    try {
      setStatus({ loading: true, error: "", success: "" });
      const payload = {
        email: form.email,
        name: form.name,
        password: form.password,
        user_type: form.user_type,
        address: form.address || undefined,
      };

      await createUser(payload);
      setStatus({ loading: false, error: "", success: "회원가입이 완료되었습니다." });
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        user_type: "customer",
        address: "",
        terms: { all: false, tos: false, privacy: false, marketing: false },
      });
      // 필요시 홈으로 이동
      // navigate("/");
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: "" });
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>이름</span>
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className="field">
        <span>이메일</span>
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className="field">
        <span>비밀번호</span>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={form.password}
          onChange={handleInputChange}
          required
          minLength={8}
        />
        <small>8자 이상, 영문, 숫자, 특수문자 포함</small>
      </label>

      <label className="field">
        <span>비밀번호 확인</span>
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호를 다시 입력하세요"
          value={form.confirmPassword}
          onChange={handleInputChange}
          required
          minLength={8}
        />
      </label>

      <label className="field">
        <span>주소 (선택)</span>
        <input
          name="address"
          placeholder="주소를 입력하세요"
          value={form.address}
          onChange={handleInputChange}
        />
      </label>

      <label className="field">
        <span>유저 타입</span>
        <select name="user_type" value={form.user_type} onChange={handleInputChange}>
          <option value="customer">customer</option>
          <option value="admin">admin</option>
        </select>
      </label>

      <div className="terms">
        <label className="checkbox">
          <input
            type="checkbox"
            name="all"
            checked={form.terms.all}
            onChange={handleTermsChange}
          />
          <span>전체 동의</span>
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            name="tos"
            checked={form.terms.tos}
            onChange={handleTermsChange}
            required
          />
          <span>이용약관 동의 (필수)</span>
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            name="privacy"
            checked={form.terms.privacy}
            onChange={handleTermsChange}
            required
          />
          <span>개인정보처리방침 동의 (필수)</span>
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            name="marketing"
            checked={form.terms.marketing}
            onChange={handleTermsChange}
          />
          <span>마케팅 정보 수신 동의 (선택)</span>
        </label>
      </div>

      {status.error && <div className="alert error">{status.error}</div>}
      {status.success && <div className="alert success">{status.success}</div>}

      <div className="actions">
        <Link to="/">
          <button type="button" className="ghost">
            돌아가기
          </button>
        </Link>
        <button type="submit" className="primary" disabled={status.loading}>
          {status.loading ? "가입 중..." : "회원가입"}
        </button>
      </div>
    </form>
  );
}

export default SignupForm;

