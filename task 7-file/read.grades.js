const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'grades.json');

/**
 * Reads all grade records from grades.json.
 * @returns {object[]} Array of grade records ({ id, name, subject, grade }).
 */
function readGrades() {
  if (!fs.existsSync(DATA_PATH)) {
    return [];
  }
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return raw.trim() ? JSON.parse(raw) : [];
}

/**
 * Reads and logs all grade records in a readable table format.
 */
function displayGrades() {
  const grades = readGrades();

  if (grades.length === 0) {
    console.log('No grade records found.');
    return;
  }

  console.log('--- Student Grades ---');
  grades.forEach((record) => {
    console.log(
      `ID: ${record.id} | Name: ${record.name} | Subject: ${record.subject} | Grade: ${record.grade}`
    );
  });
  console.log('-----------------------');
}

module.exports = { readGrades, displayGrades };
