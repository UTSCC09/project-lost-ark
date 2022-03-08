const CoinGeckoClient = require('coingecko-api');

class coinGeckoAPI extends CoinGeckoClient {
    constructor() {
        super();
    }
}

module.exports = coinGeckoAPI;