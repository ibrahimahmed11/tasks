/**
 * 4️⃣ CALLBACK FUNCTIONS
 * A callback is a function passed as an argument to another function,
 * to be executed after some work is done.
 */

// --- Example 1: Greet a user, then run a callback ---
function greetUser(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

// --- Example 2: Calculator using a callback for the operation ---
function calculate(a, b, operationCallback) {
  return operationCallback(a, b);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

// --- Example 3: Simulate loading data, then call a callback ---
function loadData(callback) {
  console.log("Loading data...");
  setTimeout(() => {
    const data = { id: 1, name: "Sample Data" };
    callback(data);
  }, 1500);
}

// --- Example 4: Simple authentication flow using callbacks ---
function login(username, password, onSuccess, onFailure) {
  console.log(`Attempting login for "${username}"...`);

  setTimeout(() => {
    const isValid = username === "admin" && password === "1234";

    if (isValid) {
      onSuccess(username);
    } else {
      onFailure("Invalid username or password");
    }
  }, 1000);
}

function onLoginSuccess(username) {
  console.log(`Login successful! Welcome, ${username}.`);
  goToDashboard();
}

function onLoginFailure(errorMessage) {
  console.log(`Login failed: ${errorMessage}`);
}

function goToDashboard() {
  console.log("Redirecting to dashboard...");
}

// --- Run everything ---

// Example 1
greetUser("Alex", () => {
  console.log("Callback executed after greeting.");
});

// Example 2
console.log("Add:", calculate(5, 3, add));
console.log("Subtract:", calculate(5, 3, subtract));
console.log("Multiply:", calculate(5, 3, multiply));

// Example 3
loadData((data) => {
  console.log("Data loaded:", data);
});

// Example 4
login("admin", "1234", onLoginSuccess, onLoginFailure);
login("admin", "wrongpass", onLoginSuccess, onLoginFailure);

module.exports = {
  greetUser,
  calculate,
  add,
  subtract,
  multiply,
  loadData,
  login,
};
