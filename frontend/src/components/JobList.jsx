import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function JobList({ refreshTrigger }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view jobs');
        setJobs([]);
        return;
      }
      
      console.log('Loading jobs with token:', token.substring(0, 20) + '...');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`, { 
        headers: { Authorization: 'Bearer ' + token } 
      });
      
      console.log('Jobs response:', response.data);
      
      if (response.data && Array.isArray(response.data.jobs)) {
        setJobs(response.data.jobs);
      } else {
        console.log('No jobs array found in response, setting empty array');
        setJobs([]);
      }
    } catch (err) {
      console.error('Error loading jobs:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please check if backend is running.');
      } else {
        setError('Failed to load jobs. Please check your connection.');
      }
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('JobList useEffect triggered, refreshTrigger:', refreshTrigger);
    loadJobs();
  }, [refreshTrigger]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="job-list-container">
        <h2>Posted Jobs</h2>
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-list-container">
        <h2>Posted Jobs</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="job-list-container">
      <h2>Posted Jobs</h2>
      {jobs.length === 0 ? (
        <div className="empty-state">
          <p>No jobs posted yet. Start by posting your first job!</p>
        </div>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="card">
            <h3>{job.title}</h3>
            <p className="job-description">{job.desc}</p>
            <div className="job-details">
              <p><span className="detail-label">Company:</span> <span className="detail-value">{job.company}</span></p>
              <p><span className="detail-label">Last Date for Application:</span> <span className="detail-value">{formatDate(job.lastDate)}</span></p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
