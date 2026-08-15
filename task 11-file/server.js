require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const alertRoutes = require('./routes/alertRoutes');

const app = express();

app.use(express.json()); // parse JSON request bodies

app.use('/alerts', alertRoutes);

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found.` });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`EV-Guard AI entity module running at http://localhost:${PORT}`);
  });
});
