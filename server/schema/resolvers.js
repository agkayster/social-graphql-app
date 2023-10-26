// import { UserList, MovieList } from '../FakeData.js';
// import { schema } from '../models/Post.js';
import _ from 'lodash';

// /* we only have one resolver if we only have one query field in type-def */
// export const resolvers = {
// 	Query: {
// 		// USERS RESOLVERS
// 		users(parent, args, contextValue) {
// 			console.log('get user context =>', contextValue);
// 			return UserList;
// 		},
// 		user: (parent, args, contextValue, info) => {
// 			console.log('get context =>', contextValue);
// 			const id = +args.id;
// 			const user = _.find(UserList, { id });
// 			return user;
// 		},
// 		// MOVIES RESOLVERS
// 		movies: () => {
// 			return MovieList;
// 		},
// 		movie: (parent, args) => {
// 			const name = args.name;
// 			const movie = _.find(MovieList, { name });
// 			return movie;
// 		},
// 	},
// 	User: {
// 		favouriteMovies: () => {
// 			return _.filter(
// 				MovieList,
// 				(movie) => movie.year >= 2000 && movie.year <= 2010
// 			);
// 		},
// 	},

// 	Mutation: {
// 		createUser: (parent, args) => {
// 			const user = args.input;
// 			const lastid = UserList[UserList.length - 1].id;
// 			user.id = lastid + 1;
// 			UserList.push(user);
// 			return user;
// 		},

// 		updateUsername: (parent, args) => {
// 			const { id, newUsername } = args.input;
// 			let userUpdated;
// 			UserList.forEach((user) => {
// 				if (user.id === +id) {
// 					user.username = newUsername;
// 					userUpdated = user;
// 				}
// 			});
// 			return userUpdated;
// 		},

// 		deleteUser: (parent, args) => {
// 			const id = args.id;
// 			_.remove(UserList, (user) => user.id === +id);
// 			return null;
// 		},
// 	},
// };
// module.exports = { resolvers };
