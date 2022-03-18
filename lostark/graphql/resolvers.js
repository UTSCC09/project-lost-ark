const resolvers = {
    Query: {
        coins: async (_, __, context) => {
            const dataSources = context.dataSources;
            return dataSources.coinGeckoAPI.getCoinValues().then(function (data) {
                var coins = context.dataSources.allCoins;
                return coins.map((x) => {
                    x.price = data[x._id].cad;
                    return x;
                })
            }).catch(function (err) {
                console.error(err);
                return err;
            });
        },

        coin: async (_, args, context) => {
            const dataSources = context.dataSources;
            return dataSources.coinGeckoAPI.getCoinValue(args._id).then(function (data) {
                var coins = context.dataSources.allCoins;
                var coin = coins.find(({ _id }) => _id == args._id);
                coin.price = data[args._id].cad;
                return coin;
            }).catch(function (err) {
                console.error(err);
                return err;
            });
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