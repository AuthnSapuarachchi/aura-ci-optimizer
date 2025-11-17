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

  // This function is called when the button is clicked
  const handleSubmit = () => {
    // 1. Set loading to true
    setIsLoading(true);
    setAnalysisResult(null);

    // 2. Call our Spring Boot API
    // We use the 'fetch' API built into the browser
    fetch('http://localhost:8080/api/v1/log/upload', {
      method: 'POST',
      headers: {
        // We tell the server we are sending plain text
        'Content-Type': 'text/plain',
      },
      // The 'body' is the raw log text from our state
      body: logText,
    })
      .then(response => response.json()) // 3. Convert the response to JSON
      .then(data => {
        // 4. Save the JSON response in our state
        setAnalysisResult(data);
        setIsLoading(false);
      })
      .catch(error => {
        // 5. Handle any errors
        console.error('Error uploading log:', error);
        setAnalysisResult({ error: 'Failed to upload log.' });
        setIsLoading(false);
      });
  };
  
  return (
    <>
      
    </>
  )
}

export default App
