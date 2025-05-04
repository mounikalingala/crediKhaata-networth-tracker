const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { addCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customerController');

router.post('/', auth, addCustomer);
router.get('/', auth, getCustomers);
router.put('/:id', auth, updateCustomer);
router.delete('/:id', auth, deleteCustomer);

module.exports = router;
