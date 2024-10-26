import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import GoalsList from './components/GoalsList';
import HabitTracker from './components/HabitTracker';
import Tips from './components/Tips';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './styles/global.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [habitsData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/goals" element={<GoalsList goals={goals} setGoals={setGoals} />} />
          <Route path="/habit-tracker" element={<HabitTracker habits={habitsData} activities={activities} setActivities={setActivities} />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/dashboard" element={<Dashboard goals={goals} habits={habitsData} activities={activities} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
