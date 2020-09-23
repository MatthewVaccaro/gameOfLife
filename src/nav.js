import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Nav = () => {
	return (
		<div className="nav">
			<Link exact to="/">
				Game
			</Link>
			<Link exact to="/about">
				About / Rules
			</Link>
		</div>
	);
};

export default Nav;
