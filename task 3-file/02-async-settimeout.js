/**
 * 2️⃣ ASYNCHRONOUS BASICS (setTimeout)
 * setTimeout schedules code to run later, without blocking the rest of the program.
 */

// --- Example 1: "Hello" immediately, "World" after 2 seconds ---
function helloWorldDelayed() {
  console.log("Hello");
  setTimeout(() => {
    console.log("World");
  }, 2000);
}

// --- Example 2: Print numbers 1 to 5, each after a 1 second delay ---
function printNumbersWithDelay(max = 5, delayMs = 1000) {
  for (let i = 1; i <= max; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * delayMs);
  }
}

// --- Example 3: "Loading..." instantly, "Done" after 3 seconds ---
function loadingSequence() {
  console.log("Loading...");
  setTimeout(() => {
    console.log("Done");
  }, 3000);
}

// --- Example 4: Delayed message system ---
function sendDelayedMessage(message, delayMs) {
  console.log(`Message scheduled: "${message}" (in ${delayMs}ms)`);
  setTimeout(() => {
    console.log(`New message: ${message}`);
  }, delayMs);
}

// --- Run everything ---
helloWorldDelayed();
printNumbersWithDelay();
loadingSequence();
sendDelayedMessage("Meeting starts in 5 minutes", 2500);

module.exports = {
  helloWorldDelayed,
  printNumbersWithDelay,
  loadingSequence,
  sendDelayedMessage,
};
