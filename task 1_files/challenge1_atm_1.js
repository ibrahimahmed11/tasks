/**
 * Challenge 1: ATM Banking System
 * --------------------------------
 * Simulates an ATM that requires a correct PIN before allowing
 * withdraw, deposit, balance-check, or PIN-change operations.
 * The account locks after 3 incorrect PIN attempts (bonus).
 */

class ATM {
  #pin;              // private: current PIN
  #balance;           // private: current balance
  #incorrectAttempts; // private: counts wrong PIN entries
  #isLocked;          // private: account lock status

  constructor(initialPin, initialBalance = 0) {
    this.#pin = initialPin;
    this.#balance = initialBalance;
    this.#incorrectAttempts = 0;
    this.#isLocked = false;
  }

  /** Validates the entered PIN before any operation. Returns true/false. */
  #validatePin(enteredPin) {
    if (this.#isLocked) {
      console.log("❌ Account is locked due to too many incorrect PIN attempts.");
      return false;
    }

    if (enteredPin === this.#pin) {
      this.#incorrectAttempts = 0; // reset on success
      return true;
    }

    this.#incorrectAttempts++;
    const remaining = 3 - this.#incorrectAttempts;

    if (this.#incorrectAttempts >= 3) {
      this.#isLocked = true;
      console.log("❌ Incorrect PIN. Account is now LOCKED after 3 failed attempts.");
    } else {
      console.log(`❌ Incorrect PIN. ${remaining} attempt(s) remaining.`);
    }
    return false;
  }

  withdraw(enteredPin, amount) {
    if (!this.#validatePin(enteredPin)) return;

    if (amount <= 0) {
      console.log("❌ Withdrawal amount must be greater than zero.");
      return;
    }

    if (amount > this.#balance) {
      console.log(`❌ Insufficient funds. Current balance: $${this.#balance}`);
      return;
    }

    this.#balance -= amount;
    console.log(`✅ Withdrew $${amount}. New balance: $${this.#balance}`);
  }

  deposit(enteredPin, amount) {
    if (!this.#validatePin(enteredPin)) return;

    if (amount <= 0) {
      console.log("❌ Deposit amount must be greater than zero.");
      return;
    }

    this.#balance += amount;
    console.log(`✅ Deposited $${amount}. New balance: $${this.#balance}`);
  }

  checkBalance(enteredPin) {
    if (!this.#validatePin(enteredPin)) return;
    console.log(`✅ Current balance: $${this.#balance}`);
  }

  changePin(enteredPin, newPin) {
    if (!this.#validatePin(enteredPin)) return;

    const isFourDigits = /^\d{4}$/.test(newPin);
    if (!isFourDigits) {
      console.log("❌ New PIN must contain exactly four digits.");
      return;
    }

    this.#pin = newPin;
    console.log("✅ PIN changed successfully.");
  }
}

// ---------------------------------------------------------------------
// Test Scenarios
// ---------------------------------------------------------------------
console.log("=== Challenge 1: ATM Banking System ===\n");

const atm = new ATM("1234", 500);

console.log("--- Check balance with correct PIN ---");
atm.checkBalance("1234"); // success

console.log("\n--- Deposit money ---");
atm.deposit("1234", 200);  // success -> 700
atm.deposit("1234", -50);  // error: must be > 0

console.log("\n--- Withdraw money ---");
atm.withdraw("1234", 300);  // success -> 400
atm.withdraw("1234", 10000); // error: insufficient funds

console.log("\n--- Change PIN ---");
atm.changePin("1234", "12"); // error: not 4 digits
atm.changePin("1234", "4321"); // success

console.log("\n--- Using old PIN after change (should fail) ---");
atm.checkBalance("1234"); // wrong pin now (1 attempt)

console.log("\n--- Confirm new PIN works ---");
atm.checkBalance("4321"); // success

console.log("\n--- Bonus: Lock account after 3 wrong attempts ---");
const atm2 = new ATM("0000", 1000);
atm2.checkBalance("1111"); // wrong (1)
atm2.checkBalance("2222"); // wrong (2)
atm2.checkBalance("3333"); // wrong (3) -> locked
atm2.checkBalance("0000"); // still locked, even with correct PIN

module.exports = ATM;
