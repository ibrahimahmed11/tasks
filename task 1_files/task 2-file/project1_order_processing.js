/**
 * Project 1: Online Store Order Processing System
 * --------------------------------------------------
 * Processes an array of orders one by one, in order, applying
 * skip/process rules and two early-stop conditions.
 *
 * Assumptions (stated explicitly since the spec left them open):
 * - "processed orders count" = every order the loop looked at
 *   before stopping (skipped orders included), since the system
 *   walks through orders one by one regardless of outcome.
 * - "3 skipped orders in a row" resets to 0 whenever a successful
 *   order is processed (i.e., it must be 3 *consecutive* skips).
 * - "total stock failures reach 3 times" is a running total across
 *   the whole run (not required to be consecutive) — any order
 *   with stockAvailable === false counts, even if it was also
 *   cancelled/invalid.
 */

function processOrders(orders) {
  let totalRevenue = 0;
  let successfulOrders = 0;
  let processedOrdersCount = 0;
  let consecutiveSkips = 0;
  let stockFailures = 0;
  let stopMessage = null;

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    processedOrdersCount++;

    const isStockUnavailable = order.stockAvailable === false;
    const isCancelledOrInvalid =
      order.status === "cancelled" || order.status === "invalid";
    const shouldSkip = isCancelledOrInvalid || isStockUnavailable;

    if (isStockUnavailable) {
      stockFailures++;
    }

    if (shouldSkip) {
      consecutiveSkips++;
      console.log(
        `⏭️  Order ${order.id} skipped (status: ${order.status}, stockAvailable: ${order.stockAvailable})`
      );
    } else {
      // status is "valid" AND stock is available
      totalRevenue += order.amount;
      successfulOrders++;
      consecutiveSkips = 0; // reset streak on a successful order
      console.log(`✅ Order ${order.id} processed (+$${order.amount})`);
    }

    // Stop conditions checked after handling the current order
    if (consecutiveSkips >= 3 || stockFailures >= 3) {
      stopMessage = "System stopped due to critical failure";
      console.log(`🚨 ${stopMessage}`);
      break;
    }
  }

  return {
    totalRevenue,
    successfulOrders,
    processedOrdersCount,
    stopMessage, // null if the system processed all orders without stopping early
  };
}

// ---------------------------------------------------------------------
// Test Scenarios
// ---------------------------------------------------------------------
console.log("=== Project 1: Online Store Order Processing System ===\n");

console.log("--- Scenario 1: Normal run, no early stop ---");
const orders1 = [
  { id: 1, status: "valid", stockAvailable: true, amount: 100 },
  { id: 2, status: "cancelled", stockAvailable: true, amount: 50 },
  { id: 3, status: "valid", stockAvailable: true, amount: 200 },
  { id: 4, status: "invalid", stockAvailable: true, amount: 30 },
  { id: 5, status: "valid", stockAvailable: true, amount: 150 },
];
console.log(processOrders(orders1));

console.log("\n--- Scenario 2: Stops after 3 skipped orders in a row ---");
const orders2 = [
  { id: 1, status: "valid", stockAvailable: true, amount: 100 },
  { id: 2, status: "cancelled", stockAvailable: true, amount: 40 },
  { id: 3, status: "invalid", stockAvailable: true, amount: 60 },
  { id: 4, status: "valid", stockAvailable: false, amount: 80 }, // 3rd consecutive skip -> stop
  { id: 5, status: "valid", stockAvailable: true, amount: 500 }, // never reached
];
console.log(processOrders(orders2));

console.log("\n--- Scenario 3: Stops after 3 total stock failures (not consecutive) ---");
const orders3 = [
  { id: 1, status: "valid", stockAvailable: false, amount: 100 }, // stock failure 1
  { id: 2, status: "valid", stockAvailable: true, amount: 200 },  // resets skip streak
  { id: 3, status: "valid", stockAvailable: false, amount: 60 },  // stock failure 2
  { id: 4, status: "valid", stockAvailable: true, amount: 90 },   // resets skip streak
  { id: 5, status: "valid", stockAvailable: false, amount: 70 },  // stock failure 3 -> stop
  { id: 6, status: "valid", stockAvailable: true, amount: 999 },  // never reached
];
console.log(processOrders(orders3));

module.exports = processOrders;
