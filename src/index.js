import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

ReactDOM.render(
	<Router>
		<React.StrictMode>
			<Routes />
		</React.StrictMode>
	</Router>,
	document.getElementById('root')
);
