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

}, { timestamps: true });

module.exports = { userSchema };