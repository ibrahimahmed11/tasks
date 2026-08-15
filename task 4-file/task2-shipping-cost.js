/**
 * TASK 2: Calculate Shipping Cost
 * Shipping cost = weight × 5. Rejects if weight is zero or negative.
 */

function calculateShipping(weight) {
  return new Promise((resolve, reject) => {
    if (weight <= 0) {
      reject("Invalid weight");
      return;
    }

    const cost = weight * 5;
    resolve(`Shipping cost: ${cost}`);
  });
}

// --- Run examples ---

// Valid weight
calculateShipping(10)
  .then((cost) => console.log(cost))
  .catch((error) => console.log(error));

// Invalid weight
calculateShipping(-2)
  .then((cost) => console.log(cost))
  .catch((error) => console.log(error));

module.exports = { calculateShipping };
