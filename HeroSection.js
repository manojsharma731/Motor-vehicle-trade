import React from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className="hero-section d-flex align-items-center text-center text-white">
      {/* Background video */}
      <video className="background-video" autoPlay loop muted>
        <source src="../car.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container>
        <h1>Welcome to Motor Vehicle Trade & Inventory System</h1>
        <p>Manage your vehicle trade, sales, and inventory with ease and efficiency.</p>
        <Button variant="success" size="lg" className="me-3">Get Started</Button>
        <Button variant="outline-light" size="lg">Learn More</Button>
      </Container>
    </div>
  );
}

export default HeroSection;