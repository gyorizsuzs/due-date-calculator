const calculateDueDate = require('./calculateDueDate');

const testCases = [
  // zero
  // minus
  // early
  // late
  // weekend
  // same day
  // next day - weekday
  // next day - weekend
  // next day - end of year
];

test('Submitted turnaround time cannot be zero.', () => {
  expect(calculateDueDate(testCases[0])).toBe('');
});
test('Submitted turnaround time cannot be negative.', () => {
  expect(calculateDueDate(testCases[1])).toBe('');
});
test('Submitted turnaround time is too early.', () => {
  expect(calculateDueDate(testCases[2])).toBe('');
});
test('Submitted turnaround time is too late.', () => {
  expect(calculateDueDate(testCases[3])).toBe('');
});
test('Submitted turnaround time has to end on a weekday.', () => {
  expect(calculateDueDate(testCases[4])).toBe('');
});
test('Turnaround time will end same day.', () => {
  expect(calculateDueDate(testCases[5])).toBe('');
});
test('Turnaround time will end next day.', () => {
  expect(calculateDueDate(testCases[6])).toBe('');
});
test('Turnaround time will end next week.', () => {
  expect(calculateDueDate(testCases[7])).toBe('');
});
test('Turnaround time will end next year.', () => {
  expect(calculateDueDate(testCases[8])).toBe('');
});
