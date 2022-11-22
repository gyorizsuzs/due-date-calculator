// BASE LOGIC

// DATA
// workingHours = start(9), end(17)
const startingHour = 9;
const finishingHour = 17;

// isWorkDay + isWorkHour = isWorkTime

function isWorkDay(date) {
  return date.getUTCDay() >= 1 && date.getUTCDay() <= 5;
}

function isWorkHour(date) {
  return (
    date.getUTCHours() >= startingHour && date.getUTCHours() <= finishingHour
  );
}

function isWorkTime(submitDate) {
  return (
    submitDate instanceof Date &&
    typeof submitDate.getMonth === 'function' &&
    isWorkDay(submitDate) &&
    isWorkHour(submitDate)
  );
}

// weekDay(+1)

function addDay(date) {
  date.setDate(date.getDate() + 1);
}

// calcEstimate = start + TAT

// MAIN FUNCTION
// CalculateDueDate(submitDate, TurnaroundTime, estimatedSolutionDate)

function calculateDueDate(submitDate, turnaroundTime) {
  let estimation = new Date(submitDate);

  if (!isWorkTime(submitDate)) throw new Error('Cannot submit invalid date.');

  return estimation;
}

module.exports = calculateDueDate;
