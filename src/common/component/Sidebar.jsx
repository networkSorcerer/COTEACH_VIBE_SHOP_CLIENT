import React, { useState } from "react";
import { Offcanvas, Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./style/common.style.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleSelectMenu = (url) => {
    setShow(false); // 모바일에서 메뉴 클릭 시 닫힘
    navigate(url);
  };

  const NavbarContent = () => {
    return (
      <div>
        <Link to="/">
          <img
            width={100}
            src="https://i.namu.wiki/i/7odiKOobwcRn3h5h_Qj63poBcBpLas3nOiDi1T2MpFPACvELiPckUz1sand2gAyOx9hQMn3IQ9HgH_cAtFsokg.svg"
            alt="nike-logo"
          />
        </Link>

        <div className="sidebar-item">Admin Account</div>

        <ul className="sidebar-area">
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu("/admin/product?page=1")}
          >
            product
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu("/admin/order?page=1")}
          >
            order
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      {/* PC 사이드바 */}
      <div className="sidebar-toggle">{NavbarContent()}</div>

      {/* 모바일 사이드바 */}
      <Navbar bg="light" expand={false} className="mobile-sidebar-toggle">
        <Container fluid>
          <img
            width={100}
            src="https://i.namu.wiki/i/7odiKOobwcRn3h5h_Qj63poBcBpLas3nOiDi1T2MpFPACvELiPckUz1sand2gAyOx9hQMn3IQ9HgH_cAtFsokg.svg"
            alt="nike-logo"
          />

          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={() => setShow(true)}
          />

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className="sidebar"
            show={show}
            onHide={() => setShow(false)} // ⭐ 핵심
          >
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>{NavbarContent()}</Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Sidebar;
