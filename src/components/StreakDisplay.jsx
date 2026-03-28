import React from 'react';
import './StreakDisplay.css';

const StreakDisplay = ({ streak }) => {
  return (
    <div className="streak-display glass">
      <div className="streak-icon">🔥</div>
      <div className="streak-info">
        <span className="count">{streak}</span>
        <span className="label">DAY STREAK</span>
      </div>
    </div>
  );
};

export default StreakDisplay;
