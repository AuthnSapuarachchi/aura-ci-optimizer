import { useState, useEffect } from 'react'
import './App.css'

function App() {

  // Create 'state' variables
  // 'logText' will hold the text from the text area
  const [logText, setLogText] = useState('');

  // 'analysisResult' will hold the JSON response from our backend
  const [analysisResult, setAnalysisResult] = useState(null);

  // 'isLoading' will show a "Loading..." message
  const [isLoading, setIsLoading] = useState(false);

  // ADD THIS NEW STATE to hold our list
  const [logList, setLogList] = useState([]);


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
    <div className="App">
      <header className="App-header">
        <h1>Aura - CI/CD Log Analyzer</h1>
        <p>Paste your raw log text below to analyze it.</p>

        <textarea
          rows="15"
          cols="80"
          placeholder="Paste your log file here..."
          value={logText}
          onChange={e => setLogText(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Log'}
        </button>

        {/* This section displays the result */}
        {analysisResult && (
          <div className="result-box">
            <h2>Analysis Result:</h2>
            {/* <pre> tag is good for showing formatted JSON */}
            <pre>
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
          </div>
        )}
      </header>
    </div>
  )
}

export default App
