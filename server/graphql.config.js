import { startServer } from 'graphql-language-service-server';

await startServer({
	method: 'node',
});

module.exports = { schema: 'https://localhost:4000' };
