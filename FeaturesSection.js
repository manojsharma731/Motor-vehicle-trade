import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FeaturesSection.css'; // Create a CSS file for FeaturesSection if you want additional styling
import {  useNavigate } from 'react-router-dom';
function FeaturesSection() {
  const navigate = useNavigate();
  function goTo(){
    navigate('/profile');
  }
  function goTobuy(){
    navigate('/buy');
  }
  return (
    <div className="features-section py-5">
      <Container>
        <h2 className="text-center mb-4">Key Features</h2>
        <Row className="text-center">
          <Col md={4}>
        
            <button className="feature-box" onClick={goTobuy} >
              <h3>Buy & Sell Vehicles</h3>
              <p>Easily list, buy, and sell vehicles with detailed insights and analytics.</p>
            </button>
          </Col>
          <Col md={4}>
            <button className="feature-box" onClick={goTo}>
              <h3>Inventory Management</h3>
              <p>Keep track of stock levels, vehicle status, and pricing with an intuitive interface.</p>
            </button>
          </Col>
          <Col md={4}>
            <button className="feature-box">
              <h3>Sales Analytics</h3>
              <p>Analyze sales data and trends to make informed business decisions.</p>
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FeaturesSection;
