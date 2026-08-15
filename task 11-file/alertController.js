const Alert = require('../models/Alert');

// POST /alerts — create a new alert
async function createAlert(req, res) {
  try {
    const alert = await Alert.create(req.body);
    res.status(201).json(alert);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to create alert.' });
  }
}

// GET /alerts — get all alerts
async function getAllAlerts(req, res) {
  try {
    const alerts = await Alert.find().sort({ detectedAt: -1 });
    res.status(200).json(alerts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch alerts.' });
  }
}

// GET /alerts/:id — get one alert by id
async function getAlertById(req, res) {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found.' });
    }
    res.status(200).json(alert);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid alert id.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch alert.' });
  }
}

// PATCH /alerts/:id — update an alert
async function updateAlert(req, res) {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document
      runValidators: true, // enforce schema rules (enum, required, etc.) on update
    });
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found.' });
    }
    res.status(200).json(alert);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid alert id.' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to update alert.' });
  }
}

// DELETE /alerts/:id — delete an alert
async function deleteAlert(req, res) {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found.' });
    }
    res.status(200).json({ message: 'Alert deleted successfully.', alert });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid alert id.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to delete alert.' });
  }
}

module.exports = {
  createAlert,
  getAllAlerts,
  getAlertById,
  updateAlert,
  deleteAlert,
};
