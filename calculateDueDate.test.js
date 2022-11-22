const calculateDueDate = require('./calculateDueDate');

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

const exampleEstimation = [
  new Date(Date.UTC(2022, 10, 22, 14, 1)),
  new Date(Date.UTC(2022, 10, 23, 9, 1)),
  new Date(Date.UTC(2022, 10, 28, 9, 1)),
  new Date(Date.UTC(2023, 0, 2, 9, 1)),
];

test('Submitted turnaround time cannot be zero.', () => {
  expect(() =>
    calculateDueDate(exampleValidSubmit[0], exampleInvalidTAT[0])
  ).toThrow('Cannot submit: invalid request.');
});
test('Submitted turnaround time cannot be negative.', () => {
  expect(() =>
    calculateDueDate(exampleValidSubmit[0], exampleInvalidTAT[1])
  ).toThrow('Cannot submit: invalid request.');
});
test('Submitted turnaround time is too early.', () => {
  expect(() =>
    calculateDueDate(exampleInvalidSubmit[0], exampleValidTAT[0])
  ).toThrow('Cannot submit: invalid request.');
});
test('Submitted turnaround time is too late.', () => {
  expect(() =>
    calculateDueDate(exampleInvalidSubmit[1], exampleValidTAT[0])
  ).toThrow('Cannot submit: invalid request.');
});
test('Turnaround time will end same day.', () => {
  expect(calculateDueDate(exampleValidSubmit[0], exampleValidTAT[0])).toEqual(
    exampleEstimation[0]
  );
});
test('Turnaround time will end next day.', () => {
  expect(calculateDueDate(exampleValidSubmit[0], exampleValidTAT[1])).toEqual(
    exampleEstimation[1]
  );
});
test('Turnaround time will end next week.', () => {
  expect(calculateDueDate(exampleValidSubmit[1], exampleValidTAT[1])).toEqual(
    exampleEstimation[2]
  );
});
test('Turnaround time will end next year.', () => {
  expect(calculateDueDate(exampleValidSubmit[2], exampleValidTAT[1])).toEqual(
    exampleEstimation[3]
  );
});
