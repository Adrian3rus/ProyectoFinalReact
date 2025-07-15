import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CartContext';
import './Header.css'; // Importá el CSS actualizado
import logo from './img/Logo.png';


const Header = () => {
  const { carrito } = useContext(CartContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const [prevItems, setPrevItems] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [expanded, setExpanded] = useState(false); // Control manual del navbar

  // Animación del carrito cuando aumentan ítems
  useEffect(() => {
    if (prevItems === 0) {
      setPrevItems(totalItems);
      return;
    }

    if (totalItems > prevItems) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 500);
    }
    setPrevItems(totalItems);
  }, [totalItems]);

  // Sombra al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.sticky-navbar');
      if (window.scrollY > 10) {
        nav.classList.add('navbar-shadow');
      } else {
        nav.classList.remove('navbar-shadow');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="mb-4 sticky-navbar"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-top me-2 img-fluid"
            style={{ maxHeight: '60px' }}
          />
          <span>Ultimate Games</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/Productos" onClick={() => setExpanded(false)}>
              Productos nuevos
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center">
            <Button
              variant="outline-light"
              as={Link}
              to="/login"
              className="me-auto"
              onClick={() => setExpanded(false)}
            >
              Administración
            </Button>

            <Link
              to="/carrito"
              className="text-white position-relative d-inline-block"
              aria-label="Ver carrito"
              role="button"
              onClick={() => setExpanded(false)}
            >
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {totalItems > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className={`cart-badge ${isBouncing ? 'animate-bounce' : ''}`}
                >
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
