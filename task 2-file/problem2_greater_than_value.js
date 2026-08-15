/**
 * Problem 2: Return Numbers Greater Than a Value
 * ---------------------------------------------------
 * Returns a new array containing only the numbers from `arr`
 * that are strictly greater than `value`.
 * Uses a plain loop only — no built-in .filter().
 */

function getNumbersGreaterThan(arr, value) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > value) {
      result.push(arr[i]);
    }
  }

  return result;
}

// ---------------------------------------------------------------------
// Test Scenarios
// ---------------------------------------------------------------------
console.log("=== Problem 2: Return Numbers Greater Than a Value ===\n");

const testCases = [
  { arr: [1, 5, 10, 3, 8], value: 4, expected: [5, 10, 8] },
  { arr: [1, 2, 3], value: 10, expected: [] },
  { arr: [-5, 0, 5, 10], value: -1, expected: [0, 5, 10] },
  { arr: [], value: 5, expected: [] },
  { arr: [7, 7, 7], value: 7, expected: [] }, // strictly greater, not equal
];

testCases.forEach(({ arr, value, expected }) => {
  const result = getNumbersGreaterThan(arr, value);
  const isMatch = JSON.stringify(result) === JSON.stringify(expected);
  const status = isMatch ? "✅ PASS" : "❌ FAIL";
  console.log(
    `getNumbersGreaterThan([${arr}], ${value}) -> [${result}] (expected: [${expected}]) ${status}`
  );
});

module.exports = getNumbersGreaterThan;
