const mongoose = require("mongoose");

const studyCourseSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, unique: true },
    color: { type: String, required: true },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    next: { type: String, default: "No upcoming work yet" },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("StudyCourse", studyCourseSchema);
