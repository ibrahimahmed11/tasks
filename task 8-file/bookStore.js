const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'books.json');

/**
 * Reads and parses the full list of books from books.json.
 * Throws if the file can't be read or contains invalid JSON — callers
 * are expected to catch this and respond with a 500.
 * @returns {object[]} Array of book records.
 */
function readBooks() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return raw.trim() ? JSON.parse(raw) : [];
}

/**
 * Writes the given books array back to books.json (pretty-printed).
 * Throws if the file can't be written — callers should catch and respond 500.
 * @param {object[]} books - Full array of book records to persist.
 */
function writeBooks(books) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(books, null, 2), 'utf-8');
}

/**
 * Generates the next unique numeric ID based on the current highest ID.
 * @param {object[]} books - Current array of book records.
 * @returns {number} Next available ID.
 */
function getNextId(books) {
  return books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;
}

module.exports = { readBooks, writeBooks, getNextId, DATA_PATH };
