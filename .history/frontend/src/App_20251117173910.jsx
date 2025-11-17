import { useState } from 'react'
import './App.css'

function App() {

  // Create 'state' variables
  // 'logText' will hold the text from the text area
  const [logText, setLogText] = useState('');

  // 'analysisResult' will hold the JSON response from our backend
  const [analysisResult, setAnalysisResult] = useState(null);

  // 'isLoading' will show a "Loading..." message
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <>
      
    </>
  )
}

export default App
