const { readBooks } = require('../bookStore');
const { sendJSON } = require('../utils/response');

/**
 * GET /books
 * Returns all books stored in books.json.
 */
function getAllBooks(req, res) {
  try {
    const books = readBooks();
    sendJSON(res, 200, books);
  } catch (err) {
    sendJSON(res, 500, {
      error: 'Failed to read books data.',
      details: err.message,
    });
  }
}

module.exports = getAllBooks;
