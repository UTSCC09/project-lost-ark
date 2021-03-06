const axios = require('axios');
const currency = 'cad';
const allCoins = [
    { _id: 'bitcoin', name: 'Bitcoin', symbol: 'btc' },
    { _id: 'ethereum', name: 'Ethereum', symbol: 'eth' },
    { _id: 'litecoin', name: 'Litecoin', symbol: 'ltc' },
    { _id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'bch' },
    { _id: 'binance-coin-wormhole', name: 'Binance Coin (Wormhole)', symbol: 'bnb' },
    { _id: 'eos', name: 'EOS', symbol: 'eos' },
    { _id: 'binance-peg-xrp', name: 'Binance-Peg XRP', symbol: 'xrp' },
    { _id: 'stellar', name: 'Stellar', symbol: 'xlm' },
    { _id: 'chainlink', name: 'Chainlink', symbol: 'link' },
    { _id: 'polkadot', name: 'Polkadot', symbol: 'dot' },
    { _id: 'yearn-finance', name: 'Yearn.finance', symbol: 'yfi' },
];

class coinGeckoAPI {

    /** Returns a promise, gets values of all coins in CAD */
    async getCoinValues() {
        var stringifyIds = allCoins.reduce((prev, cur) => prev + "," + cur._id, "").slice(1);
        return axios.get('https://api.coingecko.com/api/v3/simple/price?ids='
            + stringifyIds + "&vs_currencies=" + currency).then(res => {
                return res.data;
            }).catch(err => {
                console.error(err);
                return err;
            });
    }

    /** Returns a promise, gets values of a coin in CAD */
    async getCoinValue(coin) {
        return axios.get('https://api.coingecko.com/api/v3/simple/price?ids='
            + coin + "&vs_currencies=" + currency).then(res => {
                return res.data;
            }).catch(err => {
                console.error(err);
                return err;
            });
    }

    /** Returns a promise, gets values of coins (input as a string of coins separated by a comma) in CAD */
    async getCoinListValues(coins) {
        return axios.get('https://api.coingecko.com/api/v3/simple/price?ids='
            + coins + "&vs_currencies=" + currency).then(res => {
                return res.data;
            }).catch(err => {
                console.error(err);
                return err;
            });
    }

    /** Returns all coins' historical value for a number of days */
    async getCoinsHistory(days) {
        const callAPI = allCoins.map((coin) => {
            return axios.get('https://api.coingecko.com/api/v3/coins/' + coin._id + '/market_chart?'
                + "vs_currency=" + currency + "&days=" + days).then(res => {
                    return res.data;
                }).catch(err => {
                    console.error(err);
                    return err;
                })
        })
        return await Promise.all(callAPI).then(res => {
            var coinDict = [];
            for (var i = 0; i < res.length; i++) {
                coinDict.push({
                    '_id': allCoins[i]._id, 'prices': res[i].prices
                });
            }
            return coinDict;
        }).catch(err => {
            console.error(err);
            return err;
        });
    }

    /** Returns a coins' historical value for a number of days */
    async getCoinHistory(coin, days) {
        return axios.get('https://api.coingecko.com/api/v3/coins/' + coin + '/market_chart?'
            + "vs_currency=" + currency + "&days=" + days).then(res => {
                var coinDict = { '_id': coin, 'prices': res.data.prices };
                return coinDict;
            }).catch(err => {
                console.error(err);
                return err;
            })
    }

    /** Returns all coins' daily historical value for a number of days */
    async getDailyCoinsHistory(days) {
        const callAPI = allCoins.map((coin) => {
            return axios.get('https://api.coingecko.com/api/v3/coins/' + coin._id + '/market_chart?'
                + "vs_currency=" + currency + "&days=" + days + "&interval=daily").then(res => {
                    return res.data;
                }).catch(err => {
                    console.error(err);
                    return err;
                })
        })
        return await Promise.all(callAPI).then(res => {
            var coinList = [];
            var coinDict = {};
            for (var i = 0; i < days; i++) {
                for (var j = 0; j < res.length; j++) {
                    coinDict[allCoins[j]._id] = res[j].prices[i][1];
                }
                coinDict.timestamp = res[0].prices[i][0];
                coinList.push(coinDict);
                coinDict = {};
            }
            return coinList;
        }).catch(err => {
            console.error(err);
            return err;
        });
    }
}

module.exports = { coinGeckoAPI, allCoins };