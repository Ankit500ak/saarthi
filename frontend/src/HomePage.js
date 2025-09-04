import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <img src="/logo192.png" alt="Saarthi Logo" className="homepage-logo" />
        <h1 className="homepage-title">Saarthi Internship Recommendation Engine</h1>
      </header>
      <main className="homepage-main">
        <p className="homepage-desc">
          Get personalized internship recommendations for the PM Internship Scheme using AI.
        </p>
        <Link to="/form" className="homepage-btn">
          Find Internships
        </Link>
      </main>
    </div>
  );
}
