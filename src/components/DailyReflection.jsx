import React from 'react';
import './DailyReflection.css';

const DailyReflection = ({ reflection, onChange }) => {
  const handleInputChange = (field, value) => {
    const newReflection = { ...reflection, [field]: value };
    // Check if all fields are filled to mark as completed
    newReflection.completed = !!(newReflection.q1 && newReflection.q2 && newReflection.q3);
    onChange(newReflection);
  };

  return (
    <div className="daily-reflection card">
      <h3>Daily Reflection</h3>
      <div className="reflection-fields">
        <div className="field">
          <label>What did I do today?</label>
          <textarea 
            placeholder="Focus on wins and output..."
            value={reflection.q1 || ''}
            onChange={(e) => handleInputChange('q1', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Where did I waste time?</label>
          <textarea 
            placeholder="Identify distractions and leaks..."
            value={reflection.q2 || ''}
            onChange={(e) => handleInputChange('q2', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Did I act disciplined today?</label>
          <textarea 
            placeholder="Honest assessment of work ethic..."
            value={reflection.q3 || ''}
            onChange={(e) => handleInputChange('q3', e.target.value)}
          />
        </div>
      </div>
      {reflection.completed && <p className="completed-badge">Reflection Finalized (+10 pts)</p>}
    </div>
  );
};

export default DailyReflection;
