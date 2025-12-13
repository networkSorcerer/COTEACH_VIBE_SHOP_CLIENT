import SignupForm from "../components/SignupForm.jsx";

function SignupPage() {
  return (
    <div className="page signup-page">
      <div className="card signup-card">
        <header className="signup-header">
          <h2>회원가입</h2>
          <p>새로운 계정을 만들어 쇼핑을 시작하세요</p>
        </header>
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;

