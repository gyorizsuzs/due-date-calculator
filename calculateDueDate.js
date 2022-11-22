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
    let remainderTime = getRemainderTime(estimation);
    let workingTime = Math.min(remainderTime, turnaroundMinutes);

    estimation.setTime(estimation.getTime() + workingTime);

    turnaroundMinutes = turnaroundMinutes - workingTime;
    if (turnaroundMinutes > 0) {
      nextDay(estimation);
    }
  }
  return estimation;
}

// EXAMPLES

let exampleValidSubmit = new Date(Date.UTC(2022, 10, 22, 9, 1));
let exampleInvalidSubmit = new Date(Date.UTC(2022, 10, 22, 8, 59));
let exampleValidTAT = 8;
let exampleValidTAT2 = 9;
let exampleInvalidTAT = 0;
let exampleInvalidTAT2 = -1; // ✅

console.log(
  `Issue has been submitted at ${exampleValidSubmit.toLocaleString()}\nThe turnaround time is ${exampleValidTAT} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(exampleValidSubmit, exampleValidTAT);
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}`);
}

console.log(
  `Issue has been submitted at ${exampleInvalidSubmit.toLocaleString()}\nThe turnaround time is ${exampleValidTAT} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleInvalidSubmit,
    exampleValidTAT
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}`);
}

console.log(
  `Issue has been submitted at ${exampleValidSubmit.toLocaleString()}\nThe turnaround time is ${exampleValidTAT2} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleValidSubmit,
    exampleValidTAT2
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}`);
}

console.log(
  `Issue has been submitted at ${exampleValidSubmit.toLocaleString()}\nThe turnaround time is ${exampleInvalidTAT} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleValidSubmit,
    exampleInvalidTAT
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}`);
}

console.log(
  `Issue has been submitted at ${exampleValidSubmit.toLocaleString()}\nThe turnaround time is ${exampleInvalidTAT2} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleValidSubmit,
    exampleInvalidTAT2
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}`);
}

module.exports = calculateDueDate;
