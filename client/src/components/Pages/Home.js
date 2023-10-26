import React from 'react';
import backgroundImage from '../../images/background_image_socials.jpeg';
import personWithPhone from '../../images/person-holding-mobile-phone.jpeg';
import emojiShades from '../../images/cool_shades_emoji.png';
import twitterXLogo from '../../images/twitterx-48.png';
import instagramLogo from '../../images/instagram-48.png';
import socialThumbsUp from '../../images/social-thumbs-up.png';
import facebookLogo from '../../images/facebook_icon.png';

export default function Home() {
	return (
		<div
			className='bg-no-repeat bg-cover h-screen bg-center relative'
			style={{ backgroundImage: `url(${backgroundImage})` }}>
			<div className='w-full h-full absolute bg-blue-rgba transition-all opacity-100 flex flex-col items-center justify-center pb-10'>
				<div className='border-none rounded-lg bg-blue-200 h-4/6 w-full flex flex-col items-center relative md:w-1/2'>
					<h6 className='border-none rounded-full font-["ubuntu"] shadow-lg mt-5 md:mt-3 text-orange-600 text-xs w-52 text-center'>
						Take control of your social media
					</h6>
					<h1 className='text-black font-["ubuntu"] text-[3.375rem] text-center -mt-3 font-extrabold md:w-[28rem] md:text-[4.375rem] md:-mt-5'>
						Manage your{' '}
						<span className='text-blue-400'>Social</span> Media{' '}
						<span className='flex flex-col items-center md:-mt-5'>
							Posts
						</span>
					</h1>
					<img
						alt='twitter-x-logo'
						src={twitterXLogo}
						className='absolute left-10 top-52 -rotate-45'
					/>
					<img
						alt='instagram logo'
						src={instagramLogo}
						className='absolute right-1 top-[30rem]'
					/>
					<img
						alt='facebook logo'
						src={facebookLogo}
						className='absolute w-16 h-14 mt-1 left-1 top-[30rem] md:top-[20rem] md:-left-10'
					/>
					<img
						alt='person with phone'
						src={personWithPhone}
						className='w-72 absolute top-72'
					/>
				</div>
				<img
					alt='emoji with shades'
					src={emojiShades}
					className='w-16 absolute right-12 top-5 rotate-12'
				/>
				<img
					alt='thumbs up emojis'
					src={socialThumbsUp}
					className='w-16 absolute left-12 top-5'
				/>
				{/* <img
					alt='emoji with shades'
					src={emojiShades}
					className='w-20 absolute right-32 top-48 rotate-45'
				/> */}
			</div>
		</div>
		// <div
		// 	className='bg-no-repeat bg-cover h-screen bg-center relative'
		// 	style={{ backgroundImage: `url(${backgroundImage})` }}>
		// 	<div className='w-full h-full absolute bg-black bg-black-rgba transition-all opacity-100 flex flex-col items-center justify-center pb-10'>
		// 		<div className='border-none rounded-lg bg-blue-200 h-4/6 w-1/2 flex flex-col items-center relative'>
		// 			<h1 className='text-black font-["ubuntu"] text-[70px] font-extrabold w-[28rem]'>
		// 				Manage your{' '}
		// 				<span className='text-blue-400'>Social</span> Media{' '}
		// 				<span className='flex flex-col items-center -mt-5'>
		// 					Posts
		// 				</span>
		// 			</h1>
		// 			<img
		// 				alt='person with phone'
		// 				src={personWithPhone}
		// 				className='w-72 absolute top-72'
		// 			/>
		// 		</div>
		// 	</div>
		// </div>
	);
}
