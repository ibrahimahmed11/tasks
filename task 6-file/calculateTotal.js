const cart = require('../data/cart');

/**
 * Calculates the total price of all items in the cart.
 * @returns {number} Total price rounded to 2 decimal places.
 */
function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Math.round(total * 100) / 100;
}

module.exports = calculateTotal;
