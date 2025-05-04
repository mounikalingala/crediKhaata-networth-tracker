const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createLoan, getLoans } = require('../controllers/loanController');

router.post('/', auth, createLoan);
router.get('/', auth, getLoans);

module.exports = router;
