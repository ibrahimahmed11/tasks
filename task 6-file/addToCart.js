const products = require('../data/products');
const cart = require('../data/cart');

/**
 * Adds a product to the cart by its ID.
 * If the product is already in the cart, increases its quantity.
 * @param {number} productId - ID of the product to add.
 * @param {number} quantity - How many units to add (default 1).
 * @returns {object|null} The cart entry that was added/updated, or null if not found.
 */
function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    console.log(`Product with ID ${productId} not found.`);
    return null;
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });
  }

  console.log(`Added ${quantity} x "${product.name}" to cart.`);
  return existingItem || cart[cart.length - 1];
}

module.exports = addToCart;
