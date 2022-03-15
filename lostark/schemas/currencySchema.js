const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    _id: {
        type: String
    },
    symbol: {
        type: String
    },
    name: {
        type: String
    },
});

module.exports = { currencySchema };