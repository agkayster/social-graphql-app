import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import useDeviceSize from '../hooks/useWindowsDimensions';
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6';
import { AuthContext } from '../hooks/useTokenContext';

export default function Navbar() {
	const [width] = useDeviceSize();
	const [mobileBurger, setMobileBurger] = useState(false);
	// const navigate = useNavigate();

	// const { logout } = useContext(AuthContext);

	const { getUser } = useContext(AuthContext);
	// console.log('get user in navbar =>', getUser);

	// const userDetail = JSON.parse(localStorage.getItem('user'));
	// console.log('get user detail from navbar =>', userDetail);
	const token = getUser?.token;
	const username = getUser?.username;

	const handleClick = () => {
		setMobileBurger(!mobileBurger);
	};

	const logout = () => {
		localStorage.removeItem('user');
		window.location.pathname = '/';
		// navigate('/');
	};

	if (width === 375) {
		return (
			<nav className='bg-blue-400 h-16 relative z-20'>
				<ul className='list-none m-0 p-0 overflow-hidden font-semibold font-["Ubuntu"] text-lg text-white'>
					<li className='float-left ml-3 p-4'>
						<NavLink
							to='/'
							className={({ isActive, isPending }) =>
								isPending
									? 'text-white'
									: isActive
									? 'text-yellow-400 underline'
									: ''
							}>
							Home
						</NavLink>
					</li>
					{mobileBurger ? (
						<li className='flex flex-col items-end mr-10 p-4 mt-2'>
							<FaAnglesDown
								onClick={handleClick}
								className='hidden'
							/>
						</li>
					) : (
						<li className='flex flex-col items-end mr-10 p-4 mt-2'>
							<FaAnglesDown onClick={handleClick} />
						</li>
					)}
				</ul>

				{mobileBurger && !token ? (
					<div className='bg-blue-400 transition-all ease-in-out duration-700 delay-150 -mt-10'>
						<ul
							className='font-["Ubuntu"] text-lg text-white
						 flex flex-col items-end'>
							<li>
								<FaAnglesUp
									className='mr-14'
									onClick={handleClick}
								/>
							</li>
							<li className='mr-9 p-4'>
								<NavLink
									to='/posts'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Posts
								</NavLink>
							</li>
							<li className='mr-3 p-4'>
								<NavLink
									to='/register'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Register
								</NavLink>
							</li>
							<li className='mr-9 p-4'>
								<NavLink
									to='/login'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Login
								</NavLink>
							</li>
						</ul>
					</div>
				) : !mobileBurger && !token ? (
					<div className='bg-blue-400 -mt-60 transition-all ease-in-out duration-700 delay-150'>
						<ul className=' font-["Ubuntu"] text-lg text-white flex flex-col items-end'>
							<li>
								<FaAnglesUp className='mr-14' />
							</li>

							<li className='mr-9 p-4'>
								<NavLink
									to='/posts'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Posts
								</NavLink>
							</li>
							<li className='mr-3 p-4'>
								<NavLink
									to='/register'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Register
								</NavLink>
							</li>
							<li className='mr-9 p-4'>
								<NavLink
									to='/login'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Login
								</NavLink>
							</li>
						</ul>
					</div>
				) : mobileBurger && token ? (
					<div className='bg-blue-400 transition-all ease-in-out duration-700 delay-150 -mt-10'>
						<ul
							className='font-["Ubuntu"] text-lg text-white
						 flex flex-col items-end'>
							<li>
								<FaAnglesUp
									className='mr-14'
									onClick={handleClick}
								/>
							</li>
							<li className='mr-9 p-4'>
								<p>
									{' '}
									Welcome {username[0].toUpperCase()}
									{username.slice(1)}
								</p>
							</li>
							<li className='mr-28 p-4'>
								<NavLink
									to='/posts'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Posts
								</NavLink>
							</li>
							<li className='mr-20 p-4'>
								<NavLink
									to='/newPost'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Add Post
								</NavLink>
							</li>
							<li
								className='mr-24 p-4 cursor-pointer'
								onClick={logout}>
								Logout
							</li>
						</ul>
					</div>
				) : !mobileBurger && token ? (
					<div className='bg-blue-400 -mt-80 transition-all ease-in-out duration-700 delay-150'>
						<ul className=' font-["Ubuntu"] text-lg text-white flex flex-col items-end'>
							<li>
								<FaAnglesUp className='mr-14' />
							</li>

							<li className='mr-9 p-4'>
								<p>
									{' '}
									Welcome {username[0].toUpperCase()}
									{username.slice(1)}
								</p>
							</li>

							<li className='mr-28 p-4'>
								<NavLink
									to='/posts'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Posts
								</NavLink>
							</li>
							<li className='mr-20 p-4'>
								<NavLink
									to='/newPost'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Add Post
								</NavLink>
							</li>
							<li
								className='mr-24 p-4 cursor-pointer'
								onClick={logout}>
								Logout
							</li>
						</ul>
					</div>
				) : null}
			</nav>
		);
	} else {
		return (
			<nav className='border-solid border-black bg-blue-400 h-16'>
				<ul className='list-none m-0 p-0 overflow-hidden font-semibold font-["Ubuntu"] text-lg text-white'>
					<li className='float-left ml-3 p-4'>
						<NavLink
							to='/'
							className={({ isActive, isPending }) =>
								isPending
									? 'text-white'
									: isActive
									? 'text-yellow-400 underline'
									: ''
							}>
							Home
						</NavLink>
					</li>
					<li className='float-left ml-9 p-4'>
						<NavLink
							to='/posts'
							className={({ isActive, isPending }) =>
								isPending
									? 'text-white'
									: isActive
									? 'text-yellow-400 underline'
									: ''
							}>
							Posts
						</NavLink>
					</li>

					{!token ? (
						<>
							<li className='float-right mr-3 p-4'>
								<NavLink
									to='/login'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Login
								</NavLink>
							</li>
							<li className='float-right mr-3 p-4'>
								<NavLink
									to='/register'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Register
								</NavLink>
							</li>
						</>
					) : (
						<>
							<li
								className='float-right mr-3 p-4 cursor-pointer'
								onClick={logout}>
								Logout
							</li>
							<li className='float-right mr-3 p-4'>
								<p>
									Welcome {username[0].toUpperCase()}
									{username.slice(1)}
								</p>
							</li>
							<li className='float-right mr-6 p-4'>
								<NavLink
									to='/newPost'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-white'
											: isActive
											? 'text-yellow-400 underline'
											: ''
									}>
									Add Post
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</nav>
		);
	}
}
