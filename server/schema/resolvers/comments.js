import { SECRET_KEY } from '../../config.js';
import { GraphQLError } from 'graphql';
import { Post } from '../../models/Post.js';
import jwt from 'jsonwebtoken';

export const commentsResolvers = {
	Mutation: {
		createComment: async (_, { postId, body }, contextValue) => {
			const token = contextValue.authHeader.split('Bearer ')[1];
			if (token) {
				const { username } = jwt.verify(token, SECRET_KEY);
				if (body.trim() === '') {
					throw new GraphQLError('body portion cannot be empty', {
						extensions: { code: 'EMPTY_COMMENT_BODY' },
					});
				}

				const post = await Post.findById(postId);
				if (post) {
					post.comments.unshift({
						username,
						body,
						// createdAt: new Date().toUTCString(),
						createdAt: new Date(),
					});
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
		deleteComment: async (_, { postId, commentId }, contextValue) => {
			// we get our token
			const token = contextValue.authHeader.split('Bearer ')[1];

			// if token is good
			if (token) {
				// we destructure the username from the user
				const { username } = jwt.verify(token, SECRET_KEY);
				// we find the particular post using post id
				const post = await Post.findById(postId);
				// if the post is available
				if (post) {
					// we get the index of the particular comment we are looking for
					const commentIdx = post.comments.findIndex(
						(comment) => comment.id === commentId
					);
					/*we check if the username attached to the particular comment via the index is the same as the username of the person trying to delete it*/
					if (post.comments[commentIdx].username === username) {
						/* if yes, then we use the splice method to remove the comment */
						post.comments.splice(commentIdx, 1);
						await post.save();
						return post;
					} else {
						throw new GraphQLError(
							'User is not allowed to delete comment',
							{
								extensions: { code: 'BAD_DELETE_REQUEST' },
							}
						);
					}
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
