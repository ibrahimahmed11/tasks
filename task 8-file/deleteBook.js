const { readBooks, writeBooks } = require('../bookStore');
const { sendJSON } = require('../utils/response');

/**
 * DELETE /books/:id
 * Removes the book matching the given ID from books.json.
 * @param {string} idParam - The raw :id segment extracted from the URL.
 */
function deleteBook(req, res, idParam) {
  const bookId = Number(idParam);

  if (!Number.isInteger(bookId)) {
    sendJSON(res, 400, { error: `Invalid book ID "${idParam}". Must be a number.` });
    return;
  }

  try {
    const books = readBooks();
    const index = books.findIndex((b) => b.id === bookId);

    if (index === -1) {
      sendJSON(res, 404, { error: `Book with ID ${bookId} not found.` });
      return;
    }

    const [removed] = books.splice(index, 1);
    writeBooks(books);

    sendJSON(res, 200, { message: 'Book deleted successfully.', book: removed });
  } catch (err) {
    sendJSON(res, 500, {
      error: 'Failed to delete book.',
      details: err.message,
    });
  }
}

module.exports = deleteBook;
