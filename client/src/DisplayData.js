import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';

const GET_ALL_USERS = gql`
	query GetAllUsers {
		users {
			id
			name
			age
			username
			nationality
			friends {
				id
				name
				age
				username
			}
			favouriteMovies {
				id
				name
				year
				isInTheaters
			}
		}
	}
`;

const GET_ALL_MOVIES = gql`
	query GetMovies {
		movies {
			id
			name
			year
			isInTheaters
		}
	}
`;

const GET_MOVIE_BY_NAME = gql`
	query GetMovie($name: String!) {
		movie(name: $name) {
			name
			year
			isInTheaters
		}
	}
`;

const CREATE_USER_MUTATION = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			id
			name
			age
			nationality
		}
	}
`;

const DELETE_USER_MUTATION = gql`
	mutation DeleteUser($deleteUserId: ID!) {
		deleteUser(id: $deleteUserId) {
			id
		}
	}
`;

const DisplayData = () => {
	/* Search movie state */
	const [movieSearched, setMovieSearched] = useState('');

	/* Create User state */
	const [createUser, setCreateUser] = useState({
		name: '',
		age: '',
		username: '',
		nationality: '',
	});
	// const [name, setName] = useState('');
	// const [username, setUsername] = useState('');
	// const [age, setAge] = useState(0);
	// const [nationality, setNationality] = useState('');

	const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
	const {
		loading: loadingMovies,
		error: errorMovies,
		data: dataMovies,
	} = useQuery(GET_ALL_MOVIES);

	const [fetchMovie, { data: movieSearchedData, error: movieError }] =
		useLazyQuery(GET_MOVIE_BY_NAME);

	const [createMutationUser] = useMutation(CREATE_USER_MUTATION);
	const [deleteMutationUser] = useMutation(DELETE_USER_MUTATION);

	const handleChange = (e) => {
		const { value } = e.target;
		if (value) {
			setMovieSearched(value);
		} else {
			setMovieSearched('');
		}
	};

	const handleNameChange = (e) => {
		const { value } = e.target;
		if (value) {
			setCreateUser({ ...createUser, name: value });
		}
	};
	const handleUsernameChange = (e) => {
		const { value } = e.target;
		if (value) {
			setCreateUser({ ...createUser, username: value });
		}
	};
	const handleAgeChange = (e) => {
		const { value } = e.target;
		if (value) {
			setCreateUser({ ...createUser, age: +value });
			// setAge(+value);
		}
	};
	const handleNationalityChange = (e) => {
		const { value } = e.target;
		if (value) {
			setCreateUser({ ...createUser, nationality: value.toUpperCase() });
			// setNationality(value.toUpperCase());
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleClick = () => {
		setMovieSearched('');
		/* what we type into movieSearched is attached to the name property from query get movie by name graphql */
		fetchMovie({ variables: { name: movieSearched } });
	};

	const handleUserDelete = (userId) => {
		/* deleteUserId must match what is on Apollo server playground and userId must be a number */
		deleteMutationUser({ variables: { deleteUserId: +userId } });
		refetch();
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error:{error.message}</p>;
	if (loadingMovies) return <p>Movies still Loading..</p>;
	if (errorMovies) return <p>Movies Error:{errorMovies.message}</p>;
	let errorMsg = movieError?.message.includes('Cannot return null') ? (
		<p>Movie Error: Movie does not exist</p>
	) : null;

	return (
		<div>
			<form className='mb-2' onSubmit={handleSubmit}>
				<input
					type='text'
					className='border-solid border-4 border-black'
					placeholder='Name...'
					onChange={handleNameChange}
				/>
				<input
					type='number'
					className='border-solid border-4 border-black'
					placeholder='Age...'
					onChange={handleAgeChange}
				/>
				<input
					type='text'
					className='border-solid border-4 border-black'
					placeholder='Username...'
					onChange={handleUsernameChange}
				/>
				<input
					type='text'
					className='border-solid border-4 border-black'
					placeholder='Nationality...'
					onChange={handleNationalityChange}
				/>
				<input />
				<div>
					<button
						type='submit'
						onClick={() => {
							createMutationUser({
								variables: {
									input: {
										/*name is gotten from mutation and createUser.name is gotten from state */
										name: createUser.name,
										username: createUser.username,
										age: createUser.age,
										nationality: createUser.nationality,
									},
								},
							});
							refetch();
						}}
						className='border-none border-2 border-blue-500 mt-3 px-4 py-2 bg-emerald-600 text-white'>
						Create User
					</button>
				</div>
			</form>
			<h1>List of Users</h1>
			<ul className='mt-3'>
				{data &&
					data.users.map(
						({ id, name, username, age, nationality }) => (
							<div key={id} className='mb-2'>
								<li>Name: {name}</li>
								<li>Age: {age}</li>
								<li>Username: {username}</li>
								<li>Nationality: {nationality}</li>
								<li onClick={() => handleUserDelete(id)}>
									Delete User
								</li>
							</div>
						)
					)}
			</ul>
			<h1 className='mt-4'>List of Movies</h1>
			<ul className='mt-3'>
				{dataMovies &&
					dataMovies.movies.map(
						({ id, name, year, isInTheaters }) => (
							<div key={id} className='mb-2'>
								<li>Title: {name}</li>
								<li>Year of Release: {year}</li>
								{isInTheaters ? (
									<li>Showing in Cinemas: Yes</li>
								) : (
									<li>Showing in Cinemas: No</li>
								)}
							</div>
						)
					)}
			</ul>
			<div>
				<input
					type='text'
					className='border-solid border-4 border-black'
					placeholder='Aki and PawPaw...'
					// onChange={(e) => setMovieSearched(e.target.value)}
					onChange={handleChange}
					value={movieSearched}
				/>
				<button
					type='button'
					// onClick={() => {
					// 	setMovieSearched('');
					// 	fetchMovie({ variables: { name: movieSearched } });
					// }}
					onClick={handleClick}
					className='border-none border-2 rounded-full border-blue-500 ml-3 px-4 py-2 bg-emerald-600 text-white'>
					Fetch Data
				</button>
				<div>
					<ul>
						{movieSearchedData && (
							<>
								<li>
									Movie Name: {movieSearchedData.movie.name}
								</li>
								<li>
									Year of Release:{' '}
									{movieSearchedData.movie.year}
								</li>
								<li>
									Showing in Theaters:{' '}
									{movieSearchedData.movie.isInTheaters
										? 'Yes'
										: 'No'}
								</li>
							</>
						)}
					</ul>
				</div>
				<div>
					<h1>{errorMsg}</h1>
				</div>
			</div>
		</div>
	);
};

export default DisplayData;
