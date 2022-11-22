const calculateDueDate = require('./calculateDueDate');

/*******************************************/

/*                Examples                 */

/*******************************************/

const exampleValidSubmit = [
  new Date(Date.UTC(2022, 10, 22, 8, 1)),
  new Date(Date.UTC(2022, 10, 25, 8, 1)),
  new Date(Date.UTC(2022, 11, 30, 8, 1)),
];

const exampleInvalidSubmit = [
  new Date(Date.UTC(2022, 10, 22, 7, 59)),
  new Date(Date.UTC(2022, 10, 22, 16, 1)),
];

const exampleValidTAT = [6, 9];

const exampleInvalidTAT = [0, -1];

//  1. Same day  ✅
console.log(
  `Issue has been submitted at ${exampleValidSubmit[0].toLocaleString()}\nThe turnaround time is ${
    exampleValidTAT[0]
  } hours\n`
);
try {
  const exampleEstimation = calculateDueDate(
    exampleValidSubmit[0],
    exampleValidTAT[0]
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}\n`);
}

// 2. Too early ✅
console.log(
  `Issue has been submitted at ${exampleInvalidSubmit[0].toLocaleString()}\nThe turnaround time is ${
    exampleValidTAT[0]
  } hours\n`
);
try {
  const exampleEstimation = calculateDueDate(
    exampleInvalidSubmit[0],
    exampleValidTAT[0]
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(
    `Error has occured during calculation. Request is too early.\n ${err}\n`
  );
}

// 3. Too late ✅
console.log(
  `Issue has been submitted at ${exampleInvalidSubmit[1].toLocaleString()}\nThe turnaround time is ${
    exampleValidTAT[0]
  } hours\n`
);
try {
  const exampleEstimation = calculateDueDate(
    exampleInvalidSubmit[1],
    exampleValidTAT[0]
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(
    `Error has occured during calculation. Request is too late.\n ${err}\n`
  );
}

// 4. Next day - same week ✅
console.log(
  `Issue has been submitted at ${exampleValidSubmit[0].toLocaleString()}\nThe turnaround time is ${
    exampleValidTAT[1]
  } hours\n`
);
try {
  const exampleEstimation = calculateDueDate(
    exampleValidSubmit[0],
    exampleValidTAT[1]
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}\n`);
}

// 5. Next day - next week ✅
console.log(
  `Issue has been submitted at ${exampleValidSubmit[1].toLocaleString()}\nThe turnaround time is ${
    exampleValidTAT[1]
  } hours\n`
);
try {
  const exampleEstimation = calculateDueDate(
    exampleValidSubmit[1],
    exampleValidTAT[1]
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}\n`);
}

// 6. Next day - next year ✅
console.log(
  `Issue has been submitted at ${exampleValidSubmit[2].toLocaleString()}\nThe turnaround time is ${
    exampleValidTAT[1]
  } hours\n`
);
try {
  const exampleEstimation = calculateDueDate(
    exampleValidSubmit[2],
    exampleValidTAT[1]
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}\n`);
}

// 7. Zero as TAT input ✅
console.log(
  `Issue has been submitted at ${exampleValidSubmit[0].toLocaleString()}\nThe turnaround time is ${
    exampleInvalidTAT[0]
  } hours\n`
);
try {
  const exampleEstimation = calculateDueDate(
    exampleValidSubmit[0],
    exampleInvalidTAT[0]
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(
    `Error has occured during calculation. Request cannot be zero.\n ${err}\n`
  );
}

// 8. Negative as TAT input ✅
console.log(
  `Issue has been submitted at ${exampleValidSubmit[0].toLocaleString()}\nThe turnaround time is ${
    exampleInvalidTAT[1]
  } hours\n`
);
try {
  const exampleEstimation = calculateDueDate(
    exampleValidSubmit[0],
    exampleInvalidTAT[1]
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(
    `Error has occured during calculation. Request cannot be negative.\n ${err}\n`
  );
}
