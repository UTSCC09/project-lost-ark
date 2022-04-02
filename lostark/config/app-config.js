require('dotenv').config();
const PORT = 4000;
const SSLPORT = 443;
const environment = {
    development: {
        ssl: false,
        port: PORT,
        hostname: `localhost`,
        // dbString: "mongodb+srv://aobuta123:" + process.env.MONGO_PASS + "@lostark.sxt19.mongodb.net/lostark?retryWrites=true&w=majority"
        dbString: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_ADDR}:27017`
    },
    production: {
        ssl: true,
        port: SSLPORT,
        hostname: `localhost`,
        // dbString: "mongodb+srv://aobuta123:" + process.env.MONGO_PASS + "@lostark.sxt19.mongodb.net/lostark-prod?retryWrites=true&w=majority"
        dbString: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_ADDR}:27017`
    }
}

module.exports = { PORT, environment };