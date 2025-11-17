import { useState, useEffect } from 'react'
import './App.css'

function App() {

  // Check localStorage for a token
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoginView, setIsLoginView] = useState(true);

  // This effect runs when the 'token' state changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  
}

export default App
