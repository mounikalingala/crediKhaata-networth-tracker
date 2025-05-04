const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { addRepayment } = require('../controllers/repaymentController');

router.post('/', auth, addRepayment);

module.exports = router;
