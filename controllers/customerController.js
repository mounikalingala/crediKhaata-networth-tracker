const Customer = require('../models/Customer');

exports.addCustomer = async (req, res) => {
    try {
        const customer = new Customer({ ...req.body, shopkeeperId: req.user._id });
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCustomers = async (req, res) => {
    const customers = await Customer.find({ shopkeeperId: req.user._id });
    res.json(customers);
};

exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOneAndUpdate(
            { _id: req.params.id, shopkeeperId: req.user._id },
            req.body,
            { new: true }
        );
        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    await Customer.findOneAndDelete({ _id: req.params.id, shopkeeperId: req.user._id });
    res.json({ message: 'Customer deleted' });
};
