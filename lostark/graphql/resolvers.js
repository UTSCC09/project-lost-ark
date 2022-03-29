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
        coinHistory: async (_, args, context) => {
            const dataSources = context.dataSources;
            return dataSources.coinGeckoAPI.getCoinHistory(args._id, args.days).then(function (data) {
                return data;
            }).catch(function (err) {
                console.error(err);
                return err;
            });
        },
        coinsHistory: async (_, args, context) => {
            const dataSources = context.dataSources;
            return dataSources.coinGeckoAPI.getCoinsHistory(args.days).then(function (data) {
                return data;
            }).catch(function (err) {
                console.error(err);
                return err;
            });
        },
        accountHistoryBalance: async (_, args, context) => {
            const dataSources = context.dataSources;
            return dataSources.dbAPI.getUserTransactions(context.user).then(function (userTrans) {
                // Ensure argument days does not go beyond user creation date
                const oneDay = 1000 * 60 * 60 * 24;
                const currDay = Date.now();
                const timeDiff = currDay - userTrans.createdAt;
                const daysAgo = Math.round(timeDiff / oneDay);
                const days = args.days > daysAgo ? daysAgo : args.days;
                return dataSources.coinGeckoAPI.getDailyCoinsHistory(days).then(function (data) {
                    var transIter = 0;
                    var balanceHistory = [];
                    for (var i = 0; i < data.length - 1; i++) {
                        var accountTrans = {};
                        // Transaction made so update user wallet
                        if (data[i].timestamp >= userTrans.transactions[transIter].date) {
                            transIter += 1;
                            // Take the last transaction made that day
                            while (userTrans.transactions[transIter + 1] != null &&
                                data[i].timestamp == userTrans.transactions[transIter + 1].date)
                                transIter += 1;
                        }
                        var coins = userTrans.transactions[transIter].coins.map((x) => {
                            x.price = data[i][x.coin._id] * x.quantity;
                            return x;
                        });
                        var balance = coins.reduce((prev, cur) => prev + cur.price, 0) + userTrans.transactions[transIter].cash;
                        accountTrans = { balance: balance, timestamp: data[i].timestamp };
                        balanceHistory.push(accountTrans);
                    }
                    return { balanceHistory: balanceHistory };
                }).catch(function (err) {
                    console.error(err);
                    return err;
                });
            }).catch(function (err) {
                console.error(err);
                return err;
            });

        }
    },

    Mutation: {
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