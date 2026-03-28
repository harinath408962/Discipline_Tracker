import React, { useState } from 'react';
import './WaterTracker.css';

const WaterTracker = ({ water, onChange }) => {
  const maxLitres = 5;
  const [selectedSize, setSelectedSize] = useState(1.0);
  
  const sizes = [
    { label: '0.25L', value: 0.25 },
    { label: '0.5L', value: 0.5 },
    { label: '1.0L', value: 1.0 }
  ];

  const addWater = (size) => {
    if (window.confirm(`Did you drink ${size} Litre of water for sure?`)) {
      const newWater = Math.min(water + size, maxLitres);
      onChange(parseFloat(newWater.toFixed(2)));
    }
  };

  const resetWater = () => {
    if (window.confirm('Reset today\'s water intake?')) {
      onChange(0);
    }
  };

  return (
    <div className="water-tracker card">
      <div className="water-header">
        <h3>Water Intake</h3>
        <button className="reset-btn" onClick={resetWater} title="Reset">↺</button>
      </div>
      <p className="subtitle">{water.toFixed(2)} / {maxLitres} Litres</p>
      
      <div className="glass-visual">
        <div className="glass-fill" style={{ height: `${(water / maxLitres) * 100}%` }}>
          {water > 0 && <span className="bubble-anim"></span>}
        </div>
        <div className="glass-labels">
          {[1, 2, 3, 4, 5].map(l => (
            <span key={l} className="l-mark">{l}L</span>
          ))}
        </div>
      </div>

      <div className="size-selector">
        {sizes.map(s => (
          <button 
            key={s.value} 
            className={`size-btn ${selectedSize === s.value ? 'active' : ''}`}
            onClick={() => addWater(s.value)}
          >
            +{s.label}
          </button>
        ))}
      </div>

      {water >= 4 && <p className="goal-reached">Goal Reached (+10 pts)</p>}
    </div>
  );
};

export default WaterTracker;
