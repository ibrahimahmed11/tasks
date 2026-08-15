/**
 * Problem 1: Check if Array is Sorted
 * ---------------------------------------
 * Returns true if the array is sorted in ascending order
 * (non-decreasing: equal neighboring values are still considered sorted).
 * Uses a plain loop only — no built-in sort/comparison helpers.
 */

function isSorted(arr) {
  // An array with 0 or 1 elements is trivially sorted
  if (arr.length <= 1) return true;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false; // found a value smaller than the one before it
    }
  }

  return true;
}

// ---------------------------------------------------------------------
// Test Scenarios
// ---------------------------------------------------------------------
console.log("=== Problem 1: Check if Array is Sorted ===\n");

const testCases = [
  { input: [1, 2, 3, 4, 5], expected: true },
  { input: [5, 3, 8, 1], expected: false },
  { input: [1, 1, 2, 2, 3], expected: true }, // equal values still sorted
  { input: [], expected: true },
  { input: [42], expected: true },
  { input: [10, 9, 8, 7], expected: false },
];

testCases.forEach(({ input, expected }) => {
  const result = isSorted(input);
  const status = result === expected ? "✅ PASS" : "❌ FAIL";
  console.log(`isSorted([${input}]) -> ${result} (expected: ${expected}) ${status}`);
});

module.exports = isSorted;
