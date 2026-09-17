const Course = require("../models/course-model");

function normalizeCourseFields(course) {
  if (course.category) course.category = course.category.toLowerCase();
  if (course.level) course.level = course.level.toLowerCase();
  return course;
}

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ status: "success", count: courses.length, data: { courses } });
  } catch (error) {
    res.status(400).json({ status: "error", message: `Failed to fetch courses: ${error.message}` });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ status: "fail", message: "Course not found" });
    res.status(200).json({ status: "success", data: { course } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(normalizeCourseFields({ ...req.body }));
    res.status(201).json({
      status: "success",
      message: "Course added successfully",
      data: { course: newCourse },
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      normalizeCourseFields({ ...req.body }),
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedCourse) return res.status(404).json({ status: "fail", message: "Course not found" });
    res.status(200).json({
      status: "success",
      message: "Course updated successfully",
      data: { course: updatedCourse },
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ status: "fail", message: "Course not found" });
    res.status(200).json({
      status: "success",
      message: "Course deleted successfully",
      data: { course: deletedCourse },
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
