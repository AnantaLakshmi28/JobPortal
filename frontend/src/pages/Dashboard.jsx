import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import ChartView from '../components/ChartView';
import Profile from '../components/Profile';

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleJobAdded = () => {
    console.log('Job added, triggering refresh...');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <Sidebar onLogout={handleLogout} />
      <div className="main">
        <Routes>
          <Route path="/" element={
            <div>
              <JobForm onJobAdded={handleJobAdded} />
              <JobList refreshTrigger={refreshKey} />
            </div>
          } />
          <Route path="post" element={<JobForm onJobAdded={handleJobAdded} />} />
          <Route path="posted" element={<JobList refreshTrigger={refreshKey} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analysis" element={<ChartView />} />
        </Routes>
      </div>
    </div>
  );
}
