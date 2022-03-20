require('dotenv').config();
const PORT = 4000;
const SSLPORT = 443;
const environment = {
    development: {
        ssl: false,
        port: PORT,
        hostname: `localhost`,
        dbString: "mongodb+srv://aobuta123:" + process.env.MONGO_PASS + "@lostark.sxt19.mongodb.net/lostark?retryWrites=true&w=majority"
    },
    production: {
        ssl: true,
        port: SSLPORT,
        hostname: `localhost`,
        dbString: "mongodb+srv://aobuta123:" + process.env.MONGO_PASS + "@lostark.sxt19.mongodb.net/lostark-prod?retryWrites=true&w=majority"
    }
}

module.exports = { PORT, environment };