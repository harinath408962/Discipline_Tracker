const STORAGE_KEY = 'discipline_tracker_data';

export const getDailyData = (date) => {
  const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const dateKey = date || new Date().toISOString().split('T')[0];
  
  if (!allData[dateKey]) {
    // Default initial state for a new day
    allData[dateKey] = {
      water: 0, // Litres
      sleep: { start: '', end: '', duration: 0 },
      deepWork: { sessions: [], total: 0 },
      habits: [], // { id, name, completed, type }
      reflection: { q1: '', q2: '', q3: '', completed: false },
      score: 0,
      metadata: { wakeOnTime: false, noDistractions: false }
    };
    saveAllData(allData);
  }
  
  return allData[dateKey];
};

export const saveDailyData = (data, date) => {
  const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const dateKey = date || new Date().toISOString().split('T')[0];
  allData[dateKey] = data;
  saveAllData(allData);
};

const saveAllData = (allData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
};

export const calculateScore = (data) => {
  let score = 0;
  
  // Scoring Logic:
  // Wake on time → +10
  if (data.metadata?.wakeOnTime) score += 10;
  
  // Sleep on time → +10 (This might need a bit more logic, but for now binary)
  // Let's assume the user checks a toggle or we calculate from time
  if (data.metadata?.sleepOnTime) score += 10;
  
  // Water goal (>=4L) → +10
  if (data.water >= 4) score += 10;
  
  // Exercise → +15 (Assume one of the habits is "Exercise")
  const exerciseHabit = data.habits.find(h => h.name.toLowerCase() === 'exercise');
  if (exerciseHabit?.completed) score += 15;
  
  // Deep Work (>=4 hrs) → +30
  if (data.deepWork.total >= 4) score += 30;
  
  // No distractions → +15
  if (data.metadata?.noDistractions) score += 15;
  
  // Reflection completed → +10
  if (data.reflection?.completed) score += 10;
  
  return Math.min(score, 100);
};

export const getStreak = () => {
  const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const dates = Object.keys(allData).sort((a, b) => new Date(b) - new Date(a));
  
  let currentStreak = 0;
  for (let date of dates) {
    if (allData[date].score >= 70) {
      currentStreak++;
    } else {
      break;
    }
  }
  return currentStreak;
};
