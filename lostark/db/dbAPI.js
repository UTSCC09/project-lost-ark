const { Users, Currencies } = require('../db/dbconnector.js');
const bcrypt = require('bcrypt');
const { allcoins } = require('../api/coinGeckoAPI');
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

    // Add user to db if it doesn't exist already
    async insertUser(username, password) {
        return new Promise(async (resolve, reject) => {
            return Users.exists({ username: username })
                .then(function (doc) {
                    if (doc) return reject("user already exists");
                    return bcrypt.hash(password, 10);
                }).then(async function (hash, err) {
                    if (err) return reject(err);
                    const coins = allcoins;
                    const newUser = new Users({
                        username: username,
                        password: hash,
                        cash: 10000,
                        coins: coins.map((x) => { return { [x._id]: 0 }; }),
                    });
                    newUser.save(err => {
                        if (err) return reject(err);
                        resolve(newUser);
                    });
                }).catch(function (err) {
                    return reject(err)
                });
        });

    }

    // Check if user exists in db
    userExists(username) {
        return Users.exists({ username: username });
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