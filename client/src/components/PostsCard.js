import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import postImage from '../images/remoteok.jpeg';
import useDeviceSize from '../hooks/useWindowsDimensions';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa6';
import { BsFillTrashFill } from 'react-icons/bs';
import { AuthContext } from '../hooks/useTokenContext';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function PostsCard({
	username,
	body,
	createdAt,
	comments,
	id,
	likes,
	likeCount,
	commentCount,
}) {
	const [width] = useDeviceSize();

	const { getUser } = useContext(AuthContext);

	/* convert createdAt to JS date object */
	let d = new Date(createdAt);

	/* destructure hours */
	let dateString = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`;

	// let dateString = `${d.getHours()}`;
	// console.log('get date string:', dateString);

	/* use moment.js to get the time difference */
	let fromDate = moment(dateString, 'YYYYMMDD').startOf('hour').fromNow();

	if (width === 375) {
		return (
			<div className='max-w-sm rounded overflow-hidden shadow-lg'>
				<div>
					<Link
						to={`/posts/${id}`}
						relative='path'
						className='cursor-pointer'>
						<img
							className='w-full h-80'
							src={postImage}
							alt='Sunset in the mountains'
						/>
						<div className='px-6 py-4'>
							<div className='font-bold text-xl mb-1'>
								{username[0].toUpperCase()}
								{username.slice(1)}
							</div>

							<p className='text-gray-700 text-sm'>
								{/* Link us to the specific post with the id */}
								{/* {createdAt} */}
								{fromDate}
								{/* {moment({ createdAt }).fromNow(true)} */}
							</p>
							<p className='text-gray-700 text-base font-medium'>
								{body}
							</p>
						</div>
					</Link>
				</div>
				<hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
				<div className='flex items-center justify-center mb-4'>
					<LikeButton
						AiFillHeart={AiFillHeart}
						AiOutlineHeart={AiOutlineHeart}
						likeCount={likeCount}
						id={id}
						likes={likes}
						getUser={getUser}
					/>
					<Link to={`/posts/${id}`}>
						<button
							type='button'
							className='inline-flex items-center px-5 py-2.5 ml-3 text-sm font-medium text-center text-white border-2 border-blue-400 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							<FaComments className='fill-blue-500' />
							<span className='inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
								{commentCount}
							</span>
						</button>
					</Link>
					{getUser && getUser.username === username && (
						<DeleteButton
							postId={id}
							BsFillTrashFill={BsFillTrashFill}
						/>
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className='md:rounded md:overflow-hidden md:shadow-lg md:max-w-lg'>
				<Link
					to={`/posts/${id}`}
					relative='path'
					className='cursor-pointer'>
					<div className='md:flex md:justify-stretch'>
						<div className='md:px-6 md:py-4 md:w-80'>
							<div className='font-bold text-xl mb-1'>
								{username[0].toUpperCase()}
								{username.slice(1)}
							</div>

							<p className='text-gray-700 text-sm'>
								{/* Link us to the specific post with the id */}
								{/* {createdAt} */}
								{fromDate}
								{/* {moment({ createdAt }).fromNow()} */}
							</p>
							<p className='text-gray-700 text-base font-medium'>
								{body}
							</p>
						</div>

						<img
							className='md:h-12 md:w-12 md:mr-2 md:mt-3'
							src={postImage}
							alt='Sunset in the mountains'
						/>
					</div>
				</Link>
				<hr className='md:h-px md:my-8 md:ml-1 md:w-full bg-gray-200 border-0 dark:bg-gray-700' />
				<div className='md:flex md:items-center md:justify-center md:mb-2'>
					<div className='group relative m-2 flex flex-row'>
						<LikeButton
							AiFillHeart={AiFillHeart}
							AiOutlineHeart={AiOutlineHeart}
							likeCount={likeCount}
							id={id}
							likes={likes}
							getUser={getUser}
						/>
						<span className='absolute -top-10 scale-0 font-["ubuntu"] w-full rounded transition-all bg-blue-700 p-2 text-xs text-white group-hover:scale-100'>
							Like Post
						</span>
					</div>
					{/* would redirect to login if user is not logged in */}
					<Link to={`/posts/${id}`} relative='path'>
						<div className='group relative m-2 flex flex-row'>
							<button
								type='button'
								className='inline-flex items-center px-5 py-2.5 ml-3 text-sm font-medium text-center text-white border-2 border-blue-400 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								<FaComments className='fill-blue-500' />
								<span className='inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
									{commentCount}
								</span>
							</button>
							<span className='absolute -top-14 scale-0 w-full font-["ubuntu"] rounded transition-all bg-blue-700 p-2 text-xs text-white group-hover:scale-100'>
								Comment on Post
							</span>
						</div>
					</Link>
					{getUser && getUser.username === username && (
						<div className='group relative m-2 flex flex-row'>
							<DeleteButton
								postId={id}
								BsFillTrashFill={BsFillTrashFill}
							/>
							<span className='absolute -top-12 scale-0 w-full font-["ubuntu"] rounded transition-all bg-blue-700 p-2 text-xs text-white group-hover:scale-100'>
								Delete Post
							</span>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default PostsCard;
