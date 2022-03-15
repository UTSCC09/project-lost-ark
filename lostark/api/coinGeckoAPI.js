const https = require('https');
class coinGeckoAPI {
    async getCoinValue() {
        var options = {
            host: 'api.coingecko.com',
            path: '/api/v3/simple/price',
            method: 'GETE'
        };

    }
}

module.exports = coinGeckoAPI;