import React, { useState, useEffect } from 'react';
/* if not logged in, Link takes you back to home page */
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LIKE_POST_MUTATION } from './GRAPHQL/mutations';

/* make the likeButton a Component */
export default function LikeButton({
	AiFillHeart,
	AiOutlineHeart,
	likeCount,
	id,
	likes,
	getUser,
}) {
	const [liked, setLiked] = useState(false);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
	});

	const handleLikeClick = () => likePost();

	const username = getUser?.username;

	/* when DOM loads this useEffect kicks in */
	useEffect(() => {
		if (
			/* if user name that liked a post is the same as the user name that is logged in, set liked to true */
			username &&
			likes.find((like) => like.username === username)
		) {
			setLiked(true);
		} else {
			setLiked(false);
		}
		/* if anything changes below, recalculate our values */
	}, [username, likes]);

	/* username wraps the whole condition, if liked comes under as a sub-condition */
	const likeButton = username ? (
		liked ? (
			<AiFillHeart className='fill-red-500' />
		) : (
			<AiOutlineHeart className='fill-red-500' />
		)
	) : (
		/* takes you to login page if not logged in */
		<Link to='/login'>
			<AiOutlineHeart className='fill-red-500' />
		</Link>
	);

	return (
		<button
			type='button'
			onClick={handleLikeClick}
			className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-2 border-blue-400 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
			{/* <AiFillHeart className='fill-red-500' /> */}
			{likeButton}
			<span className='inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
				{likeCount}
			</span>
		</button>
	);
}
