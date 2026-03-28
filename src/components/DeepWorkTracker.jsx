import React, { useState, useEffect, useRef } from 'react';
import './DeepWorkTracker.css';

const DeepWorkTracker = ({ deepWork, onChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [activeTag, setActiveTag] = useState('Study');
  const [sessionStart, setSessionStart] = useState(null);
  const timerRef = useRef(null);

  const tags = ['Study', 'DSA', 'Project'];

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
    setSessionStart(new Date().toISOString());
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    setIsPaused(true);
    clearInterval(timerRef.current);
  };

  const resumeTimer = () => {
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    
    const hours = time / 3600;
    const now = new Date().toISOString();
    
    // Add session to logs
    const newSession = {
      start: sessionStart,
      end: now,
      tag: activeTag,
      duration: hours,
      actualTime: formatTime(time)
    };

    const newDeepWork = {
      ...deepWork,
      sessions: [...(deepWork.sessions || []), newSession],
      total: (deepWork.total || 0) + hours
    };
    
    onChange(newDeepWork);
    
    // Reset local state
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
    setSessionStart(null);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="deep-work-tracker card">
      <div className="dw-header">
        <h3>Deep Work Tracker</h3>
        {isActive && <div className="live-indicator">● LIVE</div>}
      </div>
      
      <div className="timer-display">
        <span className="time">{formatTime(time)}</span>
        <span className="current-tag">{isActive ? `Focusing on: ${activeTag}` : 'Ready to start'}</span>
      </div>
      
      {!isActive ? (
        <div className="tag-selector">
          {tags.map(tag => (
            <button 
              key={tag} 
              className={`tag-btn ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <div className="controls">
        {!isActive ? (
          <button className="btn-start" onClick={startTimer}>Start Session</button>
        ) : (
          <div className="active-controls">
            {!isPaused ? (
              <button className="btn-pause" onClick={pauseTimer}>Pause</button>
            ) : (
              <button className="btn-resume" onClick={resumeTimer}>Resume</button>
            )}
            <button className="btn-stop" onClick={stopTimer}>Finish & Log</button>
          </div>
        )}
      </div>

      <div className="stats-footer">
        <p>Total Today: <strong>{deepWork.total?.toFixed(2) || 0} hrs</strong></p>
        <p>Sessions: <strong>{deepWork.sessions?.length || 0}</strong></p>
      </div>
      {deepWork.total >= 4 && <p className="goal-reached">Target Achieved (+30 pts)</p>}
    </div>
  );
};

export default DeepWorkTracker;
