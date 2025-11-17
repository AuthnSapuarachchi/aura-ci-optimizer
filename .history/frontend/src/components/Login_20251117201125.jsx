// src/components/Login.js
import React, { useState } from 'react';

function Login({ setToken, setIsLoginView }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      return response.json();
    })
    .then(data => {
      setToken(data.token); // This updates the state in App.js!
    })
    .catch(err => {
      setError(err.message);
    });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={e => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
        <p>
          No account? <button type="button" onClick={() => setIsLoginView(false)}>Register</button>
        </p>
      </form>
    </div>
  );
}

export default Login;