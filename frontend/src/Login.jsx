// Filename: Login.jsx (No changes needed)
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: '',
  });
  
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const { emailOrMobile, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      // This URL now points to your new, combined logic endpoint
      const backendUrl = 'http://localhost:5000/api/login'; 
      const response = await axios.post(backendUrl, formData);
      
      // On first login, the backend sends success: true
      if (response.data.success) {
        setMessage(response.data.msg); // Will show "Welcome! Account created successfully!"
        setIsError(false);
        
        setTimeout(() => {
          navigate('/home'); 
        }, 1500);
      }
      
    } catch (err) {
      // On second login, the backend sends a 400 error, which is caught here.
      // The message will be "User with this email/mobile already exists"
      setMessage(err.response?.data?.msg || 'An error occurred. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="login-box">
          <h1 className="logo-font">Instagram</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="emailOrMobile"
              placeholder="Phone number, username or email address"
              value={emailOrMobile}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />

            {message && (
                <p className={`form-message ${isError ? 'error' : 'success'}`}>
                    {message}
                </p>
            )}

            <button type="submit" className="login-btn">
              Log in
            </button>
          </form>

          <div className="divider">
            <div className="line"></div>
            <div className="or-text">OR</div>
            <div className="line"></div>
          </div>

          <button className="facebook-login">
            Log in with Facebook
          </button>

          <a href="#" className="forgot-password-link">
            Forgotten your password?
          </a>
        </div>

        <div className="signup-prompt-box">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;