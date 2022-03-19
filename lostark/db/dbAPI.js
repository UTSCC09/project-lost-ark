const { Users, Currencies } = require('../db/dbconnector.js');
const bcrypt = require('bcrypt');
const { allCoins } = require('../api/coinGeckoAPI');
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

    /**  Returns a promise and adds user to db if it doesn't exist already */
    async insertUser(username, password) {
        return new Promise(async (resolve, reject) => {
            return Users.exists({ username: username })
                .then(function (doc) {
                    if (doc) return reject("user already exists");
                    return bcrypt.hash(password, 10);
                }).then(async function (hash, err) {
                    if (err) return reject(err);
                    const coins = allCoins;
                    const newUser = new Users({
                        username: username,
                        password: hash,
                        cash: 10000,
                        coins: coins.map((x) => { return { coin: x, quantity: 0 }; }),
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

    /** Returns a promise and checks if user exists in db */
    userExists(username) {
        return Users.exists({ username: username });
    }

    /** Returns a promise and checks if a user exists */
    async findUser(username) {
        return Users.findOne({ username: username });
    }

    /** Return a promise of all supported coins */
    async getCoins() {
        return Currencies.find({});
    }

    /** Return balance and coins for user */
    async getUserWallet(username) {
        return Users.findOne({ username: username }, { username: 1, cash: 1, coins: 1 });
    }

    /**
    * Returns promise where wallet is updated from a transaction
    * price denotes cost of transaction (+ for sell, - for buy)
    * coinName denotes coin_id of coin bought/sold
    * coinQuant denotes quantity of coinName bought/sold (can be a decimal value, - for sell, + for buy)
    */
    async walletTransaction(username, price, coinName, coinQuant) {
        return Users.findOne({ username: username }, { username: 1, cash: 1, coins: 1 })
            .then(function (data) {
                if (data.cash + price < 0) {
                    throw new Error("Insufficient funds");
                }
                var coinIndex = data.coins.findIndex(({ coin }) => coin._id == coinName);
                if (data.coins[coinIndex].quantity + coinQuant < 0) {
                    throw new Error("Insufficient coins");
                }
                var newWallet = data;
                newWallet.cash = data.cash + price;
                data.coins[coinIndex].quantity = data.coins[coinIndex].quantity + coinQuant;
                newWallet.coins = data.coins;
                return Users.findOneAndUpdate({ username: username },
                    { cash: newWallet.cash, coins: newWallet.coins }, { new: true });
            }).then(function (data) {
                return data
            }
            ).catch(function (err) {
                console.log(err);
                return err;
            });
    }
}

module.exports = dbAPI;