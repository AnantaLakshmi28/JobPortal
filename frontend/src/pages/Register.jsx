import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all required fields (Name, Email, Password)');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-image-section">
        <div className="register-image-placeholder">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="#E3F2FD"/>
            <circle cx="200" cy="150" r="50" fill="#2196F3" opacity="0.3"/>
            <rect x="100" y="220" width="200" height="80" rx="10" fill="#2196F3" opacity="0.2"/>
            <rect x="120" y="240" width="160" height="15" rx="5" fill="#2196F3"/>
            <rect x="120" y="265" width="120" height="15" rx="5" fill="#2196F3" opacity="0.6"/>
            <rect x="120" y="290" width="100" height="15" rx="5" fill="#2196F3" opacity="0.4"/>
            <path d="M150 120 L200 100 L250 120 L250 140 L200 160 L150 140 Z" fill="#2196F3" opacity="0.5"/>
            <circle cx="200" cy="130" r="20" fill="#2196F3"/>
          </svg>
          <h3>Find Your Dream Job</h3>
          <p>Join thousands of professionals and discover amazing opportunities</p>
        </div>
      </div>
      <div className="register-form-section">
        <div className="register-card">
          <h2>Create Account</h2>
          <p className="register-subtitle">Sign up to start posting and finding jobs</p>
          <form onSubmit={handleRegister} className="register-form">
            <div className="form-group">
              <label>Full Name *</label>
              <input 
                name="name"
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
                className="input" 
                type="text"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input 
                name="email"
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
                className="input" 
                type="email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input 
                name="password"
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Create a password (min 6 characters)" 
                type="password" 
                className="input" 
                required
                minLength="6"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                name="phone"
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Enter your phone number" 
                className="input" 
                type="tel"
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input 
                  name="city"
                  value={formData.city} 
                  onChange={handleChange} 
                  placeholder="Enter your city" 
                  className="input" 
                  type="text"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input 
                  name="country"
                  value={formData.country} 
                  onChange={handleChange} 
                  placeholder="Enter your country" 
                  className="input" 
                  type="text"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button 
              className="button register-button" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
