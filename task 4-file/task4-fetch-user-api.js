/**
 * TASK 4: Fetch User Profile From API
 * Fetches a user from JSONPlaceholder and displays their name and email.
 *
 * NOTE: This file requires internet access to run, since it makes a real
 * network request to https://jsonplaceholder.typicode.com. It will work
 * in any normal Node.js (v18+, which has global fetch) or browser
 * environment with network access.
 */

async function getUserProfile(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    if (!response.ok) {
      throw new Error(`User with ID ${id} not found`);
    }

    const user = await response.json();

    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
  } catch (error) {
    console.log(`Error fetching user profile: ${error.message}`);
  }
}

// --- Run example ---
getUserProfile(1);

module.exports = { getUserProfile };
