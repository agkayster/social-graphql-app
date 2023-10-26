import React from 'react';
import {
	DELETE_POST_MUTATION,
	DELETE_COMMENT_MUTATION,
} from './GRAPHQL/mutations';
import { FETCH_POSTS_QUERY } from './GRAPHQL/queries';
import { useMutation } from '@apollo/client';

const DeleteButton = ({ postId, commentId, BsFillTrashFill }) => {
	/* create a mutation ternary variable based on commentId */
	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

	/* create our deletePostOrComment function, taking in our mutation */
	const [deletePostOrComment] = useMutation(mutation, {
		update(proxy, result) {
			// console.log('get result =>', result);
			if (!commentId) {
				const data = proxy.readQuery({
					query: FETCH_POSTS_QUERY,
				});
				/* keeping all posts that do not have the same ID as the post we are deleting */
				data.getPosts = data.getPosts.filter(
					(post) => post.id !== postId
				);
				proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
				window.location.pathname = '/posts';
			} else {
				window.location.pathname = `/posts/${postId}`;
			}
		},
		variables: { postId, commentId },
	});

	const handleDelete = () => {
		deletePostOrComment();
	};

	return (
		<div>
			<button
				type='button'
				onClick={handleDelete}
				className='inline-flex items-center px-5 py-2.5 ml-3 text-sm font-medium text-center text-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-["Ubuntu"]'>
				<BsFillTrashFill className='fill-blue-500' />
			</button>
		</div>
	);
};

export default DeleteButton;
