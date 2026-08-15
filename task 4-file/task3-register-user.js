/**
 * TASK 3: Register New User with Email Verification
 * Validates input, then simulates sending a verification email
 * (via setTimeout wrapped in a Promise) using async/await.
 */

function sendVerificationEmail(email) {
  return new Promise((resolve) => {
    console.log("Sending verification email...");
    setTimeout(() => {
      resolve("Email sent successfully");
    }, 1500);
  });
}

async function registerUser(name, email) {
  try {
    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    const confirmation = await sendVerificationEmail(email);
    console.log(confirmation);
    console.log("User registered successfully");
  } catch (error) {
    console.log(`Registration failed: ${error.message}`);
  }
}

// --- Run examples ---

registerUser("Esraa", "esraa@gmail.com");

// Invalid example (missing email)
registerUser("Ahmed", "");

module.exports = { sendVerificationEmail, registerUser };
