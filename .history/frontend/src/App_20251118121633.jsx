import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

function App() {

  // Start with no token - user must login each time
  const [token, setToken] = useState(null);
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

  // If we don't have a token, show the Login/Register page
  if (!token) {
    return (
      <div className="App">
        {isLoginView ? (
          <Login setToken={setToken} setIsLoginView={setIsLoginView} />
        ) : (
          <Register setIsLoginView={setIsLoginView} />
        )}
      </div>
    );
  }

  // If we DO have a token, show the main application
  return (
    <div className="App">
      <Dashboard token={token} onLogout={handleLogout} />
    </div>
  );

  
}

export default App
