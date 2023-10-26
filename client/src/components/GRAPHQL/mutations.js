import { gql } from '@apollo/client';

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			token
			createdAt
		}
	}
`;

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			username
			token
		}
	}
`;

const CREATE_POST_MUTATION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			username
			createdAt
			likes {
				id
				username
				createdAt
			}
			likeCount
			comments {
				id
				username
				createdAt
				body
			}
			commentCount
		}
	}
`;

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
				createdAt
			}
			likeCount
		}
	}
`;

const CREATE_COMMENT_MUTATION = gql`
	mutation createComment($postId: String!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				username
				body
				createdAt
			}
			commentCount
		}
	}
`;

const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			comments {
				id
				body
				createdAt
				username
			}
			commentCount
		}
	}
`;

export {
	REGISTER_USER,
	LOGIN_USER,
	CREATE_POST_MUTATION,
	DELETE_POST_MUTATION,
	LIKE_POST_MUTATION,
	CREATE_COMMENT_MUTATION,
	DELETE_COMMENT_MUTATION,
};
