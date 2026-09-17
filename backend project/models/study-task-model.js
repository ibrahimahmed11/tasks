const mongoose = require("mongoose");

const studyTaskSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    course: { type: String, default: "Independent study" },
    due: { type: String, default: "Today" },
    type: { type: String, default: "Personal" },
    done: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("StudyTask", studyTaskSchema);
