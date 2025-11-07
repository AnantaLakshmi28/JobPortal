import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function JobForm({ onJobAdded }) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when component mounts (after refresh)
  useEffect(() => {
    // Form will be empty on mount, which is correct
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const trimmedTitle = jobTitle.trim();
    const trimmedDesc = jobDesc.trim();
    const trimmedCompany = companyName.trim();
    
    if (!trimmedTitle || !trimmedDesc || !lastDate || !trimmedCompany) {
      alert('Please fill in all fields');
      return;
    }

    // Validate date is not in the past
    const selectedDate = new Date(lastDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert('Last date cannot be in the past');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to post jobs');
        window.location.href = '/login';
        return;
      }
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/jobs`, { 
        title: trimmedTitle, 
        desc: trimmedDesc, 
        lastDate: lastDate, 
        company: trimmedCompany 
      }, { 
        headers: { Authorization: 'Bearer ' + token } 
      });
      
      if (response.data && response.data.msg) {
        alert('Job posted successfully!');
        setJobTitle('');
        setJobDesc('');
        setLastDate('');
        setCompanyName('');
        // Ensure the refresh is triggered
        if (onJobAdded) {
          console.log('Triggering job list refresh...');
          onJobAdded();
        }
      } else {
        alert('Job posted but no confirmation received');
      }
    } catch (err) {
      console.error('Job post error:', err);
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (err.response?.status === 400) {
        alert(err.response.data?.msg || 'Invalid data. Please check all fields.');
      } else if (err.code === 'ERR_NETWORK') {
        alert('Cannot connect to server. Please check if backend is running.');
      } else {
        alert(err.response?.data?.msg || 'Error posting job. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-form-container">
      <h2>Post New Job</h2>
      <form onSubmit={handleSubmit} className="form">
        <input 
          className="input" 
          value={jobTitle} 
          onChange={(e) => setJobTitle(e.target.value)} 
          placeholder="Job Title" 
          required
        />
        <textarea 
          className="input" 
          value={jobDesc} 
          onChange={(e) => setJobDesc(e.target.value)} 
          placeholder="Job Description" 
          rows="4"
          required
        />
        <input 
          className="input" 
          type="date"
          value={lastDate} 
          onChange={(e) => setLastDate(e.target.value)} 
          placeholder="Last Date for Application" 
          required
        />
        <input 
          className="input" 
          value={companyName} 
          onChange={(e) => setCompanyName(e.target.value)} 
          placeholder="Company Name" 
          required
        />
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
