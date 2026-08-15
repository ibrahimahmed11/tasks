/**
 * 3️⃣ JAVASCRIPT RUNTIME & EVENT LOOP
 * Sync code runs first (call stack). Timers (even 0ms) wait until
 * the call stack is empty before their callback runs.
 */

// --- Example 1: Predict the output before running ---
// Predicted order: "A", "D", "B"
// Reason: setTimeout callbacks always run after all synchronous code,
// even with a 0ms delay.
function predictOutputExample() {
  console.log("A"); // 1. runs immediately (sync)
  setTimeout(() => {
    console.log("B"); // 3. runs after the call stack is empty
  }, 0);
  console.log("D"); // 2. runs immediately (sync)
}

// --- Example 2: Mixing sync logs with setTimeout(0) ---
function mixedSyncAndAsync() {
  console.log("1: Sync - Start");

  setTimeout(() => {
    console.log("2: Async - Inside setTimeout(0)");
  }, 0);

  console.log("3: Sync - End");

  // Explanation:
  // Even though the delay is 0ms, the setTimeout callback is placed in the
  // task queue and only runs AFTER the current synchronous code finishes.
  // Output order: "1: Sync - Start" -> "3: Sync - End" -> "2: Async..."
}

// --- Example 3: JS executes line by line despite async behavior ---
function lineByLineDemo() {
  console.log("Line 1: executed first");
  console.log("Line 2: executed second");

  setTimeout(() => {
    console.log("Line 4: executed last (delayed)");
  }, 100);

  console.log("Line 3: executed third");
  // JS never "waits" for the timeout — it keeps executing the next lines,
  // and only comes back to the timeout callback once the stack is clear.
}

// --- Example 4: Async tasks wait until the call stack is empty ---
function callStackDemo() {
  function taskA() {
    console.log("Task A: running");
  }

  function taskB() {
    console.log("Task B: running");
  }

  console.log("Main script: start");

  setTimeout(() => {
    console.log("Timeout callback: call stack was empty, now I run");
  }, 0);

  taskA();
  taskB();

  console.log("Main script: end");
  // The timeout callback only fires after taskA(), taskB(), and all
  // remaining synchronous code have finished running.
}

// --- Run everything ---
predictOutputExample();
console.log("---");
mixedSyncAndAsync();
console.log("---");
lineByLineDemo();
console.log("---");
callStackDemo();

module.exports = {
  predictOutputExample,
  mixedSyncAndAsync,
  lineByLineDemo,
  callStackDemo,
};
