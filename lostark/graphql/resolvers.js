const resolvers = {
    Query: {
        coins: async (_, __, context) => {
            const dataSources = context.dataSources;
            console.log(dataSources.allCoins);
            return dataSources.allCoins;
        },

        user: async (_, __, context) => {
            const dataSources = context.dataSources;
            return dataSources.dbAPI.getUserWallet(context.user)
                .then(function (data) {
                    var user = { username: data.username, cash: data.cash, wallet: data.coins };
                    return user;
                }).catch(function (err) {
                    console.error(err);
                    return err;
                });
        },

        prices: async (_, __, context) => {
            const dataSources = context.dataSources;
            dataSources.coinGeckoAPI.getCoinValues().then((data) => console.log(data));
        }
    },

    Mutation: {
        signup: async (_, { username, password }, { dataSources }) => {
            await dataSources.dbAPI.insertUser(username, password)
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    console.error(err);
                });

        },

    },
};

module.exports = { resolvers };