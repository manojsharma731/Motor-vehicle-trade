import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from './DarkModeContext'; // Import the custom hook for dark mode
import './NavbarComponent.css'; // Import custom CSS file

function NavbarComponent({ isLoggedIn, setIsLoggedIn }) { // Accept props
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Access dark mode state and toggle function
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLoginLogoutToggle = () => {
    if (isLoggedIn) {
      // Handle logout
      alert("Are you sure want to Log-out");
      setIsLoggedIn(false); // Update login state
      localStorage.removeItem('isLoggedIn'); // Clear login status
      navigate('/'); // Redirect to home or desired page
    } else {
      navigate('/login'); // Navigate to login page
    }
  };

  return (
    <header className={`navbar ${isDarkMode ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Motor Trade System</Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/buy" className="nav-link">Buy Vehicles</Link>
          <Link to="/sell" className="nav-link">Sell Vehicles</Link>
          <span className="nav-link" onClick={handleLoginLogoutToggle} style={{ cursor: 'pointer' }}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </span>
          {!isLoggedIn && (
            <Link to="/signup" className="nav-link">Signup</Link>
          )}
          <Link to="/contact" className="nav-link">Contact Info</Link>
          <span className="nav-link dark-mode-toggle" onClick={toggleDarkMode} style={{ cursor: 'pointer' }}>
            {isDarkMode ? '🌞 Light Mode' : '🌜 Dark Mode'}
          </span>
        </nav>
      </div>
    </header>
  );
}

export default NavbarComponent;