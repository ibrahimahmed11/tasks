/**
 * Challenge 3: University Student Portal
 * -----------------------------------------
 * Determines pass/fail status, letter grade, and scholarship
 * eligibility for a student, based on attendance, scores, and
 * tuition payment status.
 */

const REQUIRED_ATTENDANCE = 75; // % minimum attendance to be eligible
const PASSING_SCORE = 60;       // minimum total score to pass
const SCHOLARSHIP_THRESHOLD = 90; // minimum total score for scholarship

// Weighting used to compute the total score out of 100
const WEIGHTS = {
  midterm: 0.3,
  finalExam: 0.5,
  assignment: 0.2,
};

function getLetterGrade(totalScore) {
  if (totalScore >= 90) return "A";
  if (totalScore >= 80) return "B";
  if (totalScore >= 70) return "C";
  if (totalScore >= 60) return "D";
  return "F";
}

function evaluateStudent({
  studentName,
  attendancePercentage,
  midtermScore,
  finalExamScore,
  assignmentScore,
  tuitionPaid,
}) {
  console.log(`===== Student Portal: ${studentName} =====`);

  // Business rule: unpaid tuition blocks access to results entirely
  if (!tuitionPaid) {
    console.log("❌ Tuition is unpaid. You cannot view your results.");
    console.log("=======================================\n");
    return;
  }

  // Business rule: attendance below the requirement is an automatic fail
  if (attendancePercentage < REQUIRED_ATTENDANCE) {
    console.log(`Attendance: ${attendancePercentage}% (required: ${REQUIRED_ATTENDANCE}%)`);
    console.log("❌ Status: FAILED (insufficient attendance)");
    console.log("=======================================\n");
    return;
  }

  // Total score calculation
  const totalScore =
    midtermScore * WEIGHTS.midterm +
    finalExamScore * WEIGHTS.finalExam +
    assignmentScore * WEIGHTS.assignment;

  const letterGrade = getLetterGrade(totalScore);
  const hasPassed = totalScore >= PASSING_SCORE;

  console.log(`Attendance:       ${attendancePercentage}%`);
  console.log(`Midterm Score:    ${midtermScore}`);
  console.log(`Final Exam Score: ${finalExamScore}`);
  console.log(`Assignment Score: ${assignmentScore}`);
  console.log(`Total Score:      ${totalScore.toFixed(2)} / 100`);
  console.log(`Letter Grade:     ${letterGrade}`);
  console.log(`Status:           ${hasPassed ? "✅ PASSED" : "❌ FAILED"}`);

  // Bonus: scholarship eligibility message
  if (totalScore >= SCHOLARSHIP_THRESHOLD) {
    console.log("🏆 Congratulations! You are eligible for a scholarship.");
  }

  console.log("=======================================\n");
}

// ---------------------------------------------------------------------
// Test Scenarios
// ---------------------------------------------------------------------
console.log("=== Challenge 3: University Student Portal ===\n");

// Outstanding student -> pass + scholarship eligible
evaluateStudent({
  studentName: "Nour Ibrahim",
  attendancePercentage: 95,
  midtermScore: 95,
  finalExamScore: 98,
  assignmentScore: 90,
  tuitionPaid: true,
});

// Average student -> pass, no scholarship
evaluateStudent({
  studentName: "Karim Fathy",
  attendancePercentage: 80,
  midtermScore: 70,
  finalExamScore: 65,
  assignmentScore: 75,
  tuitionPaid: true,
});

// Fails due to low attendance (even though scores are high)
evaluateStudent({
  studentName: "Mona Tarek",
  attendancePercentage: 60,
  midtermScore: 90,
  finalExamScore: 88,
  assignmentScore: 92,
  tuitionPaid: true,
});

// Unpaid tuition -> cannot view results
evaluateStudent({
  studentName: "Hassan Reda",
  attendancePercentage: 85,
  midtermScore: 80,
  finalExamScore: 85,
  assignmentScore: 78,
  tuitionPaid: false,
});

module.exports = { evaluateStudent, getLetterGrade };
