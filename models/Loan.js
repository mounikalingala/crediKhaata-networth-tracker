const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    shopkeeperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    description: String,
    amount: Number,
    issueDate: Date,
    dueDate: Date,
    frequency: String, // 'bi-weekly' or 'monthly'
    interest: Number,
    graceDays: Number,
    status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
    balance: Number
});

module.exports = mongoose.model('Loan', loanSchema);
