export default function resetCounter(setCounterData, wantedDelay) {
  const savedDate = localStorage.getItem("end_date");
  if (savedDate != null && !isNaN(savedDate)) {
    const currentTime = Date.now();
    const delta = parseInt(savedDate, 10) - currentTime;

    if (delta > wantedDelay) {
      if (localStorage.getItem("end_date").length > 0)
        localStorage.removeItem("end_date");
    } else {
      setCounterData({ date: currentTime, delay: delta });
    }
  }
}
