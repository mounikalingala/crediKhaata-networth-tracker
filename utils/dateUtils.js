const moment = require('moment');

exports.checkOverdue = (dueDate, graceDays) => {
    return moment().isAfter(moment(dueDate).add(graceDays || 0, 'days'));
};
