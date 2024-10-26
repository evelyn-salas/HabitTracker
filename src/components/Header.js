import React from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

function Header() {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth).catch((err) => console.error('Sign out error:', err));
  };

  return (
    <header>
      <img src="/img/favicon.png" alt="logo" />
      <h1>HabitBear</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/goals">Goals</Link>
        <Link to="/habit-tracker">Habit Tracker</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tips">Tips</Link>
        <button onClick={handleSignOut} className="sign-out-btn">Sign Out</button>
      </nav>
    </header>
  );
}

export default Header;
