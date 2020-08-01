import React, { useState } from 'react';
import clienteAxios from '../config/axios'
import Auth from '../utils/auth';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from "react-router-dom";

import '../Css/mainAdm.css'
import sweet from 'sweetalert2';


import PrivateRoute from './PrivateRoute';
import AdmMenu from '../pages/AdmMenu';
import CreateFoodsPage from '../pages/CreateFoodsPage'
import GetOrderPages from '../pages/GetOrderPages'
import EditFoods from '../pages/EditFoods'

const MenuAdm = () => {

	const history = useHistory()
	const [mostrarMenu, setMostrarMenu] = useState(false)

	const LogUotHandler = async () => {
		try {
			await clienteAxios.get(`/api/v1/usuarios/logout`);
			Auth.logOut();
			history.push('/');
		} catch (e) {
			const { response } = e;
			console.log(response);		
		}
	}

	return (
		<div className={"container-fluid " + (mostrarMenu ? "menuDisplayed" : '')} id="wrapper">
			<div className="row">
				<div className="col-12 justify-content-center" id="sidebar-wrapper">
					<ul className="sidebar-nav">
						<li><Link to="/admin/todas">Listado de todas las comidas</Link></li>
						<li><Link to="/admin/createfoods">Crear nuevas comidas</Link></li>
						<li><Link to="/admin/allorder">Listado de ordenes</Link></li>
						<li><Link onClick={LogUotHandler}>Cerrar Sesión</Link></li>
					</ul>
				</div>
			</div>

			<div className="row" id="page-content-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<button
								className="btn btn-secondary"
								onClick={() => setMostrarMenu(!mostrarMenu)} ><span className="glyphicon glyphicon-menu-hamburger"></span>menu</button>
							<h1 className="text-center">Tablero del administrador</h1>
							<h2 className="text-center">Asturias bar</h2>
							<p className="text-center">En este menu de administrador podrás consultar, editar y crear nuevas comidas y tragos. También podrás ver las ordenes y sus estados.</p>

							<Switch>
								<PrivateRoute exact path="/admin/todas" component={AdmMenu} />
								<PrivateRoute exact path="/admin/createfoods" component={CreateFoodsPage} />
								<PrivateRoute exact path="/admin/allorder" component={GetOrderPages} />
								<PrivateRoute path="/admin/edit/:id" exact role={'admin'} component={EditFoods} />
								<Route path="/admin" exact role={'admin'}> <Redirect to="/admin/todas" /> </Route>
							</Switch>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MenuAdm;
