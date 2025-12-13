import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.js";

const STEPS = {
  EMAIL: "email",
  CONSENT: "consent",
  PASSWORD: "password",
};

function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consents, setConsents] = useState({
    all: false,
    tos: false,
    privacy: false,
    thirdParty: false,
  });
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const requiredConsentsChecked = useMemo(
    () => consents.tos && consents.privacy && consents.thirdParty,
    [consents]
  );

  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
      setConsents({
        all: checked,
        tos: checked,
        privacy: checked,
        thirdParty: checked,
      });
    } else {
      const next = { ...consents, [name]: checked };
      const allChecked = next.tos && next.privacy && next.thirdParty;
      setConsents({ ...next, all: allChecked });
    }
  };

  const goNextFromEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus({ loading: false, error: "", success: "" });
    setStep(STEPS.CONSENT);
  };

  const goNextFromConsent = (e) => {
    e.preventDefault();
    if (!requiredConsentsChecked) {
      setStatus({ loading: false, error: "필수 약관에 동의해주세요.", success: "" });
      return;
    }
    setStatus({ loading: false, error: "", success: "" });
    setStep(STEPS.PASSWORD);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setStatus({ loading: false, error: "이메일과 비밀번호를 입력해주세요.", success: "" });
    }
    try {
      setStatus({ loading: true, error: "", success: "" });
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      setStatus({ loading: false, error: "", success: "로그인되었습니다." });
      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: "" });
    }
  };

  return (
    <div className="page login-page">
      <div className="card login-card">
        <div className="brand-row">
          <div className="logo-circle">NIKE</div>
          <div className="logo-circle">JORDAN</div>
        </div>

        {step === STEPS.EMAIL && (
          <form className="login-form" onSubmit={goNextFromEmail}>
            <h2 className="login-title">가입 또는 로그인을 위해 이메일을 입력하세요.</h2>
            <div className="country-row">
              <span>대한민국</span>
              <button type="button" className="link-button" disabled>
                변경
              </button>
            </div>
            <label className="field">
              <span>이메일*</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </label>
            <p className="login-caption">
              계속 진행하면 나이키의{" "}
              <a className="text-link" href="#">
                개인정보 처리방침
              </a>{" "}
              및{" "}
              <a className="text-link" href="#">
                이용약관
              </a>
              에 동의하게 됩니다.
            </p>
            <div className="login-actions">
              <Link to="/">
                <button type="button" className="ghost">
                  취소
                </button>
              </Link>
              <button type="submit" className="primary">
                계속
              </button>
            </div>
          </form>
        )}

        {step === STEPS.CONSENT && (
          <form className="login-form" onSubmit={goNextFromConsent}>
            <h2 className="login-title">계속 진행하시려면 아래 권한에 동의해주세요.</h2>
            <p className="login-sub">
              나이키에 오신 것을 환영합니다! 법률 약관이 업데이트되었습니다. 진행하시기 전에 내용을 검토하고
              동의해 주세요.
            </p>

            <div className="consent-list">
              <label className="checkbox consent-all">
                <input
                  type="checkbox"
                  name="all"
                  checked={consents.all}
                  onChange={handleConsentChange}
                />
                <span>모든 약관에 동의합니다</span>
              </label>
              <hr />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="tos"
                  checked={consents.tos}
                  onChange={handleConsentChange}
                />
                <span>이용약관에 동의합니다 *</span>
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={consents.privacy}
                  onChange={handleConsentChange}
                />
                <span>개인 정보 수집 및 이용에 동의합니다 *</span>
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="thirdParty"
                  checked={consents.thirdParty}
                  onChange={handleConsentChange}
                />
                <span>개인 정보의 제3자 제공 및 국외 이전에 동의합니다 *</span>
              </label>
            </div>

            {!requiredConsentsChecked && (
              <p className="login-caption muted">
                이 약관에 동의하지 않으면 로그인/회원가입이 제한될 수 있습니다.
              </p>
            )}

            {status.error && <div className="alert error">{status.error}</div>}

            <div className="login-actions">
              <button type="button" className="ghost" onClick={() => setStep(STEPS.EMAIL)}>
                취소
              </button>
              <button type="submit" className="primary">
                계속
              </button>
            </div>
          </form>
        )}

        {step === STEPS.PASSWORD && (
          <form className="login-form" onSubmit={handleLogin}>
            <h2 className="login-title">비밀번호를 입력하세요.</h2>
            <p className="login-sub email-sub">
              {email}{" "}
              <button type="button" className="link-button" onClick={() => setStep(STEPS.EMAIL)}>
                편집
              </button>
            </p>

            <label className="field">
              <span>비밀번호*</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
                minLength={8}
              />
            </label>

            {status.error && <div className="alert error">{status.error}</div>}
            {status.success && <div className="alert success">{status.success}</div>}

            <div className="login-actions">
              <button type="button" className="ghost" onClick={() => setStep(STEPS.CONSENT)}>
                뒤로
              </button>
              <button type="submit" className="primary" disabled={status.loading}>
                {status.loading ? "로그인 중..." : "로그인"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;

