import React from 'react';

const Box = ({ boxClass, row, col, selectBox, color, playing }) => {
	const selectFunction = () => {
		selectBox(row, col);
	};
	return (
		<div>
			{boxClass === 'box On' ? (
				<div
					className={playing ? `${boxClass} ${color}` : `${boxClass} ${color} action`}
					onClick={playing ? null : selectFunction}
				/>
			) : (
				<div
					className={playing ? ` ${boxClass}` : ` ${boxClass} action`}
					onClick={playing ? null : selectFunction}
				/>
			)}
		</div>
	);
};

export default Box;
