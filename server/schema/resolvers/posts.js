import { GraphQLError } from 'graphql';
import { SECRET_KEY } from '../../config.js';
import jwt from 'jsonwebtoken';

// import { contextAuth } from '../../Util/check-auth.js';
import { Post } from '../../models/Post.js';

export const postsResolvers = {
	Query: {
		getPosts: async () => {
			console.log('getPosts');
			try {
				/* we get all our posts appearing in a sorted order from the latest to the oldest */
				const posts = await Post.find().sort({ createdAt: -1 });

				return posts;
			} catch (error) {
				throw new Error(error);
			}
		},
		getPost: async (parent, { postId }) => {
			console.log('getPost');
			try {
				/* get a single post using the id */
				const post = await Post.findById(postId);
				if (post) {
					return post;
				} else {
					throw new Error('Post not found');
				}
			} catch (error) {
				throw new Error(error);
			}
		},
	},
	Mutation: {
		createPost: async (_, { body }, contextValue) => {
			console.log('createPosts');
			/* we get our token using contextValue for Apollo server 4 */
			const token = contextValue.authHeader.split('Bearer ')[1];
			/* check to see if there is a token */
			if (token) {
				try {
					/* if token exist, we get our user */
					const user = jwt.verify(token, SECRET_KEY);

					/* Ensures something is written in the Post */
					if (body.trim() === '') {
						throw new GraphQLError('Post body cannot be empty', {
							extensions: { code: 'EMPTY_POST_BODY' },
						});
					}

					/* we create our new post */
					const newPost = new Post({
						body,
						user: user.id,
						username: user.username,
						createdAt: new Date(),
						// createdAt: new Date().toUTCString(),
					});

					/* we save our post and return it */
					const post = await newPost.save();
					return post;
				} catch (error) {
					throw new GraphQLError('User not created', {
						extensions: { code: 'BAD_USER_CREATION' },
					});
				}
			}
			throw new GraphQLError('Invalid/Expired token', {
				extensions: { code: 'INVALID_EXPIRED_TOKEN' },
			});
		},
		deletePost: async (_, { postId }, contextValue) => {
			console.log('deletePosts');
			/* we get our token using contextValue for Apollo server 4 */
			const token = contextValue.authHeader.split('Bearer ')[1];
			/* check to see if there is a token */
			if (token) {
				try {
					/* if token exist, we get our user */
					const user = jwt.verify(token, SECRET_KEY);
					/* we find the specific post we want to delete by the id */
					const post = await Post.findById(postId);

					/* we check if the username on the post matches the username that wants to delete the post */
					if (user.username === post.username) {
						/* if the username matches, we delete the exact post */
						await post.deleteOne();
						return 'Post deleted successfully.';
					} else {
						throw new GraphQLError(
							'Post cannot be deleted by user',
							{
								extensions: { code: 'BAD_DELETE_REQUEST' },
							}
						);
					}
				} catch (error) {
					throw new GraphQLError('Invalid Authentication', {
						extensions: { code: error },
					});
				}
			}
		},
		likePost: async (_, { postId }, contextValue) => {
			/* we get our token using contextValue for Apollo server 4 */
			const token = contextValue.authHeader.split('Bearer ')[1];
			if (token) {
				const { username } = jwt.verify(token, SECRET_KEY);

				const post = await Post.findById(postId);
				if (post) {
					if (post.likes.find((like) => like.username === username)) {
						/* Post already liked, Unlike it */
						post.likes = post.likes.filter(
							(like) => like.username !== username
						);
					} else {
						/* Post not liked, like it */
						post.likes.push({
							username,
							createdAt: new Date().toUTCString(),
						});
					}
					await post.save();
					return post;
				} else {
					throw new GraphQLError('Post does not exist', {
						extensions: { code: 'BAD_POST_REQUEST' },
					});
				}
			} else {
				throw new GraphQLError('Not authorised', {
					extensions: { code: 'NO_TOKEN_AUTHORISATION' },
				});
			}
		},
	},
};
