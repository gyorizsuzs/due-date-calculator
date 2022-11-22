// BASE LOGIC

// DATA
// workingHours = start(9), end(17)
const startingHour = 9;
const finishingHour = 17;

// isWorkDay + isWorkHour = isWorkTime

function isWorkDay(date) {
  return date.getDay() >= 1 && date.getDay() <= 5;
}

function isWorkHour(date) {
  return date.getHours() >= startingHour && date.getHours() <= finishingHour;
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

function addWeekDay(date, days) {
  while (days) {
    addDay(date);

    if (isWorkDay(date)) {
      --days;
    }
  }
}

// calcEstimate = start + TAT
// if !sameDay

function nextDay(date) {
  addWeekDay(date, 1);
  date.setHours(startingHour);
  date.setMinutes(0);
}

function getRemainderTime(date) {
  let day = new Date(date);
  day.setHours(finishingHour);
  day.setMinutes(0);

  return day.getTime() - date.getTime();
}

// MAIN FUNCTION
// CalculateDueDate(submitDate, TurnaroundTime, estimatedSolutionDate)

function calculateDueDate(submitDate, turnaroundTime) {
  let estimation = new Date(submitDate);
  let turnaroundMinutes = turnaroundTime * 60;

  if (!isWorkTime(submitDate) || isNaN(turnaroundTime) || turnaroundTime < 0)
    throw new Error('Cannot submit: invalid request.');

  while (turnaroundMinutes > 0) {
    let remainderTime = getRemainderTime(estimate);
    let workingTime = Math.min(remainderTime, turnaroundMinutes);

    estimation.setTime(estimation.getTime() + workingTime);

    turnaroundMinutes = turnaroundMinutes - workingTime;
    if (turnaroundMinutes > 0) {
      nextDay(estimation);
    }
  }
  return estimation;
}

module.exports = calculateDueDate;
