import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/auth.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        setError('Failed to sign up. Please try again.');
      });
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="alt-action">
        <p>Already have an account? <a href="/signin">Sign In</a></p>
      </div>
    </div>
  );
}

export default SignUp;
