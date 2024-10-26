import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import '../styles/dashboard.css';

function Dashboard({ goals, activities }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <section className="calendar-view">
        <h2>Calendar</h2>
        <Calendar goals={goals} activities={activities} />
      </section>

      <button className="nav-button" onClick={() => navigate('/goals')}>Add Goals</button>
      <button className="nav-button" onClick={() => navigate('/habit-tracker')}>Add Activity</button>
    </div>
  );
}

export default Dashboard;
