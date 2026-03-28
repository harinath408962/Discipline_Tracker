import React, { useState, useEffect } from 'react';
import { getDailyData, saveDailyData, calculateScore, getStreak } from './utils/storage';
import WaterTracker from './components/WaterTracker';
import SleepTracker from './components/SleepTracker';
import DeepWorkTracker from './components/DeepWorkTracker';
import HabitTracker from './components/HabitTracker';
import ScoreCircle from './components/ScoreCircle';
import DailyReflection from './components/DailyReflection';
import StreakDisplay from './components/StreakDisplay';
import WeeklyAnalytics from './components/WeeklyAnalytics';
import { exportToExcel } from './utils/xlsx-export';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const todayData = getDailyData();
    setData(todayData);
    setStreak(getStreak());
  }, []);

  const updateData = (newData) => {
    const updatedWithScore = {
      ...newData,
      score: calculateScore(newData)
    };
    setData(updatedWithScore);
    saveDailyData(updatedWithScore);
  };

  const handleExport = () => {
    const allData = JSON.parse(localStorage.getItem('discipline_tracker_data') || '{}');
    exportToExcel(allData);
  };

  if (!data) return <div className="loading">Loading performance data...</div>;

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-left">
          <h1>PERFORMANCE <span className="highlight">DASHBOARD</span></h1>
          <p className="date-display">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="header-right">
          <button className="export-btn" onClick={handleExport}>📥 EXPORT LOG (EXCEL)</button>
          <StreakDisplay streak={streak} />
        </div>
      </header>

      <main className="dashboard-grid">
        {/* Left Column: Core Focus */}
        <div className="grid-col main-focus">
          <section className="score-section card glass">
            <ScoreCircle score={data.score} />
            <div className="motivation-box">
              <div className="motivation-image">
                <img src="/mother_motivation_serious.png" alt="Motivation" />
              </div>
              <div className="motivation-text">
                <h2>Did you work hard enough today?</h2>
              </div>
            </div>
            {data.score < 60 && (
              <div className="penalty-warning">
                <h3>⚠️ PERFORMANCE WARNING</h3>
                <p>You failed today. Do better tomorrow.</p>
                <ul>
                  <li>No entertainment tomorrow</li>
                  <li>Extra 1 hour deep work</li>
                </ul>
              </div>
            )}
          </section>

          <DailyReflection 
            reflection={data.reflection} 
            onChange={(val) => updateData({ ...data, reflection: val })} 
          />
        </div>

        {/* Right Column: Trackers */}
        <div className="grid-col trackers">
          <div className="tracker-row">
            <WaterTracker 
              water={data.water} 
              onChange={(val) => updateData({ ...data, water: val })} 
            />
            <SleepTracker 
              sleep={data.sleep} 
              onChange={(val) => updateData({ ...data, sleep: val })} 
            />
          </div>
          
          <DeepWorkTracker 
            deepWork={data.deepWork} 
            onChange={(val) => updateData({ ...data, deepWork: val })} 
          />
          
          <HabitTracker 
            habits={data.habits} 
            onHabitsChange={(val) => updateData({ ...data, habits: val })} 
          />

          <WeeklyAnalytics />

          <div className="metadata-toggles card">
            <h3>Discipline Toggles</h3>
            <div className="toggles-list">
              <label className="toggle-item">
                <input 
                  type="checkbox" 
                  checked={data.metadata?.wakeOnTime || false}
                  onChange={(e) => updateData({ ...data, metadata: { ...data.metadata, wakeOnTime: e.target.checked } })}
                />
                <span>Woke on Time (+10)</span>
              </label>
              <label className="toggle-item">
                <input 
                  type="checkbox" 
                  checked={data.metadata?.noDistractions || false}
                  onChange={(e) => updateData({ ...data, metadata: { ...data.metadata, noDistractions: e.target.checked } })}
                />
                <span>No Distractions (+15)</span>
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
