export const PORT = 4000;
export const environment = {
    development: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: "mongodb+srv://aobuta123:" + process.env.MONGO_PASS + "lostark.sxt19.mongodb.net/lostark?retryWrites=true&w=majority"
    },
    production: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: "mongodb+srv://aobuta123:" + process.env.MONGO_PASS + "lostark.sxt19.mongodb.net/lostark-prod?retryWrites=true&w=majority"
    }
}