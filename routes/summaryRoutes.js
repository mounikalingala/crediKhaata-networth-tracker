const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getSummary, getOverdueLoans } = require('../controllers/summaryController');

router.get('/summary', auth, getSummary);
router.get('/overdue', auth, getOverdueLoans);

module.exports = router;
