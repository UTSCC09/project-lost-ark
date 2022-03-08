const { Users } = require('../db/dbconnector.js');
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

    async insertUser(username, password) {
        return new Promise((resolve, reject) => {
            const saltRounds = 10;
            Users.findOne({ username: username })
                .then(function (data) {
                    if (data) return reject("user already exists");
                    bcrypt.hash(password, saltRounds, function (err, hash) {
                        if (err) return reject(err);
                        const newUser = new Users({
                            username: username,
                            password: hash,
                        });
                        newUser.save(err => {
                            if (err) return reject(err);
                            resolve(newUser);
                        });
                    });
                })
                .catch(function (err) {
                    return reject(err);
                });

        })

    }
}

module.exports = dbAPI;