const { Int32 } = require('mongodb');
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
    }
});

module.exports = { userSchema };