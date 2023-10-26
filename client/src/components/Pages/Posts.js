import React from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../GRAPHQL/queries';
import PostsCard from '../PostsCard';

const Posts = () => {
	const {
		loading,
		error,
		data: { getPosts: posts } = {},
	} = useQuery(FETCH_POSTS_QUERY);

	if (loading) return <h1>Loading posts...</h1>;
	if (error) return `Error ${error.message}`;

	return (
		<div>
			<h1 className='flex items-center justify-center font-bold text-lg my-3'>
				Travel Blog Posts
			</h1>
			<div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-12'>
				{posts &&
					posts.map(
						({
							body,
							commentCount,
							comments,
							createdAt,
							id,
							likeCount,
							likes,
							username,
						}) => (
							<div
								className='border-solid border-2 md:ml-3 md:mr-3'
								key={id}>
								<PostsCard
									id={id}
									body={body}
									commentCount={commentCount}
									comments={comments}
									createdAt={createdAt}
									likeCount={likeCount}
									likes={likes}
									username={username}
								/>
							</div>
						)
					)}
			</div>
		</div>
	);
};

export default Posts;
