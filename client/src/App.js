import React from 'react';
import './App.css';
import Home from './components/Home';
import CreateUser from './components/CreateUser'
import Login from './components/Login'
import FourOhFour from './components/FourOhFour'
import {
	Route,
	BrowserRouter as Router,
	Switch
} from 'react-router-dom'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={() => <Home />} />
				<Route exact path='/login' component={() => <Login />} />
				<Route exact path='/users' component={() => <CreateUser />} />
				<Route path='/work-orders' component={() => <Home />} />
				<Route component={FourOhFour} />
			</Switch>
		</Router>
	);
}

export default App;
