import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="home-text">
        <h1>Build healthy habits with HabitBear</h1>
        <p>Be like HabitBear and sprout healthier habits!</p>
        <button className="button" onClick={() => navigate('/dashboard')}>Start Here</button>
      </section>
    </div>
  );
}

export default Home;
