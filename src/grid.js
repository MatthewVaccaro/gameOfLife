import React from 'react';
import Box from './box';

const Grid = ({ grid, rows, cols, selectBox, color }) => {
	var rowsArr = [];
	var boxClass = '';
	for (var indexR = 0; indexR < rows; indexR++) {
		for (var indexC = 0; indexC < cols; indexC++) {
			let boxId = indexR + '_' + indexC;

			boxClass = grid[indexR][indexC] ? 'box On' : 'box Off';
			rowsArr.push(
				<Box
					color={color}
					boxClass={boxClass}
					key={boxId}
					boxId={boxId}
					row={indexR}
					col={indexC}
					selectBox={selectBox}
				/>
			);
		}
	}

	return <div className="grid">{rowsArr}</div>;
};

export default Grid;
