const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    // Which monitored vehicle / CAN network this alert came from
    vehicleId: {
      type: String,
      required: [true, 'vehicleId is required'],
      trim: true,
    },

    // Category/type field — the kind of attack the IDS flagged
    attackType: {
      type: String,
      required: [true, 'attackType is required'],
      enum: ['DoS', 'Replay', 'Spoofing', 'Fuzzing', 'Unknown'],
    },

    // Human-readable description of what was detected
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    // Date field — when the intrusion was detected
    detectedAt: {
      type: Date,
      default: Date.now,
    },

    // How serious the alert is
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },

    // Triage status, so the dashboard can track handling of the alert
    status: {
      type: String,
      enum: ['New', 'Investigating', 'Resolved'],
      default: 'New',
    },

    // ML model's confidence in this detection (0.0 - 1.0)
    confidenceScore: {
      type: Number,
      min: 0,
      max: 1,
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model('Alert', alertSchema);
