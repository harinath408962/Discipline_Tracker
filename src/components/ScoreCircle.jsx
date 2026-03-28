import React from 'react';
import './ScoreCircle.css';

const ScoreCircle = ({ score }) => {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score < 60) return 'var(--accent-red)';
    if (score < 85) return 'var(--accent-gold)';
    return 'var(--accent-green)';
  };

  return (
    <div className="score-circle-container">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="score-circle-svg"
      >
        <circle
          stroke="var(--bg-tertiary)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={getScoreColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="progress-ring"
        />
      </svg>
      <div className="score-text">
        <span className="number" style={{ color: getScoreColor() }}>{score}</span>
        <span className="label">DISCIPLINE</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
