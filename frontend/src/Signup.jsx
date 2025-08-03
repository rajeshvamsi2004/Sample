// src/components/Signup.js

import React, { useState } from 'react';
import './Signup.css'; // Your existing CSS file
import { Link, useNavigate } from 'react-router-dom'; // useNavigate to redirect after success
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrMobile: '',
    fullName: '',
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const { emailOrMobile, fullName, username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setMessage('');
    setIsError(false);

    try {
      // The URL of your backend's signup endpoint
      const backendUrl = 'http://localhost:5000/api/signup';

      const response = await axios.post(backendUrl, formData);

      setMessage(response.data.msg); // "User registered successfully!"
      
      // Clear form and redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Set the error message from the backend response
      setMessage(err.response?.data?.msg || 'An error occurred. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="signup-box">
          <h1 className="logo-font">Instagram</h1>
          <p className="slogan">
            Sign up to see photos and videos from your friends.
          </p>

          <button className="facebook-btn">Log in with Facebook</button>

          <div className="divider">
            <div className="line"></div>
            <div className="or-text">OR</div>
            <div className="line"></div>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="emailOrMobile"
              placeholder="Mobile number or email address"
              value={emailOrMobile}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
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

            <div className="info-text-container">
              <p className="info-text">
                People who use our service may have uploaded your contact
                information to Instagram. <a href="#">Learn more</a>
              </p>
              <p className="info-text">
                By signing up, you agree to our <a href="#">Terms</a>,{' '}
                <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
              </p>
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
        </div>

        <div className="login-prompt-box">
          <p>
            Have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;