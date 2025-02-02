import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [file, setFile] = useState(null);
  const [docId, setDocId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:5000/upload", formData);
      setDocId(res.data.docId);
    } catch (err) {
      setError("File upload failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a question!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/ask", { docId, question });
      setAnswer(res.data.answer);
    } catch (err) {
      setError("Failed to fetch an answer. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Document Q&A Bot</h1>
      
      {/* File Upload Section */}
      <div className="upload-section">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleFileUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Error Message Display */}
      {error && <p className="error">{error}</p>}

      {/* Q&A Section */}
      {docId && (
        <div className="qa-section">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
          />
          <button onClick={handleAsk} disabled={loading}>
            {loading ? "Thinking..." : "Ask"}
          </button>
          <p className="answer"><strong>Answer:</strong> {answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
