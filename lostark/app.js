const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { resolvers } = require('./graphql/resolvers.js');
const { typeDefs } = require('./graphql/schema.graphql');
const { PORT } = require('./config/app-config.js')
const dbAPI = require('./db/dbAPI.js');

async function startApolloServer(typeDefs, resolvers) {
    const app = express();

    const httpServer = http.createServer(app);

    const dataSources = () => ({
        dbAPI: new dbAPI(),
    });

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introsprection: process.env.NODE_ENV !== "production",
        dataSources,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });


    await server.start();

    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


startApolloServer(typeDefs, resolvers);