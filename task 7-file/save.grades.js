const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'grades.json');

/**
 * Writes the given grades array to grades.json (pretty-printed).
 * @param {object[]} grades - Array of grade records to persist.
 */
function saveGrades(grades) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(grades, null, 2), 'utf-8');
}

module.exports = saveGrades;
