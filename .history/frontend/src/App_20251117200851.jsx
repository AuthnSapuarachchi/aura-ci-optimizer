import { useState, useEffect } from 'react'
import './App.css'

function App() {

  // Check localStorage for a token
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoginView, setIsLoginView] = useState(true);
  
}

export default App
