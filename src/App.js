import React, { useState } from 'react';
import { useInterval } from 'react-interval-hook';
import './App.css';

// Components
import Grid from './grid';

function App() {
	const [ gen, setGen ] = useState(0);
	const [ living, setLiving ] = useState(true);
	const [ speed, setSpeed ] = useState(500);
	const [ rows ] = useState(25);
	const [ cols ] = useState(25);
	const [ grid, setGrid ] = useState(Array(rows).fill().map(() => Array(cols).fill(false)));
	const freshGrid = Array(rows).fill().map(() => Array(cols).fill(false));
	var count = 0;

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
				}
			}
		}
		setGrid(gridCopy);
	};
	// Function created to count number of 'true' neighbors
	function counter(arr) {
		arr.map((cv) => {
			if (cv === true) {
				count++;
			}
		});
	}
	//Function used to apply game rules
	function checkNeighbors(R, C, arr) {
		if (arr[R][C] === false && count == 3) {
			arr[R][C] = true;
		}
		if (arr[R][C] === true && count < 2) {
			arr[R][C] = false;
		}
		if (arr[R][C] === true && count > 3) {
			arr[R][C] = false;
		}
		if (count > 0) {
			setLiving(true);
		}

		count = 0;
	}

	const { start, stop, isActive } = useInterval(
		() => {
			// console.log('Going!');
			gameMethod();
		},
		speed,
		{
			autoStart: false,
			immediate: false,
			onFinish: () => {
				console.log('Callback when timer is stopped');
			}
		}
	);
	const [ active, setActive ] = useState(isActive());

	function gameMethod() {
		if (living === false) {
			return { stop };
		}
		else {
			let gridCopy = arrayClone(grid);
			setLiving(false);

			for (var R = 0; R < rows; R++) {
				for (var C = 0; C < cols; C++) {
					// - if [R start, C start]
					if (R === 0 && C === 0) {
						const section = [ gridCopy[0][1], gridCopy[1][0], gridCopy[1][1] ];
						counter(section);
						checkNeighbors(R, C, gridCopy);
					}
					// - if [R start, C End]
					if (R === 0 && C === 24) {
						const section = [ gridCopy[0][23], gridCopy[1][24], gridCopy[1][23] ];
						counter(section);
						checkNeighbors(R, C, gridCopy);
					}
					// - if [R End, C start]
					if (R === 24 && C === 0) {
						const section = [ gridCopy[23][0], gridCopy[23][1], gridCopy[24][1] ];
						counter(section);
						checkNeighbors(R, C, gridCopy);
					}
					// - if [R end, C End]
					if (R === 24 && C === 24) {
						const section = [ gridCopy[24][23], gridCopy[23][23], gridCopy[23][24] ];
						counter(section);
						checkNeighbors(R, C, gridCopy);
					}

					// Using terns check to see if the current cells neighbors exisit.
					// Each tern looks for a different section of neighbors.
					// Undefines get iggnored when counted and are used to ensure react doesn't
					// throw an error when looking for an index that doesn't exist.
					const top =
						typeof gridCopy[R - 1] === 'undefined'
							? [ undefined ]
							: [ gridCopy[R - 1][C - 1], gridCopy[R - 1][C], gridCopy[R - 1][C + 1] ];

					const bottom =
						typeof gridCopy[R + 1] === 'undefined'
							? `${(R, C)}`
							: [ gridCopy[R + 1][C - 1], gridCopy[R + 1][C], gridCopy[R + 1][C + 1] ];

					const middle =
						typeof gridCopy[R][C] === 'undefined'
							? `${(R, C)}`
							: [ gridCopy[R][C - 1], gridCopy[R][C + 1] ];

					const neighbors = top.concat(middle, bottom);

					// Function above that uses a map to count the neighbors
					counter(neighbors);
					// Function above that applies the rules of the game and then clears the counter
					checkNeighbors(R, C, gridCopy);
				}
			}
			// Updates with the copy
			setGrid(gridCopy);
			// Updates the Generation count
			setGen(gen + 1);
		}
	}

	return (
		<div className="App">
			<h1> Generation: {gen} </h1>
			<Grid grid={grid} rows={rows} cols={cols} selectBox={selectBox} />
			<button onClick={start}>Play</button>
			<button onClick={stop}>Stop</button>
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
			<button
				onClick={() => {
					setSpeed(300);
				}}
			>
				Fast
			</button>
			<button
				onClick={() => {
					setSpeed(500);
				}}
			>
				Normal
			</button>
			<button
				onClick={() => {
					setSpeed(1000);
				}}
			>
				Slow
			</button>

			<h4> {living ? '' : "They're All Dead"} </h4>
		</div>
	);
}

export default App;
