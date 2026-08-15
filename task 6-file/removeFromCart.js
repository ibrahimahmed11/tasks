const cart = require('../data/cart');

/**
 * Removes a product from the cart by its ID.
 * @param {number} productId - ID of the product to remove.
 * @returns {boolean} True if an item was removed, false otherwise.
 */
function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);

  if (index === -1) {
    console.log(`Item with ID ${productId} is not in the cart.`);
    return false;
  }

  const [removed] = cart.splice(index, 1);
  console.log(`Removed "${removed.name}" from cart.`);
  return true;
}

module.exports = removeFromCart;
