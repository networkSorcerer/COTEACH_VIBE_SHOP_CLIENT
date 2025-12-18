import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";

function HomeNavbar({ user, isAdmin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const goToCart = () => {
    navigate("/cart");
  };
  const goToOrder = () => {
    navigate("/account/purchase");
  };

  return (
    <header className="navbar sticky">
      <div className="navbar-inner">
        <div className="brand">
        <Link to="/">
        <img
  width={100}
  src="https://i.namu.wiki/i/7odiKOobwcRn3h5h_Qj63poBcBpLas3nOiDi1T2MpFPACvELiPckUz1sand2gAyOx9hQMn3IQ9HgH_cAtFsokg.svg"
  alt="nike-logo"
/>
        </Link>
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
            <Dropdown>
              <Dropdown.Toggle as="div" className="greeting-badge" id="dropdown-basic">
                {user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={goToCart}>장바구니</Dropdown.Item>
                <Dropdown.Item onClick={goToOrder}>주문내역</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
}

export default HomeNavbar;

