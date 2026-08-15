const addToCart = require('./modules/addToCart');
const removeFromCart = require('./modules/removeFromCart');
const listCart = require('./modules/listCart');
const calculateTotal = require('./modules/calculateTotal');

// --- Demo flow ---
addToCart(1, 2); // 2x Wireless Mouse
addToCart(3); // 1x USB-C Hub
addToCart(5, 1); // 1x Webcam 1080p
addToCart(99); // Invalid product

listCart();

removeFromCart(3);
console.log();

listCart();

console.log(`\nTotal: $${calculateTotal().toFixed(2)}`);
