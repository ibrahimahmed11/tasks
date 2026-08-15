const express = require('express');
const router = express.Router();
const {
  createAlert,
  getAllAlerts,
  getAlertById,
  updateAlert,
  deleteAlert,
} = require('../controllers/alertController');

router.post('/', createAlert); // POST   /alerts
router.get('/', getAllAlerts); // GET    /alerts
router.get('/:id', getAlertById); // GET    /alerts/:id
router.patch('/:id', updateAlert); // PATCH  /alerts/:id
router.delete('/:id', deleteAlert); // DELETE /alerts/:id

module.exports = router;
