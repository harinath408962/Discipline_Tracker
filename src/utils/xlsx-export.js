import * as XLSX from 'xlsx';

export const exportToExcel = (allData) => {
  const wb = XLSX.utils.book_new();

  // 1. Daily Summary Sheet
  const summaryData = Object.keys(allData).map(date => ({
    Date: date,
    Score: allData[date].score,
    Water_Litres: allData[date].water,
    DeepWork_Total_Hrs: allData[date].deepWork?.total?.toFixed(2) || 0,
    Reflection_Completed: allData[date].reflection?.completed ? 'Yes' : 'No',
    Wake_On_Time: allData[date].metadata?.wakeOnTime ? 'Yes' : 'No',
    No_Distractions: allData[date].metadata?.noDistractions ? 'Yes' : 'No'
  }));
  const wsSummary = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, "Daily Summary");

  // 2. Deep Work Sessions Sheet
  const sessionsData = [];
  Object.keys(allData).forEach(date => {
    const sessions = allData[date].deepWork?.sessions || [];
    sessions.forEach(s => {
      sessionsData.push({
        Date: date,
        Start: s.start ? new Date(s.start).toLocaleTimeString() : 'N/A',
        End: s.end ? new Date(s.end).toLocaleTimeString() : 'N/A',
        Tag: s.tag,
        Duration_Hrs: s.duration?.toFixed(2),
        Actual_Time: s.actualTime
      });
    });
  });
  if (sessionsData.length > 0) {
    const wsSessions = XLSX.utils.json_to_sheet(sessionsData);
    XLSX.utils.book_append_sheet(wb, wsSessions, "Deep Work Sessions");
  }

  // 3. Habits Log
  const habitsData = [];
  Object.keys(allData).forEach(date => {
    const habits = allData[date].habits || [];
    habits.forEach(h => {
      habitsData.push({
        Date: date,
        Habit: h.name,
        Status: h.completed ? 'Completed' : 'Pending'
      });
    });
  });
  if (habitsData.length > 0) {
    const wsHabits = XLSX.utils.json_to_sheet(habitsData);
    XLSX.utils.book_append_sheet(wb, wsHabits, "Habits Log");
  }

  // Generate and Download
  const fileName = `Discipline_Tracker_Log_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
};
