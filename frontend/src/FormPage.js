import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';

export default function FormPage() {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/recommend/${studentId}/`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('No recommendations found or invalid student ID');
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formpage-container">
      <h2 className="formpage-title">Find Internship Recommendations</h2>
      <form className="formpage-form" onSubmit={handleSubmit}>
        <label htmlFor="studentId">Student ID:</label>
        <input
          id="studentId"
          type="number"
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
          required
          min={1}
          className="formpage-input"
        />
        <button type="submit" className="formpage-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </form>
      {error && <div className="formpage-error">{error}</div>}
      {recommendations && (
        <div className="formpage-results">
          <h3>Recommended Internships:</h3>
          <ul>
            {recommendations.map(intern => (
              <li key={intern.id} className="formpage-result-item">
                <strong>{intern.title}</strong> <br />
                <span>{intern.description}</span> <br />
                <span>Sector: {intern.sector}</span> <br />
                <span>Location: {intern.location}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
