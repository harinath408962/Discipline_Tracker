import React from 'react';
import './WeeklyAnalytics.css';

const WeeklyAnalytics = () => {
  // In a real app, this would fetch the last 7 days of data from localStorage
  // For MVP, we'll show a placeholder structure or mock data if storage is empty
  const mockData = [
    { day: 'Mon', score: 85, deepWork: 5.5 },
    { day: 'Tue', score: 72, deepWork: 4.0 },
    { day: 'Wed', score: 90, deepWork: 6.2 },
    { day: 'Thu', score: 45, deepWork: 2.5 },
    { day: 'Fri', score: 65, deepWork: 3.8 },
    { day: 'Sat', score: 95, deepWork: 7.0 },
    { day: 'Sun', score: 80, deepWork: 5.0 },
  ];

  return (
    <div className="weekly-analytics card">
      <h3>Weekly Performance</h3>
      <div className="analytics-grid">
        <div className="chart-container">
          <p className="chart-label">Discipline Score</p>
          <div className="bar-chart">
            {mockData.map((d, i) => (
              <div key={i} className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ 
                    height: `${d.score}%`,
                    backgroundColor: d.score >= 70 ? 'var(--accent-gold)' : 'var(--accent-red)'
                  }}
                >
                  <span className="bar-value">{d.score}</span>
                </div>
                <span className="bar-day">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-value">78.5</span>
            <span className="stat-label">AVG SCORE</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">34.0</span>
            <span className="stat-label">TOTAL DEEP WORK (HRS)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyAnalytics;
