import { Link } from "react-router-dom";

function HomeNavbar({ user, isAdmin }) {
  console.log("isAdmin??????:::::",isAdmin)
  console.log("user??????:::::",user)
  return (
    <header className="navbar sticky">
      <div className="navbar-inner">
        <div className="brand">
          <span className="swoosh">NIKE</span>
        </div>

        <nav className="nav-links">
          <a href="#">New</a>
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
        </nav>

        <div className="nav-actions">
        {isAdmin && (
  <Link to="/admin">
    <button className="ghost small">admin</button>
  </Link>
)}


          {!user ? (
            <>
              <Link to="/login">
                <button className="ghost small">로그인</button>
              </Link>
              <Link to="/signup">
                <button className="primary small">회원가입</button>
              </Link>
            </>
          ) : (
            <div className="greeting-badge">{user.name}</div>
          )}
        </div>
      </div>
    </header>
  );
}

export default HomeNavbar;

