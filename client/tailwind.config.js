/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'blue-rgba': 'rgba(137, 196, 244, 0.54)',
				// 'black-rgba': 'rgba(0, 0, 0, 0.54)',
			},
		},
	},
	plugins: [],
};
