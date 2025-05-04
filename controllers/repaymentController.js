const Repayment = require('../models/Repayment');
const Loan = require('../models/Loan');

exports.addRepayment = async (req, res) => {
    try {
        const { loanId, amount, date } = req.body;
        const repayment = new Repayment({ loanId, amount, date });
        await repayment.save();

        const loan = await Loan.findById(loanId);
        loan.balance -= amount;
        loan.status = loan.balance <= 0 ? 'paid' : 'pending';
        await loan.save();

        res.status(201).json(repayment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
