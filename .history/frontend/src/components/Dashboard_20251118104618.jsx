// src/components/Dashboard.jsx
import { useState, useEffect, useCallback } from 'react';
import '../App.css';
import { API_URL } from '../api.jsx';

// The Dashboard now receives the token and logout function as props
function Dashboard({ token, onLogout }) {
  const [logText, setLogText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logList, setLogList] = useState([]);

  // --- THIS IS THE KEY ---
  // We create a reusable 'headers' object
  const authHeaders = {
    'Content-Type': 'text/plain',
    'Authorization': `Bearer ${token}`
  };

  console.log('Dashboard loaded with token:', token ? 'Token exists (length: ' + token.length + ')' : 'No token');

  // Fetch all logs
  const fetchAllLogs = useCallback(() => {
    fetch(`${API_URL}/log/all`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      // If the response is not "ok" (e.g., 401, 403, 500)
      if (!response.ok) {
        // If it's a 403, the token is bad, so log out
        if (response.status === 403 || response.status === 401) {
          console.error('Authentication failed. Logging out.');
          onLogout(); // This will log the user out
        }
        throw new Error('Could not fetch logs');
      }
      return response.json();
    })
    .then(data => {
      if(data && Array.isArray(data)) {
        data.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        setLogList(data);
      }
    })
    .catch(error => {
      console.error('Error fetching logs:', error);
      // Don't log out here, could just be a temporary network error
    });
  }, [token, onLogout]);

  // Run fetchAllLogs on component mount and when token changes
  useEffect(() => {
    fetchAllLogs();
  }, [fetchAllLogs]);


  // Handle log submission
  const handleSubmit = () => {
    if (!logText.trim()) {
      setAnalysisResult({ error: 'Please paste some log text first' });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    console.log('Uploading log with token:', token ? 'Token present' : 'No token');

    fetch(`${API_URL}/log/upload`, {
      method: 'POST',
      headers: authHeaders,
      body: logText,
    })
    .then(response => {
      console.log('Upload response status:', response.status);
      
      // Check if the response is "ok"
      if (!response.ok) {
        // For 401/403, try to get more details before logging out
        return response.text().then(text => {
          console.error('Upload failed:', response.status, text);
          
          // Only logout if it's clearly an auth issue and not CORS
          if ((response.status === 401 || response.status === 403) && text.includes('auth')) {
            console.error('Authentication failed. Logging out.');
            onLogout();
          }
          
          throw new Error(`Upload failed (${response.status}): ${text || 'Unknown error'}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Upload successful:', data);
      setAnalysisResult(data);
      setIsLoading(false);
      fetchAllLogs(); // Refresh the list
    })
    .catch(error => {
      console.error('Error uploading log:', error);
      setAnalysisResult({ error: error.message });
      setIsLoading(false);
    });
  };

  return (
    <> {/* Use a React Fragment */}
      <header className="App-header">
        <div className="header-content">
          <h1>Aura - CI/CD Log Analyzer</h1>
          <button onClick={onLogout} className="logout-button">Log Out</button>
        </div>
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

        {analysisResult && (
          <div className="result-box">
            <h2>Analysis Result:</h2>
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        )}
      </header>

      <div className="log-list-container">
        <h2>Recent Analyses</h2>
        {/* (Your table code from Phase 5 is unchanged) */}
        <table className="log-table">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Status</th>
              <th>Duration (s)</th>
              <th>Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            {logList.map(log => (
              <tr key={log.id}>
                <td>{log.projectId}</td>
                <td>{log.parsedStatus}</td>
                <td>{log.parsedDurationSeconds}</td>
                <td>{new Date(log.uploadedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;