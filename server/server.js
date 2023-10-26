// Set up for Apollo-Server4

// Dependency imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;
import mongoose from 'mongoose';

// Relative Imports
import { typeDefs } from './schema/type-defs.js';
// import { resolvers } from './schema/resolvers.js';
import { resolvers } from './schema/resolvers/index.js';
import { MONGODB } from './config.js';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// you can use both mongoose.connect and MongoDB for VScode playground
mongoose.connect(MONGODB, { useNewUrlParser: true });

mongoose.connection.once('open', () => {
	console.log('Connection to database');
});

await server.start();

app.use(
	'/graphql',
	cors(),
	json(),
	expressMiddleware(server, {
		context: async ({ req, res }) => ({ authHeader: req.headers.authorization }),
	})
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);

/* await will only work with type:module in package.json */
// const { url } = await startStandaloneServer(server, {
// 	context: async () => {
// 		return {
// 			name: 'Pedro',
// 		};
// 	},
// 	listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);
