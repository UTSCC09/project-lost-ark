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
                    return dataSources.coinGeckoAPI.getCoinValues()
                        .then(function (price) {
                            var coins = data.coins.map((x) => {
                                x.price = price[x.coin._id].cad * x.quantity;
                                x.coin.price = price[x.coin._id].cad;
                                return x;
                            });
                            var balance = coins.reduce((prev, cur) => prev + cur.price, 0) + data.cash;
                            var user = { username: data.username, balance: balance, cash: data.cash, wallet: coins };
                            return user;
                        }).catch(function (err) {
                            console.error(err);
                            return err;
                        })

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
        buy: async (_, { coinId, quantity }, context) => {
            const dataSources = context.dataSources;
            return dataSources.coinGeckoAPI.getCoinValue(coinId).then(function (data) {
                return data[coinId].cad * quantity;
            }).then(function (price) {
                return dataSources.dbAPI.walletTransaction(context.user, -price, coinId, quantity)
            }).then(function (wallet) {
                return wallet;
            }).catch(function (err) {
                console.error(err);
                return err;
            });
        },

        sell: async (_, { coinId, quantity }, context) => {
            const dataSources = context.dataSources;
            return dataSources.coinGeckoAPI.getCoinValue(coinId).then(function (data) {
                return data[coinId].cad * quantity;
            }).then(function (price) {
                return dataSources.dbAPI.walletTransaction(context.user, price, coinId, -quantity)
            }).then(function (wallet) {
                return wallet;
            }).catch(function (err) {
                console.error(err);
                return err;
            });
        },


    },
};

module.exports = { resolvers };