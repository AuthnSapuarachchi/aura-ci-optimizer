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

    console.log('=== Upload Debug Info ===');
    console.log('API_URL:', API_URL);
    console.log('Full upload URL:', `${API_URL}/log/upload`);
    console.log('Token exists:', !!token);
    console.log('Token length:', token ? token.length : 0);
    console.log('Log text length:', logText.length);
    console.log('Headers:', authHeaders);

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
    <div className="dashboard-wrapper">
      {/* Top Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="logo-section">
            <h1 className="logo">⚡ Aura</h1>
            <span className="logo-subtitle">CI/CD Log Analyzer</span>
          </div>
          <button onClick={onLogout} className="logout-button">
            <span>🚪</span> Log Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Upload Section */}
        <section className="upload-section">
          <div className="section-header">
            <h2>📝 Analyze New Log</h2>
            <p>Paste your CI/CD build log below for instant analysis</p>
          </div>

          <div className="upload-card">
            <textarea
              className="log-textarea"
              rows="12"
              placeholder="Paste your log file here...&#10;&#10;Example:&#10;[INFO] BUILD SUCCESS&#10;[INFO] Total time: 45 s&#10;Build status: SUCCESS"
              value={logText}
              onChange={e => setLogText(e.target.value)}
            />

            <button 
              onClick={handleSubmit} 
              disabled={isLoading}
              className={`analyze-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span> Analyzing...
                </>
              ) : (
                <>
                  <span>🔍</span> Analyze Log
                </>
              )}
            </button>

            {analysisResult && (
              <div className={`result-box ${analysisResult.error ? 'error' : 'success'}`}>
                <h3>📊 Analysis Result</h3>
                {analysisResult.error ? (
                  <div className="error-message">
                    <span>❌</span> {analysisResult.error}
                  </div>
                ) : (
                  <div className="result-content">
                    <div className="result-item">
                      <span className="result-label">Status:</span>
                      <span className={`status-badge ${analysisResult.parsedStatus?.toLowerCase()}`}>
                        {analysisResult.parsedStatus}
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Duration:</span>
                      <span className="result-value">{analysisResult.parsedDurationSeconds}s</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Project:</span>
                      <span className="result-value">{analysisResult.projectId}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* History Section */}
        <section className="history-section">
          <div className="section-header">
            <h2>📜 Analysis History</h2>
            <p>Your recent log analyses</p>
          </div>

          <div className="history-card">
            {logList.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📭</span>
                <p>No analyses yet. Upload your first log above!</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="log-table">
                  <thead>
                    <tr>
                      <th>📦 Project</th>
                      <th>📊 Status</th>
                      <th>⏱️ Duration</th>
                      <th>📅 Uploaded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logList.map(log => (
                      <tr key={log.id}>
                        <td className="project-cell">{log.projectId}</td>
                        <td>
                          <span className={`status-badge ${log.parsedStatus?.toLowerCase()}`}>
                            {log.parsedStatus}
                          </span>
                        </td>
                        <td className="duration-cell">{log.parsedDurationSeconds}s</td>
                        <td className="date-cell">
                          {new Date(log.uploadedAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;