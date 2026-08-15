const students = require('../data/students');
const calculateAverage = require('./calculateAverage');

/**
 * Logs all students with their grades and average.
 */
function listStudents() {
  if (students.length === 0) {
    console.log('No students in the gradebook.');
    return;
  }

  console.log('--- Students ---');
  students.forEach((student) => {
    const avg = calculateAverage(student.grades);
    console.log(
      `${student.name} | Grades: [${student.grades.join(', ')}] | Average: ${avg}`
    );
  });
  console.log('----------------');
}

module.exports = listStudents;
