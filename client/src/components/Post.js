import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { FETCH_SINGLE_POST_QUERY } from './GRAPHQL/queries';
import { CREATE_COMMENT_MUTATION } from './GRAPHQL/mutations';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import ToolTip from '../Utils/ToolTip';
import { AuthContext } from '../hooks/useTokenContext';
import moment from 'moment';
import postImage from '../images/remoteok.jpeg';
import useDeviceSize from '../hooks/useWindowsDimensions';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import { useForm } from '../hooks/useForm';

function Post() {
	/* id destructuring from useParams must match with id routes structure in App.js */
	let { postId } = useParams();

	const commentInputRef = useRef();

	const [comment, setComment] = useState('');

	const [openCommentModal, setOpenCommentModal] = useState(false);

	const { loading, error, data } = useQuery(FETCH_SINGLE_POST_QUERY, {
		/* postId is then sent to variables. Use shortcut here */
		variables: { postId },
	});

	const { handleFormDataChange, handleSubmit, formData } = useForm(
		createCommentCallBack,
		{
			body: comment,
			postId: postId,
		}
	);

	/* create our createPost function, taking in our mutation */
	const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
		update(proxy, result) {
			setComment('');
			commentInputRef.current.blur();
		},
		variables: formData,
	});

	/* use this as a workaround, because in react, all functions that start with the word "function" are hoisted and can be called directly anywhere in the document*/
	function createCommentCallBack() {
		return createComment();
	}

	const handleAddComment = () => {
		setOpenCommentModal(!openCommentModal);
	};

	const { getUser } = useContext(AuthContext);

	/* destructure singlePost from the data */
	const singlePost = data?.getPost;

	const [width] = useDeviceSize();

	const createdAt = singlePost?.createdAt;

	if (loading) return <h1>Please wait while loading...</h1>;
	if (error) return `Error ${error.message}`;

	if (width === 375) {
		return (
			<div className='max-w-sm rounded overflow-hidden shadow-lg'>
				<div className='mt-6'>
					<img
						className='w-full h-80'
						src={postImage}
						alt='Sunset in the mountains'
					/>
					<div className='px-6 py-4'>
						<div className='font-bold text-xl mb-1'>
							{singlePost?.username[0].toUpperCase()}
							{singlePost?.username.slice(1)}
						</div>
						<p className='text-gray-700 text-sm'>
							{createdAt}
							{/* {moment({ createdAt }).fromNow(true)} */}
						</p>
						<p className='text-gray-700 text-base font-medium'>
							{singlePost?.body}
						</p>
					</div>
				</div>
				<hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
				<div className='flex items-center justify-center mb-4'>
					<LikeButton
						AiFillHeart={AiFillHeart}
						AiOutlineHeart={AiOutlineHeart}
						likeCount={singlePost?.likeCount}
						id={singlePost?.id}
						likes={singlePost?.likes}
						getUser={getUser}
					/>
					{getUser && getUser.username === singlePost?.username && (
						<DeleteButton
							postId={singlePost?.id}
							BsFillTrashFill={BsFillTrashFill}
						/>
					)}
					<div className='group'>
						<button
							type='button'
							onClick={handleAddComment}
							className='inline-flex items-center px-5 py-2.5 ml-3 text-sm font-medium text-center text-blue-700 border-2 border-blue-400 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out duration-700 delay-150'>
							Add Comment
						</button>
						<span className='absolute bottom-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100'>
							Add Comment
						</span>
					</div>
				</div>
				{openCommentModal && (
					<div className='transition-all ease-in-out duration-700 delay-150'>
						<form onSubmit={handleSubmit}>
							<div className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
								<div className='px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800'>
									<label htmlFor='editor' className='sr-only'>
										Publish Comment
									</label>
									<textarea
										id='body'
										rows='8'
										value={formData.body}
										onChange={handleFormDataChange}
										ref={commentInputRef}
										className='block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white focus:ring-gray-400 dark:placeholder-gray-400'
										placeholder='Write a comment...'
										required></textarea>
								</div>
							</div>
							<button
								type='submit'
								disabled={!formData.body}
								className={
									formData.body
										? 'inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
										: 'inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
								}>
								Publish Comment
							</button>
							{/* <button
					type='submit'
					className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'>
					Publish Comment
				</button> */}
						</form>
					</div>
				)}
				<div className='grid grid-cols-1 gap-5'>
					<h1 className='flex flex-col items-center justify-center font-["ubuntu"] mt-3'>
						Comments
					</h1>
					{/* displaying comments under a single post */}
					{singlePost?.comments.map(
						({ id, body, username, createdAt }) => (
							<div
								className='px-6 py-4 border-solid border-2 flex flex-row'
								key={id}>
								<div className='w-72'>
									<div className='font-bold text-xl mb-1'>
										{username[0].toUpperCase()}
										{username.slice(1)}
									</div>
									<p className='text-gray-700 text-sm'>
										{createdAt}
										{/* {moment({ createdAt }).fromNow(true)} */}
									</p>
									<p className='text-gray-700 text-base font-medium'>
										{body}
									</p>
								</div>
								{/* if you didn't create the comment you can't delete it */}
								{getUser && getUser.username === username && (
									<DeleteButton
										postId={singlePost?.id}
										BsFillTrashFill={BsFillTrashFill}
										commentId={id}
									/>
								)}
							</div>
						)
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className='md:rounded md:overflow-hidden md:shadow-lg'>
				<img
					className='md:h-80 md:w-80 md:mt-3 md:float-right md:mr-3'
					src={postImage}
					alt='Sunset in the mountains'
				/>
				<div className='md:h-96'>
					<div className='md:px-6 md:py-4 md:h-screen'>
						<div className='font-bold text-xl mb-1'>
							{singlePost?.username[0].toUpperCase()}
							{singlePost?.username.slice(1)}
						</div>

						<p className='text-gray-700 text-sm'>
							{createdAt}
							{/* {moment({ createdAt }).fromNow(true)} */}
						</p>
						<p className='text-gray-700 text-base font-medium'>
							{singlePost?.body}
						</p>
					</div>
				</div>
				<hr className='md:h-px md:my-8 md:ml-1 md:w-full bg-gray-200 border-0 dark:bg-gray-700' />
				<div className='md:flex md:items-center md:justify-center md:mb-2 md:h-52'>
					<div className='group relative m-2 flex flex-row'>
						<LikeButton
							AiFillHeart={AiFillHeart}
							AiOutlineHeart={AiOutlineHeart}
							likeCount={singlePost?.likeCount}
							id={singlePost?.id}
							likes={singlePost?.likes}
							getUser={getUser}
						/>
						<span className='absolute -top-12 scale-0 w-full font-["ubuntu"] rounded transition-all bg-blue-700 p-2 text-xs text-white group-hover:scale-100'>
							Like Post
						</span>
					</div>
					{getUser && getUser.username === singlePost?.username && (
						<div className='group relative m-2 flex flex-row'>
							<DeleteButton
								postId={singlePost?.id}
								BsFillTrashFill={BsFillTrashFill}
							/>
							<span className='absolute -top-12 scale-0 w-full font-["ubuntu"] rounded transition-all bg-blue-700 p-2 text-xs text-white group-hover:scale-100'>
								Delete Post
							</span>
						</div>
					)}
					<ToolTip message={'Add Comment'}>
						<button
							type='button'
							onClick={handleAddComment}
							className='inline-flex items-center px-5 py-2.5 ml-3 text-sm font-medium text-center text-blue-700 border-2 border-blue-400 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							Add Comment
						</button>
					</ToolTip>
				</div>
				{openCommentModal && (
					<div className='transition-all ease-in-out duration-700 delay-150'>
						<form onSubmit={handleSubmit}>
							<div className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
								<div className='px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800'>
									<label htmlFor='editor' className='sr-only'>
										Publish Comment
									</label>
									<textarea
										id='body'
										rows='8'
										value={formData.body}
										onChange={handleFormDataChange}
										ref={commentInputRef}
										className='block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white focus:ring-gray-400 dark:placeholder-gray-400'
										placeholder='Write a comment...'
										required></textarea>
								</div>
							</div>
							<button
								type='submit'
								disabled={!formData.body}
								className={
									formData.body
										? 'inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
										: 'inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
								}>
								Publish Comment
							</button>
							{/* <button
					type='submit'
					className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'>
					Publish Comment
				</button> */}
						</form>
					</div>
				)}
				<div className='md:grid-cols-3 md:gap-12'>
					<h1 className='flex flex-col items-center justify-center font-["ubuntu"]'>
						Comments
					</h1>
					{/* displaying comments under a single post */}
					{singlePost?.comments.map(
						({ id, body, username, createdAt }) => (
							<div
								className='px-6 py-4 flex flex-row border-2 border-gray-50 mb-2'
								key={id}>
								<div className='w-screen'>
									<div className='font-bold text-xl mb-1'>
										{username[0].toUpperCase()}
										{username.slice(1)}
									</div>
									<p className='text-gray-700 text-sm'>
										{createdAt}
										{/* {moment({ createdAt }).fromNow(true)} */}
									</p>
									<p className='text-gray-700 text-base font-medium'>
										{body}
									</p>
								</div>
								{/* if you didn't create the comment you can't delete it */}
								{getUser && getUser.username === username && (
									<div className='group relative m-2 flex flex-row'>
										<DeleteButton
											postId={singlePost?.id}
											BsFillTrashFill={BsFillTrashFill}
											commentId={id}
										/>
										<span className='absolute -top-12 scale-0 w-full font-["ubuntu"] rounded transition-all bg-blue-700 p-2 text-xs text-white group-hover:scale-100'>
											Delete Comment
										</span>
									</div>
								)}
							</div>
						)
					)}
				</div>
			</div>
		);
	}
}

export default Post;
