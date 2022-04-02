require('dotenv').config();
const PORT = 4000;
const SSLPORT = 443;
const environment = {
    development: {
        ssl: false,
        port: PORT,
        hostname: `localhost`,
        // dbString: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_ADDR}:27017/lostarkDev?&authSource=admin`
        dbString: "mongodb://localhost:27017/lostarkDev"
    },
    production: {
        ssl: true,
        port: SSLPORT,
        hostname: `localhost`,
        dbString: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_ADDR}:27017/lostarkProd?&authSource=admin`
    }
}

module.exports = { PORT, environment };
