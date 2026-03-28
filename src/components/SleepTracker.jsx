import React from 'react';
import './SleepTracker.css';

const SleepTracker = ({ sleep, onChange }) => {
  const handleTimeChange = (field, value) => {
    const newSleep = { ...sleep, [field]: value };
    
    if (newSleep.start && newSleep.end) {
      const start = new Date(`2000-01-01T${newSleep.start}`);
      let end = new Date(`2000-01-01T${newSleep.end}`);
      
      // If end time is before start time, it means they woke up the next day
      if (end < start) {
        end = new Date(`2000-01-02T${newSleep.end}`);
      }
      
      const diffMs = end - start;
      const diffHrs = (diffMs / (1000 * 60 * 60)).toFixed(1);
      newSleep.duration = parseFloat(diffHrs);
    }
    
    onChange(newSleep);
  };

  return (
    <div className="sleep-tracker card">
      <h3>Sleep Duration</h3>
      <div className="sleep-inputs">
        <div className="input-field">
          <label>Slept At</label>
          <input 
            type="time" 
            value={sleep.start || ''} 
            onChange={(e) => handleTimeChange('start', e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>Woke At</label>
          <input 
            type="time" 
            value={sleep.end || ''} 
            onChange={(e) => handleTimeChange('end', e.target.value)}
          />
        </div>
      </div>
      {sleep.duration > 0 && (
        <div className="sleep-result">
          <p className="duration-text">{sleep.duration} Hours Sleep</p>
          <p className={sleep.duration >= 7 && sleep.duration <= 9 ? 'good' : 'warning'}>
            {sleep.duration >= 7 && sleep.duration <= 9 ? 'Optimized Sleep' : 'Inconsistent Sleep'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SleepTracker;
