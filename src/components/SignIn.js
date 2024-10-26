import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/auth.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        setError('Failed to sign in. Please check your credentials.');
      });
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>
      <div className="alt-action">
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
}

export default SignIn;
