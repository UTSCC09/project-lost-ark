const mongoose = require('mongoose');
const { environment } = require('../config/app-config.js');
const { userSchema } = require('../schemas/userSchema.js');

const env = process.env.NODE_ENV || "development";

mongoose.connect(environment[env].dbString);

let db = mongoose.connection;

db.on('error', () => {
    console.error("Error while connecting to db");
});

const Users = mongoose.model('Users', userSchema);

module.exports = { Users };