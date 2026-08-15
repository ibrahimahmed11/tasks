const { readGrades } = require('./read.grades');
const saveGrades = require('./save.grades');

/**
 * Adds a new grade record for a student and persists it to grades.json.
 * @param {string} name - Student's name.
 * @param {string} subject - Subject name.
 * @param {number} grade - Grade/score value.
 * @returns {object} The newly created grade record.
 */
function addGrade(name, subject, grade) {
  const grades = readGrades();

  const nextId = grades.length > 0 ? Math.max(...grades.map((r) => r.id)) + 1 : 1;

  const record = { id: nextId, name, subject, grade: Number(grade) };
  grades.push(record);
  saveGrades(grades);

  console.log(`Added grade record: ${name} | ${subject} | ${grade}`);
  return record;
}

module.exports = addGrade;
