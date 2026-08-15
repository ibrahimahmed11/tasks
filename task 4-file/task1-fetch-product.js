/**
 * TASK 1: Fetch Product Information
 * Look up a product by ID from a simulated database using a Promise.
 */

const products = {
  1: "Laptop",
  2: "Phone",
  3: "Tablet",
};

function getProduct(id) {
  return new Promise((resolve, reject) => {
    const product = products[id];

    if (product) {
      resolve(product);
    } else {
      reject(`Error: Product with ID ${id} not found`);
    }
  });
}

// --- Run examples ---

// Valid ID
getProduct(2)
  .then((product) => console.log(product))
  .catch((error) => console.log(error));

// Invalid ID
getProduct(99)
  .then((product) => console.log(product))
  .catch((error) => console.log(error));

module.exports = { getProduct, products };
