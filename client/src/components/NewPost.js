import React, { Fragment } from 'react';
import { CREATE_POST_MUTATION } from './GRAPHQL/mutations';
import { FETCH_POSTS_QUERY } from './GRAPHQL/queries';
import { useMutation } from '@apollo/client';
import { useForm } from '../hooks/useForm';

const NewPost = () => {
	/* import our form hooks useForm. This takes in our callback function (createPost) and 
  our initialState for formData */
	const { handleFormDataChange, handleSubmit, formData } = useForm(
		createPostCallBack,
		{ body: '' }
	);

	/* create our createPost function, taking in our mutation */
	const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY,
			});
			data.getPosts = [result.data.createPost, ...data.getPosts];
			proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
			window.location.pathname = '/posts';
		},
		variables: formData,
	});

	/* use this as a workaround, because in react, all functions that start with the word "function" are hoisted and can be called directly anywhere in the document*/
	function createPostCallBack() {
		return createPost();
	}

	if (loading) return <h1>Submitting Post...</h1>;
	return (
		<Fragment>
			<form onSubmit={handleSubmit}>
				<div className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
					<div className='px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800'>
						<label htmlFor='editor' className='sr-only'>
							Publish post
						</label>
						<textarea
							id='body'
							rows='8'
							value={formData.body}
							onChange={handleFormDataChange}
							className='block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white focus:ring-gray-400 dark:placeholder-gray-400'
							placeholder='Write an article...'
							required></textarea>
					</div>
				</div>
				<button
					type='submit'
					className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'>
					Publish post
				</button>
			</form>
		</Fragment>
	);
};

export default NewPost;
