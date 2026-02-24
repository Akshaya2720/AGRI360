const express = require('express');
const router = express.Router();
const { submitPaddy, getFarmerSubmissions } = require('../controllers/farmer.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect);
router.use(authorize('FARMER'));

router.post('/submit', submitPaddy);
router.get('/history', getFarmerSubmissions);

module.exports = router;
