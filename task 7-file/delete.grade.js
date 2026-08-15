const { readGrades } = require('./read.grades');
const saveGrades = require('./save.grades');

/**
 * Deletes a student's grade record(s).
 *   - By numeric ID: deleteGrade(2) removes that single record.
 *   - By name: deleteGrade('Alice') removes ALL of that student's records.
 * @param {number|string} idOrName - Record ID (number) or student name (string).
 * @returns {number} Count of records removed.
 */
function deleteGrade(idOrName) {
  const grades = readGrades();

  const remaining =
    typeof idOrName === 'number'
      ? grades.filter((r) => r.id !== idOrName)
      : grades.filter((r) => r.name !== idOrName);

  const removedCount = grades.length - remaining.length;

  if (removedCount === 0) {
    console.log(`No grade record found for "${idOrName}".`);
    return 0;
  }

  saveGrades(remaining);
  console.log(`Deleted ${removedCount} grade record(s) for "${idOrName}".`);
  return removedCount;
}

module.exports = deleteGrade;
