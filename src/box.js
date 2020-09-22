import React from 'react';

const Box = ({ boxId, boxClass, row, col, selectBox, color }) => {
	console.log(boxClass);
	const selectFunction = () => {
		selectBox(row, col);
	};
	return (
		<div>
			{boxClass === 'box On' ? (
				<div className={`${boxClass} ${color}`} onClick={selectFunction} />
			) : (
				<div className={`${boxClass}`} onClick={selectFunction} />
			)}
		</div>
	);
};

export default Box;
