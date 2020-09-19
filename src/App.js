import React, { useState } from 'react';
import './App.css';

// Components
import Grid from './grid';

function App() {
	const [ rows ] = useState(25);
	const [ cols ] = useState(25);
	const [ grid, setGrid ] = useState(Array(rows).fill().map(() => Array(cols).fill(false)));
	const freshGrid = Array(rows).fill().map(() => Array(cols).fill(false));

	function reset() {
		setGrid(freshGrid);
	}

	function arrayClone(arr) {
		return JSON.parse(JSON.stringify(arr));
	}

	const selectBox = (row, col) => {
		let gridCopy = arrayClone(grid);
		gridCopy[row][col] = !gridCopy[row][col];
		setGrid(gridCopy);
	};

	const seed = () => {
		let gridCopy = arrayClone(grid);
		for (var R = 0; R < rows; R++) {
			for (var C = 0; C < cols; C++) {
				let num = Math.floor(Math.random() * 4);
				if (num === 1) {
					gridCopy[R][C] = true;
					console.log(gridCopy);
				}
			}
		}
		setGrid(gridCopy);
	};

	console.log(grid);

	function gameMethod() {
		let g = grid;
		let gridCopy = arrayClone(grid);
		var count = 0;

		for (var R = 0; R < rows; R++) {
			for (var C = 0; C < cols; C++) {
				// - if [start, start] Do X
				if (R === 0 && C === 0) {
					console.log('Start Start');
				}
				// - if [length, start] Do X
				if (R === 24 && C === 0) {
					console.log('End Start');
				}
				// - if [start, length] Do X
				if (R === 0 && C === 24) {
					console.log('Start End');
				}
				// - if [length, length] DO X
				if (R === 24 && C === 24) {
					console.log('End End');
				}

				if (R > 0 && R < 24 && C > 0 && C < 24) {
					const sectionArray = [];
					sectionArray.push(
						gridCopy[R - 1][C - 1],
						gridCopy[R - 1][C],
						gridCopy[R - 1][C + 1],
						gridCopy[R][C - 1],
						gridCopy[R][C + 1],
						gridCopy[R + 1][C - 1],
						gridCopy[R + 1][C],
						gridCopy[R + 1][C + 1]
					);
					sectionArray.map((cv) => {
						if (cv === true) {
							count = count + 1;
						}
					});

					if (gridCopy[R][C] === false && count == 3) {
						gridCopy[R][C] = true;
					}
					if (gridCopy[R][C] === true && count < 2) {
						gridCopy[R][C] = false;
					}
					if (gridCopy[R][C] === true && count > 3) {
						gridCopy[R][C] = false;
					}

					count = 0;
				}
			}
		}
		setGrid(gridCopy);
	}

	return (
		<div className="App">
			<Grid grid={grid} rows={rows} cols={cols} selectBox={selectBox} />
			<button
				onClick={() => {
					gameMethod();
				}}
			>
				Play
			</button>
			<button
				onClick={() => {
					seed();
				}}
			>
				Seed
			</button>
			<button
				onClick={() => {
					reset();
				}}
			>
				Reset
			</button>
		</div>
	);
}

export default App;
