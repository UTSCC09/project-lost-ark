import mongoose from 'mongoose';
import { environment } from '../config/app-config';
import { userSchema } from '../schemas/userSchema';

const env = process.env.NODE_ENV || "development";

mongoose.connect(environment[env].dbString, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
});

let db = mongoose.connection;

db.on('error', () => {
    console.error("Error while connecting to db");
});

const Users = mongoose.model('Users', userSchema);

export { Users };