import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');
    const [mathQuestion, setMathQuestion] = useState('');
    const [mathAnswer, setMathAnswer] = useState(0);
    const [userType, setUserType] = useState('customer');
    const navigate = useNavigate();

    const generateMathCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const operator = Math.random() < 0.5 ? '+' : '-';
        setMathQuestion(`${num1} ${operator} ${num2}`);
        setMathAnswer(operator === '+' ? num1 + num2 : num1 - num2);
    };

    useEffect(() => {
        generateMathCaptcha();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (parseInt(captchaValue) !== mathAnswer) {
            alert('Incorrect CAPTCHA answer. Please try again.');
            generateMathCaptcha();
            setCaptchaValue('');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                email,
                userType,
            });

            console.log('Login successful:', response.data);

             props.setIsLoggedIn(true); // Set logged in status

        if (response.data.userType === 'admin') {
            props.setUserType('admin');
            navigate('/profile', { state: { name: response.data.name, email: response.data.email } });
        } else if (response.data.userType === 'salesperson') {
            props.setUserType('salesperson');
            
            // Fetch customer orders after login
            const ordersResponse = await axios.post('http://localhost:5000/get-customer-orders', {
                salespersonId: response.data.id, // Assuming you return ID on login
            });

            // Store orders in state or context
            props.setCustomerOrders(ordersResponse.data); // Ensure you have this method to set orders

            navigate('/sales-dashboard'); // Redirect to sales dashboard
        } else if (response.data.userType === 'supplier') {
            props.setUserType('supplier');
            navigate('/supplier-dashboard');
        } else {
            props.setUserType('customer');
            navigate('/buy');
        }
        } catch (error) {
            console.error('Login error:', error);
            alert('There was an error logging in. Please check your credentials.');
        }
        props.setIsLoggedIn(true);
    };

    return (
        <div className="login-container">
            <h2 className="text-center">Login</h2>

            <div className="user-type-selection">
                <div className={`user-type ${userType === 'admin' ? 'selected' : ''}`} onClick={() => setUserType('admin')}>
                    Admin
                </div>
                <div className={`user-type ${userType === 'salesperson' ? 'selected' : ''}`} onClick={() => setUserType('salesperson')}>
                    Salesperson
                </div>
                <div className={`user-type ${userType === 'customer' ? 'selected' : ''}`} onClick={() => setUserType('customer')}>
                    Customer
                </div>
                <div className={`user-type ${userType === 'supplier' ? 'selected' : ''}`} onClick={() => setUserType('supplier')}>
                    Supplier
                </div>
            </div>

            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label className='lb'>{userType === 'customer' ? 'Customer Username' : userType === 'salesperson' ? 'Sales Username' : userType === 'supplier' ? 'Supplier Username' : 'Admin Username'}</label>
                    <input
                        type="text"
                        placeholder={userType === 'customer' ? 'Enter Customer Username' : userType === 'salesperson' ? 'Enter Sales Username' : userType === 'supplier' ? 'Enter Supplier Username' : 'Enter Admin Username'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='lb'>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='lb'>Solve: {mathQuestion}</label>
                    <input
                        type="text"
                        placeholder="Enter the answer"
                        value={captchaValue}
                        onChange={(e) => setCaptchaValue(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>

            <div className="footer-links">
                <a href="/forgot-password">Forgot Password?</a>
                <span> | </span>
                <a href="/signup">Create Account</a>
            </div>
        </div>
    );
}

export default Login;
