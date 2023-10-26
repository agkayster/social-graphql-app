// Dependency imports
import brcypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
// import { ApolloServerErrorCode } from '@apollo/server/errors';

// Relational imports
import { User } from '../../models/Users.js';
import { SECRET_KEY } from '../../config.js';
import { validateRegisterInput } from '../../Util/validators.js';
import { validateLoginInput } from '../../Util/validators.js';

// Write a helper function to generate token for both register and login
const generateToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		SECRET_KEY,
		{ expiresIn: '3d' }
	);
};

export const usersResolvers = {
	Mutation: {
		login: async (parent, { username, password }) =>
			/* we destructure from Login typedefs */
			// {
			// 	loginInput: { username, password },
			// } /* we destructure from Login typedefs */
			{
				const { valid, errors } = validateLoginInput(
					username,
					password
				);

				if (!valid) {
					throw new GraphQLError('Errors', {
						extensions: { code: errors },
					});
				}

				// here we check if the username is in the database
				const user = await User.findOne({ username });

				// if user does not exist
				if (!user) {
					errors.username = 'Username not found';
					throw new GraphQLError('Username not found', {
						extensions: { code: errors },
					});
				}

				// here we check if the password put by the user matches the password in the database during register
				const match = await brcypt.compare(password, user.password);

				// if passwords do not match
				if (!match) {
					errors.password = 'Wrong Password';
					throw new GraphQLError('Wrong Password', {
						extensions: { code: errors },
					});
				}

				// token generated if user and password are okay
				const token = generateToken(user);

				// send details to user
				return {
					...user._doc,
					id: user._id,
					token,
				};
			},

		//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> REGISTER
		register: async (
			parent,
			/* we are destructuring args here */
			{ registerInput: { username, email, password, confirmPassword } },
			context,
			info
		) => {
			const { valid, errors } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);

			// if there are errors, it should displayed
			if (!valid) {
				throw new GraphQLError('Errors', {
					extensions: { code: errors },
				});
			}

			// check if username already exists
			const user = await User.findOne({ username });

			// check if email already exists
			const userEmail = await User.findOne({ email });

			// if user exists, throw error
			if (user) {
				throw new GraphQLError('Username is taken', {
					extensions: { code: 'UNPROCESSABLE ENTITY' },
				});
			}

			// if email exists throw error
			if (userEmail) {
				throw new GraphQLError('email is taken', {
					extensions: { code: 'UNPROCESSABLE ENTITY' },
				});
			}

			// hash password
			password = await brcypt.hash(password, 12);

			// create new user to be sent to database
			const newUser = new User({
				email,
				password,
				username,
				createdAt: new Date().toUTCString(),
				// createdAt: new Date().toISOString(),
			});

			// save new user in database
			const res = await newUser.save();

			// generate token for new user
			const token = generateToken(res);

			// send details to user
			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};
