import { gql } from '@apollo/client';

const FETCH_POSTS_QUERY = gql`
	query GetPosts {
		getPosts {
			id
			username
			body
			createdAt
			comments {
				body
				id
				createdAt
				username
			}
			likes {
				createdAt
				id
				username
			}
			likeCount
			commentCount
		}
	}
`;

const FETCH_SINGLE_POST_QUERY = gql`
	query GetPost($postId: ID!) {
		getPost(postId: $postId) {
			id
			username
			body
			createdAt
			comments {
				id
				body
				username
				createdAt
			}
			likes {
				id
				username
				createdAt
			}
			likeCount
			commentCount
		}
	}
`;

export { FETCH_POSTS_QUERY, FETCH_SINGLE_POST_QUERY };
