import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../api/auth.js";

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe()
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          // 토큰이 유효하지 않으면 무시
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className="page page-home">
      {user && (
        <div className="user-greeting" ref={dropdownRef}>
          <button
            className="user-greeting-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.name}님 반갑습니다
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      )}
      <div className="card hero">
        <h1>쇼핑몰 메인</h1>
        <p>새 계정을 만들어 쇼핑을 시작하세요.</p>
        <div className="home-actions">
          <Link to="/signup">
            <button className="primary">회원가입</button>
          </Link>
          {!user && (
            <Link to="/login">
              <button className="ghost">로그인</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

