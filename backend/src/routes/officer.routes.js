const express = require('express');
const router = express.Router();
const { getPendingSubmissions, approveSubmission } = require('../controllers/officer.controller.js');
const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect);
router.use(authorize('SUPPLYCO_OFFICER', 'GOVERNMENT_ADMIN'));

router.get('/pending', getPendingSubmissions);
router.post('/approve/:id', approveSubmission);

module.exports = router;
