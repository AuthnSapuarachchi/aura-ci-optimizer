// src/components/Register.jsx
import { useState } from 'react';

function Register({ setIsLoginView }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.text();
    })
    .then(data => {
      setMessage(data);
    })
    .catch(err => {
      setError(err.message);
    });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <p>
          Have an account? <button type="button" onClick={() => setIsLoginView(true)}>Login</button>
        </p>
      </form>
    </div>
  );
}

export default Register;