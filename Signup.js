import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');  // Add state for phone number
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    // Perform form validation
    if (!name || !phone || !email) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        phone,  // Send phone number in the request
        email,
      });
      setMessage(response.data.message);
      setName(''); // Clear the name field
      setPhone(''); // Clear the phone number field
      setEmail(''); // Clear the email field
    } catch (error) {
      console.error(error);
      setMessage('There was an error signing up.');
    }
  };

  return (
    <Container className="signup-container">
      <h2 className="text-center">Signup</h2>
      <Form onSubmit={handleSignup}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Customer full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhone" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="mt-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Signup
        </Button>
      </Form>
      {message && <div className="mt-3 text-center">{message}</div>}
    </Container>
  );
}

export default Signup;
