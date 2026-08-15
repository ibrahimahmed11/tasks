/**
 * Calculates the average of an array of grades.
 * @param {number[]} grades - Array of grade numbers.
 * @returns {number} The average, rounded to 2 decimal places (0 if no grades).
 */
function calculateAverage(grades) {
  if (!grades || grades.length === 0) return 0;
  const sum = grades.reduce((total, grade) => total + grade, 0);
  return Math.round((sum / grades.length) * 100) / 100;
}

module.exports = calculateAverage;
