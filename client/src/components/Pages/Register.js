import React, { useState } from 'react';
import backgroundImage from '../../images/background_image_socials.jpeg';
import { Link } from 'react-router-dom';
import { REGISTER_USER } from '../GRAPHQL/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
// import { AuthContext } from '../../hooks/useTokenContext';

function Register() {
	// const context = useContext(AuthContext);

	/* call in our "useForm" hook */
	const { formData, handleFormDataChange, handleSubmit } = useForm(
		registerUserCallback,
		{
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		}
	);

	/* create our navigate function from the hook */
	const navigate = useNavigate();

	/* create our errors state, where we catch errors */
	const [errors, setErrors] = useState({});

	/* destructure formData to get the variables */
	const { username, email, password, confirmPassword } = formData;

	/* we implement our register user graphql, addUser is the function we call that contains the formData variables */
	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			// context.login(userData);
			navigate('/login');
		},
		/* use onError to catch our errors/validations on our formData */
		onError(err) {
			setErrors(
				err.graphQLErrors[0].extensions.code.username ||
					err.graphQLErrors[0].extensions.code.email ||
					err.graphQLErrors[0].extensions.code.password ||
					err.graphQLErrors[0].extensions.code.confirmPassword
			);
		},
		variables: formData,
	});

	/* use this as a workaround, because in react, all functions that start with the word "function" are hoisted and can be called directly anywhere in the document*/
	function registerUserCallback() {
		return addUser();
	}

	const errVal = Object.values(errors).join('');

	if (loading) return <h1>Registering user...</h1>;

	return (
		<div
			className='bg-no-repeat bg-cover h-screen bg-center relative'
			style={{ backgroundImage: `url(${backgroundImage})` }}>
			<form
				onSubmit={handleSubmit}
				className='w-80 ml-6 pt-10 md:w-full md:flex md:flex-col md:items-center md:justify-center md:h-screen md:ml-0 md:pt-0 md:mt-0 md:border-none'>
				<div className='md:border-2 md:rounded md:pt-5 md:shadow-lg mt-5 border-none rounded shadow-lg bg-white'>
					<div className='flex flex-col -mx-3 mb-6 px-4'>
						<div className='w-full mt-5 md:w-full px-3 mb-6 md:mb-0'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 font-["Ubuntu"]'
								htmlFor='username'>
								Username
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
								id='username'
								type='text'
								value={username}
								onChange={handleFormDataChange}
								placeholder='Jane'
							/>
							{errVal &&
							errVal.includes(
								'Username field must not be empty'
							) ? (
								<p className='text-red-500 text-xs italic'>
									{errVal}
								</p>
							) : null}
						</div>
						<div className='w-full md:w-full px-3 md:mt-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 font-["Ubuntu"]'
								htmlFor='email'>
								Email
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='email'
								type='text'
								value={email}
								onChange={handleFormDataChange}
								placeholder='john@gmail.com'
							/>
							{errVal &&
							errVal.includes('Email field must not be empty') ? (
								<p className='text-red-500 text-xs italic'>
									{errVal}
								</p>
							) : null}
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-6 px-4'>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 font-["Ubuntu"]'
								htmlFor='password'>
								Password
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='password'
								type='password'
								value={password}
								onChange={handleFormDataChange}
								placeholder='******************'
							/>
							{errVal &&
							errVal.includes(
								'Password field must not be empty'
							) ? (
								<p className='text-red-500 text-xs italic mb-3'>
									{errVal}
								</p>
							) : null}
						</div>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 font-["Ubuntu"]'
								htmlFor='confirm-password'>
								Confirm Password
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='confirmPassword'
								type='password'
								value={confirmPassword}
								onChange={handleFormDataChange}
								placeholder='******************'
							/>
							{errVal &&
							errVal.includes(
								'Password must match Confirm Password'
							) ? (
								<p className='text-red-500 text-xs italic'>
									{errVal}
								</p>
							) : null}
						</div>
					</div>
					<div className='flex items-center justify-evenly pb-10 font-["Ubuntu"]'>
						<button
							type='submit'
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
							Register
						</button>
						<Link to='/login'>
							<p>Login →</p>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Register;
