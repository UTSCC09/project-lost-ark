import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import coinGecko from 'coingecko-api';
import http from 'http';
import { resolvers } from './graphql/resolvers.graphql';
import { typeDefs } from './graphql/schema.graphql';

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const coinGeckoClient = new coinGecko();

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });


    await server.start();

    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


startApolloServer(typeDefs, resolvers);