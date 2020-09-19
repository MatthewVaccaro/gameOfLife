import React from 'react';

const Box = ({ boxId, boxClass, row, col, selectBox }) => {
	const selectFunction = () => {
		selectBox(row, col);
	};
	return <div className={boxClass} onClick={selectFunction} />;
};

export default Box;
