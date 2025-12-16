import SignupForm from "../components/SignupForm";
import "../styles/auth.css";

function SignupPage() {
  return (
    <div className="page">
      <div className="card">
        <h2 className="auth-title">회원가입</h2>
        <p className="auth-sub">새로운 나이키 멤버가 되어보세요</p>
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
