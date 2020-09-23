import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
	return (
		<motion.div
			initial={{ opacity: '0%', marginTop: '200px' }}
			animate={{ opacity: '100%', marginTop: '0px' }}
			transition={{ delay: 0.5, duration: 1.5 }}
			className="app"
		>
			<div className="hugeHeader">About</div>
			<h3>
				The Game of Life, also known simply as Life, is a cellular automaton devised by the British
				mathematician John Horton Conway in 1970.It is a zero-player game, meaning that its evolution is
				determined by its initial state, requiring no further input. One interacts with the Game of Life by
				creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a
				universal constructor or any other Turing machine.
			</h3>
			<div className="hugeHeader">Rules</div>
			<h3>
				1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.<br />
				2. Any live cell with two or three live neighbours lives on to the next generation.<br />
				3. Any live cell with more than three live neighbours dies, as if by overpopulation.<br />
				4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.<br />
			</h3>
		</motion.div>
	);
};

export default About;
