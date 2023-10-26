import React from 'react';

const ToolTip = ({ message, children }) => {
	return (
		<div className='group relative m-2 flex flex-row'>
			{children}
			<span className='absolute -top-10 right-5 scale-0 rounded transition-all bg-blue-700 p-2 text-xs text-white group-hover:scale-100'>
				{message}
			</span>
		</div>
	);
};

export default ToolTip;
