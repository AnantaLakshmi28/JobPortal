import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <h3>Dashboard</h3>
      <Link className="link" to="/dashboard/posted">Job Posted</Link>
      <Link className="link" to="/dashboard/post">Post Job</Link>
      <Link className="link" to="/dashboard/profile">Profile</Link>
      <Link className="link" to="/dashboard/analysis">Customer Analysis</Link>
      <a className="link" href="#" onClick={onLogout}>Logout</a>
    </div>
  );
}
