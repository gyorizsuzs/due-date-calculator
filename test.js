let calculateDueDate = require('./calculateDueDate');

/*******************************************/

/*               Test Cases                */

/*******************************************/

let exampleValidSubmit = new Date(Date.UTC(2022, 10, 22, 8, 1));
let exampleValidSubmit2 = new Date(Date.UTC(2022, 10, 25, 8, 1));
let exampleValidSubmit3 = new Date(Date.UTC(2022, 11, 30, 8, 1));
let exampleInvalidSubmit = new Date(Date.UTC(2022, 10, 22, 7, 59));
let exampleInvalidSubmit2 = new Date(Date.UTC(2022, 10, 22, 16, 1));
let exampleValidTAT = 6;
let exampleValidTAT2 = 9;
let exampleInvalidTAT = 0;
let exampleInvalidTAT2 = -1;

//  1. Same day  ✅
console.log(
  `Issue has been submitted at ${exampleValidSubmit.toLocaleString()}\nThe turnaround time is ${exampleValidTAT} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(exampleValidSubmit, exampleValidTAT);
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}\n`);
}

// 2. Too early ✅
console.log(
  `Issue has been submitted at ${exampleInvalidSubmit.toLocaleString()}\nThe turnaround time is ${exampleValidTAT} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleInvalidSubmit,
    exampleValidTAT
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
  `Issue has been submitted at ${exampleInvalidSubmit2.toLocaleString()}\nThe turnaround time is ${exampleValidTAT} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleInvalidSubmit2,
    exampleValidTAT
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
  `Issue has been submitted at ${exampleValidSubmit.toLocaleString()}\nThe turnaround time is ${exampleValidTAT2} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleValidSubmit,
    exampleValidTAT2
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}\n`);
}

// 5. Next day - next week ✅
console.log(
  `Issue has been submitted at ${exampleValidSubmit2.toLocaleString()}\nThe turnaround time is ${exampleValidTAT2} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleValidSubmit2,
    exampleValidTAT2
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}\n`);
}

// 6. Next day - next year ✅
console.log(
  `Issue has been submitted at ${exampleValidSubmit3.toLocaleString()}\nThe turnaround time is ${exampleValidTAT2} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleValidSubmit3,
    exampleValidTAT2
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(`Error has occured during calculation. ${err}\n`);
}

// 7. Zero as TAT input ✅
console.log(
  `Issue has been submitted at ${exampleValidSubmit.toLocaleString()}\nThe turnaround time is ${exampleInvalidTAT} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleValidSubmit,
    exampleInvalidTAT
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
  `Issue has been submitted at ${exampleValidSubmit.toLocaleString()}\nThe turnaround time is ${exampleInvalidTAT2} hours\n`
);
try {
  let exampleEstimation = calculateDueDate(
    exampleValidSubmit,
    exampleInvalidTAT2
  );
  console.log(
    `The estimated due date is ${exampleEstimation.toLocaleString()}\n`
  );
} catch (err) {
  console.log(
    `Error has occured during calculation. Request cannot be negative.\n ${err}\n`
  );
}
