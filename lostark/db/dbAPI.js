const { Users, Currencies } = require('../db/dbconnector.js');
const bcrypt = require('bcrypt');
class dbAPI {

    /**
  * This is a function that gets called by ApolloServer when being setup.
  * This function gets called with the datasource config including things
  * like caches and context. We'll assign this.context to the request context
  * here, so we can know about the user making requests
  */
    initialize(config) {
        this.context = config.context;
    }

    getCoinIds() {
        return Currencies.find({}).projection({ _id: 1, symbol: 0, name: 0 });
    }

    // Add user to db if it doesn't exist already
    async insertUser(username, password) {
        return new Promise((resolve, reject) => {
            if (Users.exists({ username: username }) == null) return reject("user already exists");
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) return reject(err);
                const coins = getCoinIds();
                const newUser = new Users({
                    username: username,
                    password: hash,
                    cash: 10000,
                    coins: coins.reduce((a, b) => (a[b] = 0, a), {}),
                });
                newUser.save(err => {
                    if (err) return reject(err);
                    resolve(newUser);
                });
            });
        });

    }

    // Check if user exists in db
    userExists(username) {
        return Users.exists({ username: username }) != null;
    }

    // Return user if one exists
    async findUser(username) {
        return Users.findOne({ username: username });
    }

    // Return all supported coins
    async getCoins() {
        return Currencies.find({});
    }
}

module.exports = dbAPI;