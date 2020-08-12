import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


//pages
import Header from '../src/components/Header';
import HomePage from './pages/HomePage';
import RegUser from './pages/RegUser';
import Footer from '../src/components/Footer';
import PrivateRoute from './components/PrivateRoute';
import PlatoPage from './pages/PlatoPage';
import GetOrderUserPages from './pages/GetOrderUserPages';
import MenuAdm from './components/MenuAdm';
import UserProfilePage from './pages/UserProfilePage';
import RecoverPass from './pages/RecoverPass'

function App() {

	return (
		<Router>
			<Route component={Header}/>
			<Switch>
				<PrivateRoute path="/admin" role={'admin'} component={MenuAdm} />
				<PrivateRoute path="/user/orders/:id" exact role={'user'} component={GetOrderUserPages} />
				<PrivateRoute path="/user/orders/" exact role={'user'} component={GetOrderUserPages} />
				<PrivateRoute path="/user/perfil/:id" role={'user'} component={UserProfilePage} />
				<Route path="/plato/:id" exact role={'user'} component={PlatoPage} />
				<Route path="/reg" exact component={RegUser} />
				<Route path="/recoverpass/:tokenId" component={RecoverPass} />
				<Route exact path="/" component={HomePage} />
			</Switch>
			<Route component={Footer}/>
		</Router>
	);
}

export default App;