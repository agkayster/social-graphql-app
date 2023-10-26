import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import { GraphQLError } from 'graphql';

// export const contextAuth = (infoContext) => {
// 	console.log('get info context =>', infoContext);
// 	const authHeader = infoContext.req.headers.authorization;
// 	// console.log('get auth header =>', authHeader);
// 	if (authHeader) {
// 		const token = authHeader.split('Bearer ')[1];
// 		if (token) {
// 			try {
// 				const user = jwt.verify(token, SECRET_KEY);
// 				return user;
// 			} catch (error) {
// 				throw new GraphQLError('Invalid/Expired token', {
// 					extensions: { code: 'INVALID_EXPIRED_TOKEN' },
// 				});
// 			}
// 		}
// 		throw new GraphQLError('Authentication must be "Bearer [token]"', {
// 			extensions: { code: 'INVALID_EXPIRED_TOKEN' },
// 		});
// 	}
// 	throw new GraphQLError('Authorization header must be provided', {
// 		extensions: { code: 'INVALID_AUTHENTICATION_HEADER' },
// 	});
// };
