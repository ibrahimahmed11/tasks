/**
 * 1️⃣ SYNCHRONOUS EXECUTION
 * Code runs top-to-bottom, one line at a time, in order.
 */

// --- Example 1: Log three messages in order ---
function logThreeMessages() {
  console.log("Start");
  console.log("Middle");
  console.log("End");
}

// --- Example 2: One function calls another, logging each step ---
function stepOne() {
  console.log("Step 1: Preparing data");
}

function stepTwo() {
  console.log("Step 2: Processing data");
}

function stepThree() {
  console.log("Step 3: Finishing up");
}

function runExecutionOrder() {
  console.log("Execution started");
  stepOne();
  stepTwo();
  stepThree();
  console.log("Execution finished");
}

// --- Example 3: Two sequential calculations ---
function calculateSum(a, b) {
  return a + b;
}

function calculateProduct(a, b) {
  return a * b;
}

function runCalculations() {
  const sum = calculateSum(5, 3);
  console.log("Sum:", sum);

  const product = calculateProduct(5, 3);
  console.log("Product:", product);
}

// --- Example 4: One function depends on another's result ---
function getBasePrice() {
  return 100;
}

function applyDiscount(price) {
  const discount = 0.1; // 10% off
  return price - price * discount;
}

function runPricingFlow() {
  const basePrice = getBasePrice();
  const finalPrice = applyDiscount(basePrice); // depends on basePrice
  console.log(`Base price: $${basePrice}, Final price: $${finalPrice}`);
}

// --- Run everything ---
logThreeMessages();
runExecutionOrder();
runCalculations();
runPricingFlow();

module.exports = {
  logThreeMessages,
  runExecutionOrder,
  runCalculations,
  runPricingFlow,
};
