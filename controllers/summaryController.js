const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');
const moment = require('moment');

exports.getSummary = async (req, res) => {
    const loans = await Loan.find({ shopkeeperId: req.user._id });
    const repayments = await Repayment.find().populate({
        path: 'loanId',
        match: { shopkeeperId: req.user._id }
    });

    const totalLoaned = loans.reduce((acc, l) => acc + l.amount, 0);
    const totalCollected = repayments.reduce((acc, r) => acc + r.amount, 0);
    const overdueAmount = loans.filter(l => l.status === 'overdue').reduce((acc, l) => acc + l.balance, 0);

    res.json({ totalLoaned, totalCollected, overdueAmount });
};

exports.getOverdueLoans = async (req, res) => {
    const loans = await Loan.find({ shopkeeperId: req.user._id });
    const overdue = loans.filter(l => moment().isAfter(moment(l.dueDate).add(l.graceDays || 0, 'days')) && l.status !== 'paid');
    res.json(overdue);
};
