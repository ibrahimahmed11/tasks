/**
 * Sends a JSON response with the correct headers.
 * @param {import('http').ServerResponse} res
 * @param {number} statusCode - HTTP status code.
 * @param {object} data - Payload to serialize as JSON.
 */
function sendJSON(res, statusCode, data) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

module.exports = { sendJSON };
