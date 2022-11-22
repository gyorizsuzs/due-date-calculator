`use strict`;

/*******************************************/

/*                   Data                  */

/*******************************************/

const startingHour = 9;
const finishingHour = 17;

function isWorkDay(date) {
  return date.getDay() >= 1 && date.getDay() <= 5;
}

function isWorkHour(date) {
  return (
    date.getHours() >= startingHour &&
    (date.getHours() < finishingHour ||
      (date.getHours() === finishingHour &&
        date.getMinutes() === 0 &&
        date.getSeconds() === 0 &&
        date.getMilliseconds() === 0))
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

function nextDay(date) {
  addWeekDay(date, 1);
  date.setHours(startingHour);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
}

function getRemainderTime(date) {
  let day = new Date(date);
  day.setHours(finishingHour);
  day.setMinutes(0);
  day.setSeconds(0);
  day.setMilliseconds(0);

  return day.getTime() - date.getTime();
}

/*******************************************/

/*               Main Logic                */

/*******************************************/

function calculateDueDate(submitDate, turnaroundTime) {
  let estimation = new Date(submitDate);
  let turnaroundMSs = turnaroundTime * 60 * 60 * 1000;

  if (!isWorkTime(submitDate) || isNaN(turnaroundTime) || turnaroundTime <= 0)
    throw new Error('Cannot submit: invalid request.');

  while (turnaroundMSs > 0) {
    let remainderTime = getRemainderTime(estimation);
    let workingTime = Math.min(remainderTime, turnaroundMSs);

    estimation.setTime(estimation.getTime() + workingTime);

    turnaroundMSs = turnaroundMSs - workingTime;
    if (turnaroundMSs > 0) {
      nextDay(estimation);
    }
  }
  return estimation;
}

module.exports = calculateDueDate;
