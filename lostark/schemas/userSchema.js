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
});

module.exports = { userSchema };