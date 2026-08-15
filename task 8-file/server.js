const http = require('http');

const getAllBooks = require('./modules/routes/getAllBooks');
const addBook = require('./modules/routes/addBook');
const deleteBook = require('./modules/routes/deleteBook');
const { sendJSON } = require('./modules/utils/response');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  try {
    // Strip query string, split into segments: "/books/3" -> ['books', '3']
    const pathname = req.url.split('?')[0];
    const segments = pathname.split('/').filter(Boolean);

    // GET /books
    if (req.method === 'GET' && segments.length === 1 && segments[0] === 'books') {
      return getAllBooks(req, res);
    }

    // POST /books
    if (req.method === 'POST' && segments.length === 1 && segments[0] === 'books') {
      return addBook(req, res);
    }

    // DELETE /books/:id
    if (req.method === 'DELETE' && segments.length === 2 && segments[0] === 'books') {
      return deleteBook(req, res, segments[1]);
    }

    // No matching route
    sendJSON(res, 404, { error: `Route ${req.method} ${pathname} not found.` });
  } catch (err) {
    sendJSON(res, 500, { error: 'Internal server error.', details: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`Library Book API running at http://localhost:${PORT}`);
});
