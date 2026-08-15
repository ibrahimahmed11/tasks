const { readGrades } = require('./read.grades');
const saveGrades = require('./save.grades');

/**
 * Updates an existing student's grade.
 * Lookup works two ways:
 *   - By numeric ID: updateGrade(3, null, 95)
 *   - By name + subject: updateGrade('Alice', 'History', 95)
 * @param {number|string} idOrName - Record ID (number) or student name (string).
 * @param {string|null} subject - Required when looking up by name (to disambiguate
 *                                 a student with grades in multiple subjects).
 * @param {number} newGrade - The new grade value to set.
 * @returns {object|null} The updated record, or null if no match was found.
 */
function updateGrade(idOrName, subject, newGrade) {
  const grades = readGrades();

  let record;
  if (typeof idOrName === 'number') {
    record = grades.find((r) => r.id === idOrName);
  } else {
    record = grades.find((r) => r.name === idOrName && r.subject === subject);
  }

  if (!record) {
    console.log(`No matching grade record found for "${idOrName}".`);
    return null;
  }

  record.grade = Number(newGrade);
  saveGrades(grades);

  console.log(`Updated ${record.name}'s ${record.subject} grade to ${record.grade}.`);
  return record;
}

module.exports = updateGrade;
