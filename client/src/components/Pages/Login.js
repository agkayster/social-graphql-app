import React, { useState } from 'react';
import { LOGIN_USER } from '../GRAPHQL/mutations';
import backgroundImage from '../../images/background_image_socials.jpeg';
import { useMutation } from '@apollo/client';
import { useForm } from '../../hooks/useForm';
// import { AuthContext } from '../../hooks/useTokenContext';

const Login = () => {
	/* retrieve our context data from useContext */
	// const context = useContext(AuthContext);
	// const { setGetUser } = useContext(AuthContext);

	/* call in our "useForm" hook */
	const { formData, handleFormDataChange, handleSubmit } = useForm(
		loginUserCallback,
		{
			username: '',
			password: '',
		}
	);

	/* create our navigate function from the hook */
	// const navigate = useNavigate();

	/* create our errors state, where we catch errors */
	const [errors, setErrors] = useState({});

	/* destructure formData to get the variables */
	const { username, password } = formData;

	/* we implement our register user graphql, addUser is the function we call that contains the formData variables */
	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		// update(_, { data: { login: userData } }) {
		// 	// context.login(userData);
		// 	navigate('/');
		// },
		update(proxy, result) {
			const authUser = result?.data?.login;
			localStorage.setItem('user', JSON.stringify(authUser));
			window.location.pathname = '/';
		},
		onError(err) {
			setErrors(
				err.graphQLErrors[0].extensions.code.password ||
					err.graphQLErrors[0].extensions.code.username
			);
		},
		variables: formData,
	});

	/* use this as a workaround, because in react, all functions that start with the word "function" are hoisted and can be called directly anywhere in the document*/
	function loginUserCallback() {
		return loginUser();
	}

	const errVal = Object.values(errors).join('');

	if (loading) return <h1>Logging you in...</h1>;

	return (
		<div
			className='bg-no-repeat bg-cover h-screen bg-center relative'
			style={{ backgroundImage: `url(${backgroundImage})` }}>
			<form
				onSubmit={handleSubmit}
				className='w-80 ml-6 pt-5 md:w-full md:flex md:flex-col md:items-center md:justify-center md:h-screen md:ml-0 md:pt-0 md:mt-0 md:border-none'>
				<div className='w-full border-none rounded mt-32 shadow-lg bg-white md:w-5/12 px-3 mb-0 md:border-2 md:rounded md:shadow-lg md:pt-5'>
					<label
						className='block uppercase tracking-wide text-gray-700 pt-5 text-xs font-bold mb-2 font-["Ubuntu"]'
						htmlFor='username'>
						Username
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
					rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white md:mb-4'
						id='username'
						type='text'
						value={username}
						onChange={handleFormDataChange}
						placeholder='Jane'
					/>
					{errVal && (
						<p className='text-red-500 text-xs italic mb-3 font-["Ubuntu"]'>
							{errVal}
						</p>
					)}

					<label
						className='block uppercase tracking-wide text-gray-700 pt-5 text-xs font-bold mb-2 font-["Ubuntu"]'
						htmlFor='password'>
						Password
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
					rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 md:mb-4'
						id='password'
						type='password'
						value={password}
						onChange={handleFormDataChange}
						placeholder='******************'
					/>
					{errVal && (
						<p className='text-red-500 text-xs italic mb-3 font-["Ubuntu"]'>
							{errVal}
						</p>
					)}
					<div className='flex items-center justify-center pb-6 font-["Ubuntu"]'>
						<button
							type='submit'
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
							Login
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
