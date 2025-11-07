import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view profile');
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }
      
      console.log('Loading profile with token:', token.substring(0, 20) + '...');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      
      console.log('Profile response:', response.data);
      
      if (response.data && response.data.user) {
        // Ensure all fields have default values
        const userData = {
          ...response.data.user,
          name: response.data.user.name || 'User',
          email: response.data.user.email || '',
          phone: response.data.user.phone || '',
          city: response.data.user.city || '',
          country: response.data.user.country || '',
          createdAt: response.data.user.createdAt || new Date()
        };
        setUser(userData);
        setError(null);
      } else {
        setError('No user data received from server');
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else if (err.response?.status === 404) {
        setError('Profile not found. The user may not exist. Please try logging in again.');
      } else if (err.code === 'ERR_NETWORK' || err.message.includes('Network')) {
        setError('Cannot connect to server. Please make sure the backend server is running on port 5000.');
      } else {
        setError('Failed to load profile: ' + (err.response?.data?.msg || err.message || 'Unknown error'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p>No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
        </div>
        <h1>{user.name || 'User'}</h1>
        <p className="profile-email">{user.email || 'No email'}</p>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Account Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{user.name || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email Address</span>
              <span className="info-value">{user.email || 'Not provided'}</span>
            </div>
            {user.createdAt && (
              <div className="info-item">
                <span className="info-label">Member Since</span>
                <span className="info-value">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>Contact Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Phone Number</span>
              <span className="info-value">{user.phone || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">City</span>
              <span className="info-value">{user.city || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Country</span>
              <span className="info-value">{user.country || 'Not provided'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
