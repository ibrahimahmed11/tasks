const { displayGrades } = require('./modules/read.grades');
const addGrade = require('./modules/add.grade');
const updateGrade = require('./modules/update.grade');
const deleteGrade = require('./modules/delete.grade');

const [, , command, ...args] = process.argv;

function printUsage() {
  console.log(`
Student Grades Manager - CLI

Usage:
  node main.js read
  node main.js add <name> <subject> <grade>
  node main.js update <id> <newGrade>
  node main.js update <name> <subject> <newGrade>
  node main.js delete <id>
  node main.js delete <name>
  node main.js demo        (runs a full walkthrough of every operation)

Examples:
  node main.js add "Charlie" "Math" 88
  node main.js update 3 95
  node main.js update "Alice" "History" 95
  node main.js delete 2
  node main.js delete "Bob"
`);
}

/** Parses a string as a number if possible, otherwise returns it unchanged. */
function maybeNumber(value) {
  const n = Number(value);
  return Number.isNaN(n) ? value : n;
}

function run() {
  switch (command) {
    case 'read':
      displayGrades();
      break;

    case 'add': {
      const [name, subject, grade] = args;
      if (!name || !subject || grade === undefined) {
        console.log('Usage: node main.js add <name> <subject> <grade>');
        break;
      }
      addGrade(name, subject, grade);
      break;
    }

    case 'update': {
      if (args.length === 2) {
        // node main.js update <id> <newGrade>
        const [id, newGrade] = args;
        updateGrade(maybeNumber(id), null, newGrade);
      } else if (args.length === 3) {
        // node main.js update <name> <subject> <newGrade>
        const [name, subject, newGrade] = args;
        updateGrade(name, subject, newGrade);
      } else {
        console.log('Usage: node main.js update <id> <newGrade>');
        console.log('   or: node main.js update <name> <subject> <newGrade>');
      }
      break;
    }

    case 'delete': {
      const [idOrName] = args;
      if (idOrName === undefined) {
        console.log('Usage: node main.js delete <id|name>');
        break;
      }
      deleteGrade(maybeNumber(idOrName));
      break;
    }

    case 'demo':
      runDemo();
      break;

    default:
      printUsage();
  }
}

/** Walks through every module so the whole system can be exercised at once. */
function runDemo() {
  console.log('=== Initial grades ===');
  displayGrades();

  console.log('\n=== Adding a record ===');
  addGrade('Charlie', 'Math', 88);

  console.log('\n=== Updating by ID ===');
  updateGrade(1, null, 97);

  console.log('\n=== Updating by name + subject ===');
  updateGrade('Alice', 'History', 90);

  console.log('\n=== Deleting by ID ===');
  deleteGrade(2);

  console.log('\n=== Final grades ===');
  displayGrades();
}

run();
