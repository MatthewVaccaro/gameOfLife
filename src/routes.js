import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import App from './App';
import About from './about';
import Nav from './nav';

const Routes = () => {
	return (
		<div>
			<Nav />
			<Route exact path="/" component={App} />
			<Route exact path="/about" component={About} />
		</div>
	);
};

export default Routes;
