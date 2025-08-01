import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-4">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">Ultimate Games</p>
            <p className="mb-0">Practica React TP Final</p>
          </Col>
          <Col md={6}>
            <div>
              <a href="#" className="text-white me-3">
                <i className="fa fa-facebook fa-2x"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fa fa-instagram fa-2x"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};


export default Footer; 