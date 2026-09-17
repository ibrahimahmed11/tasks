require("dotenv").config();

const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbConnect = require("./config/db-connect");
const auth = require("./middleware/auth");
const { requireAdmin } = require("./middleware/auth");
const User = require("./models/user-model");
const StudyCourse = require("./models/study-course-model");
const StudyTask = require("./models/study-task-model");

const app = express();
const PORT = process.env.PORT || 5000;
const dataDirectory = path.join(__dirname, "data");

app.use(express.json());
app.use((req, res, next) => {
  const allowedOrigins = new Set(["http://localhost:4200", "http://127.0.0.1:4200"]);
  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

const dataFile = (name) => path.join(dataDirectory, `${name}-data.json`);
async function readSeedData(name) {
  return JSON.parse(await fs.readFile(dataFile(name), "utf8"));
}

async function seedDatabase() {
  const [courseCount, taskCount] = await Promise.all([
    StudyCourse.countDocuments(),
    StudyTask.countDocuments(),
  ]);

  if (courseCount === 0) {
    await StudyCourse.insertMany(await readSeedData("courses"));
    console.log("Seeded courses into MongoDB");
  }

  if (taskCount === 0) {
    await StudyTask.insertMany(await readSeedData("tasks"));
    console.log("Seeded tasks into MongoDB");
  }
}

function createToken(user) {
  return jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.email === process.env.ADMIN_EMAIL?.trim().toLowerCase(),
  };
}

function withoutMongoFields(document) {
  const value = document.toObject ? document.toObject() : document;
  const { _id, createdAt, updatedAt, ...data } = value;
  return data;
}

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!name || !email || password.length < 6) {
      return res.status(400).json({ message: "Name, email, and a password of at least 6 characters are required." });
    }
    if (await User.exists({ email })) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
    res.status(201).json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    res.json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/logout", auth, (_req, res) => {
  res.json({ message: "Logged out successfully." });
});

app.get("/api/auth/me", auth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

app.get("/api/study/dashboard", auth, async (_req, res, next) => {
  try {
    const [courses, tasks] = await Promise.all([
      StudyCourse.find().sort({ id: 1 }).lean(),
      StudyTask.find().sort({ id: -1 }).lean(),
    ]);
    res.json({
      courses: courses.map(withoutMongoFields),
      tasks: tasks.map(withoutMongoFields),
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/study/courses", auth, async (_req, res, next) => {
  try {
    const courses = await StudyCourse.find().sort({ id: 1 }).lean();
    res.json(courses.map(withoutMongoFields));
  } catch (error) {
    next(error);
  }
});

app.post("/api/study/courses", auth, requireAdmin, async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const code = String(req.body.code || "").trim();
    if (!name || !code) {
      return res.status(400).json({ message: "A course name and code are required." });
    }

    const duplicate = await StudyCourse.exists({ code: new RegExp(`^${code}$`, "i") });
    if (duplicate) {
      return res.status(409).json({ message: "A course with this code already exists." });
    }

    const count = await StudyCourse.countDocuments();
    const colors = ["coral", "violet", "gold"];
    const course = await StudyCourse.create({
      id: Date.now(),
      name,
      code,
      color: colors[count % colors.length],
      progress: 0,
      next: "No upcoming work yet",
    });
    res.status(201).json(withoutMongoFields(course));
  } catch (error) {
    next(error);
  }
});

app.delete("/api/study/courses/:id", auth, requireAdmin, async (req, res, next) => {
  try {
    const course = await StudyCourse.findOneAndDelete({ id: Number(req.params.id) });
    if (!course) return res.status(404).json({ message: "Course not found." });
    res.json({ message: "Course removed successfully.", course: withoutMongoFields(course) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/study/tasks", auth, async (_req, res, next) => {
  try {
    const tasks = await StudyTask.find().sort({ id: -1 }).lean();
    res.json(tasks.map(withoutMongoFields));
  } catch (error) {
    next(error);
  }
});

app.delete("/api/study/tasks/:id", auth, requireAdmin, async (req, res, next) => {
  try {
    const task = await StudyTask.findOneAndDelete({ id: Number(req.params.id) });
    if (!task) return res.status(404).json({ message: "Task not found." });
    res.json({ message: "Task removed successfully.", task: withoutMongoFields(task) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/study/tasks", auth, requireAdmin, async (req, res, next) => {
  try {
    const title = String(req.body.title || "").trim();
    if (!title) return res.status(400).json({ message: "A task title is required." });

    const task = await StudyTask.create({
      id: Date.now(),
      title,
      course: req.body.course || "Independent study",
      due: req.body.due || "Today",
      type: req.body.type || "Personal",
      done: false,
    });
    res.status(201).json(withoutMongoFields(task));
  } catch (error) {
    next(error);
  }
});

app.patch("/api/study/tasks/:id", auth, async (req, res, next) => {
  try {
    const task = await StudyTask.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $set: req.body },
      { new: true, runValidators: true },
    );
    if (!task) return res.status(404).json({ message: "Task not found." });
    res.json(withoutMongoFields(task));
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Unable to read study data." });
});

async function start() {
  await dbConnect();
  await seedDatabase();
  app.listen(PORT, () => console.log(`StudyFlow API running at http://localhost:${PORT}`));
}

start().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
