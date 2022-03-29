const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    cash: {
        type: Number
    },
    coins: {
        type: Array
    },
    transactions: {
        type: Array
    },
    createdAt: {
        type: Number
    },

});

module.exports = { userSchema };