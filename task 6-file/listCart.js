const cart = require('../data/cart');

/**
 * Logs all items currently in the cart.
 */
function listCart() {
  if (cart.length === 0) {
    console.log('Your cart is empty.');
    return;
  }

  console.log('--- Cart Items ---');
  cart.forEach((item) => {
    const lineTotal = (item.price * item.quantity).toFixed(2);
    console.log(
      `${item.name} | Qty: ${item.quantity} | Price: $${item.price.toFixed(2)} | Subtotal: $${lineTotal}`
    );
  });
  console.log('------------------');
}

module.exports = listCart;
