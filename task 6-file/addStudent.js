const students = require('../data/students');

let nextId = 1;

/**
 * Adds a student with an array of grades.
 * @param {string} name - Student's name.
 * @param {number[]} grades - Array of grade numbers (0-100).
 * @returns {object} The newly created student record.
 */
function addStudent(name, grades = []) {
  const student = { id: nextId++, name, grades };
  students.push(student);
  console.log(`Added student "${name}" with grades [${grades.join(', ')}].`);
  return student;
}

module.exports = addStudent;
