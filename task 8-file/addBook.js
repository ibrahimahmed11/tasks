const { readBooks, writeBooks, getNextId } = require('../bookStore');
const { sendJSON } = require('../utils/response');

const MAX_BODY_SIZE = 1e6; // 1MB safety cap on request body size

/**
 * POST /books
 * Reads the request body, validates it, generates an ID, appends the
 * new book to books.json, and returns the created record.
 */
function addBook(req, res) {
  let body = '';
  let tooLarge = false;

  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > MAX_BODY_SIZE) {
      tooLarge = true;
      req.destroy();
    }
  });

  req.on('end', () => {
    if (tooLarge) {
      sendJSON(res, 413, { error: 'Request body too large.' });
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch (err) {
      sendJSON(res, 400, { error: 'Invalid JSON in request body.' });
      return;
    }

    const { title, author, price, available } = parsed;

    if (!title || typeof title !== 'string') {
      sendJSON(res, 400, { error: '"title" is required and must be a string.' });
      return;
    }
    if (!author || typeof author !== 'string') {
      sendJSON(res, 400, { error: '"author" is required and must be a string.' });
      return;
    }
    if (price === undefined || typeof price !== 'number' || Number.isNaN(price)) {
      sendJSON(res, 400, { error: '"price" is required and must be a number.' });
      return;
    }

    try {
      const books = readBooks();

      const newBook = {
        id: getNextId(books),
        title,
        author,
        price,
        available: typeof available === 'boolean' ? available : true,
      };

      books.push(newBook);
      writeBooks(books);

      sendJSON(res, 201, newBook);
    } catch (err) {
      sendJSON(res, 500, {
        error: 'Failed to save book data.',
        details: err.message,
      });
    }
  });

  req.on('error', (err) => {
    sendJSON(res, 500, { error: 'Request error.', details: err.message });
  });
}

module.exports = addBook;
