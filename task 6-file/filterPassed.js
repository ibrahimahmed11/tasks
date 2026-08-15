const students = require('../data/students');
const calculateAverage = require('./calculateAverage');

/**
 * Filters students whose average grade is >= 60 (passing).
 * @returns {object[]} Array of student records who passed.
 */
function filterPassed() {
  return students.filter((student) => calculateAverage(student.grades) >= 60);
}

module.exports = filterPassed;
