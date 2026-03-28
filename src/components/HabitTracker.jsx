import React, { useState } from 'react';
import './HabitTracker.css';

const HabitTracker = ({ habits, onHabitsChange }) => {
  const [newHabitName, setNewHabitName] = useState('');

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    
    const newHabit = {
      id: Date.now(),
      name: newHabitName,
      completed: false
    };
    
    onHabitsChange([...habits, newHabit]);
    setNewHabitName('');
  };

  const toggleHabit = (id) => {
    const updatedHabits = habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    );
    onHabitsChange(updatedHabits);
  };

  const deleteHabit = (id) => {
    onHabitsChange(habits.filter(h => h.id !== id));
  };

  return (
    <div className="habit-tracker card">
      <h3>Daily Habits</h3>
      <form className="add-habit" onSubmit={addHabit}>
        <input 
          type="text" 
          placeholder="New Habit (e.g. Meditation)" 
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
        />
        <button type="submit" className="add-btn">+</button>
      </form>
      
      <div className="habits-list">
        {habits.length === 0 ? (
          <p className="empty-msg">No habits added yet.</p>
        ) : (
          habits.map(habit => (
            <div key={habit.id} className={`habit-item ${habit.completed ? 'done' : ''}`}>
              <div className="habit-checkbox" onClick={() => toggleHabit(habit.id)}>
                {habit.completed && <span className="check">✓</span>}
              </div>
              <span className="habit-name">{habit.name}</span>
              <button className="del-btn" onClick={() => deleteHabit(habit.id)}>×</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HabitTracker;
