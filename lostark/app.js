const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { resolvers } = require('./graphql/resolvers.js');
const { typeDefs } = require('./graphql/schema.graphql');
const { PORT } = require('./config/app-config.js');
const { getUser } = require('./validation.js');
const dbAPI = require('./db/dbAPI.js');
const cookie = require('cookie');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(session({
        secret: 'please change this secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: true
        }
    }));

    app.use(function (req, res, next) {
        let username = (req.session.user) ? req.session.user._id : '';
        res.setHeader('Set-Cookie', cookie.serialize('username', username, {
            httpOnly: false,
            secure: true,
            sameSite: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
        }));
        next();
    });

    const isAuthenticated = function (req, res, next) {
        if (!req.session.username) return res.status(401).end("access denied");
        next();
    };

    const db = new dbAPI();

    // curl -X POST -d "username=admin&password=pass4admin" http://localhost:4000/signup/
    // Sign Up User with REST
    app.post('/signup/', [check('username').isAlphanumeric(),
    check('password').isAlphanumeric()], function (req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status("400").end("bad input");
        // extract data from HTTP request
        if (!('username' in req.body)) return res.status(400).end('username is missing');
        if (!('password' in req.body)) return res.status(400).end('password is missing');
        let username = req.body.username;
        let password = req.body.password;
        return db.userExists(username)
            .then(function (doc) {
                if (doc) return res.status(409).end("username " + username + " already exists");
                // insert new user into the database
                return db.insertUser(username, password).then(res.json(username))
                    .catch(res.status(500).end("failed to add user"));

            }).catch(function (err) {
                return res.status(500).end(err);
            });

    });

    // curl -X POST -d "username=admin&password=pass4admin" http://localhost:4000/signin/
    // Sign In User with REST
    app.post('/signin/', [
        check('username').isAlphanumeric(),
        check('password').isAlphanumeric()
    ], function (req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status("400").end("bad input");
        // extract data from HTTP request
        if (!('username' in req.body)) return res.status(400).end('username is missing');
        if (!('password' in req.body)) return res.status(400).end('password is missing');
        let username = req.body.username;
        let password = req.body.password;
        // retrieve user from the database
        return db.findUser(username)
            .then(function (user) {
                if (!user) return res.status(401).end("access denied");
                return bcrypt.compare(password, user.password);
            }).then(function (valid, err) {
                if (err) return res.status(500).end(err);
                if (!valid) return res.status(401).end("access denied");
                // start a session
                req.session.username = username;
                res.setHeader('Set-Cookie', cookie.serialize('username', username, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
                }));
                console.log(username);
                return res.json(req.session);
            }).catch(function (err) { return res.status(500).end(err); })
    });

    // curl -b cookie.txt -c cookie.txt http://localhost:4000/signout/
    // Signout user with REST
    app.get('/signout/', function (req, res, next) {
        req.session.destroy();
        res.setHeader('Set-Cookie', cookie.serialize('username', '', {
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
        }));
        return res.redirect("/");
    });

    const httpServer = http.createServer(app);

    const dataSources = () => ({
        dbAPI: db,
    });

    // GraphQL is protected by authentication layer
    app.use(isAuthenticated)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req, res }) => {
            let user = req?.cookies["username"]
            let context = { req, res, user: {} };
            if (user) {
                context.user = user;
            }
            return context;
        },
        introspection: process.env.NODE_ENV !== "production",
        dataSources,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


startApolloServer(typeDefs, resolvers);