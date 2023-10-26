export const typeDefs = `#graphql
	type Post	{
		id: ID!
		body: String!
		username: String!
		createdAt: String!
		comments:[Comment]!
		likes:[Like]!
		likeCount: Int!
		commentCount:Int!
	}

	type Comment{
		id: ID!
		username:String!
		createdAt:String!
		body:String!
	}

	type Like{
		id: ID!
		username:String!
		createdAt:String!
	}

	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
	}

	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	# input LoginInput {
	# 	username: String!
	# 	password: String!
	# }

	type Query {
		getPosts:	[Post]
		getPost(postId:ID!):Post
	}

	type Mutation {
		register(registerInput: RegisterInput):User!
		# login(loginInput: LoginInput):User!
		login(username: String!, password: String!):User!
		createPost(body: String!):Post!
		deletePost(postId:ID!):String!
		createComment(postId:String!, body:String!):Post!
		deleteComment(postId:ID!, commentId:ID!):Post!
		likePost(postId:ID!):Post!
	}


`;
// export const typeDefs = `#graphql
// 	type User {
// 		id: ID!
// 		name: String!
// 		username: String!
// 		age: Int!
// 		nationality: Nationality
//     friends: [User]
// 		favouriteMovies: [Movie]
// 	}

// 	type Movie{
// 		id:ID!
// 		name: String!
// 		year: Int!
// 		isInTheaters: Boolean!
// 	}

// 	type Query {
// 		users: [User!]!
// 		user(id:ID):User!
// 		movies:[Movie!]!
// 		movie(name:String!):Movie!
// 	}

// 	input CreateUserInput {
// 		name:String!
// 		username:String!
// 		age:Int!
// 		nationality: Nationality = NIGERIA

// 	}

// 	input UpdateUsernameInput {
// 		id:ID!
// 		newUsername:String!
// 	}

// 	type Mutation {
// 		createUser(input:CreateUserInput!):User
// 		updateUsername(input:UpdateUsernameInput!):User
// 		deleteUser(id:ID!):User
// 	}

//   enum Nationality {
//   	CANADA
//   	TRINIDADTOBAGO
//   	SPAIN
//   	CHINA
//   	JAPAN
//   }
// `;

// module.exports = { typeDefs };
