import React from 'react';
import auth from '../utils/auth'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role, ...rest }) => (
	<	Route {...rest} render={(props) => (
		auth.isAuthenticated() && (role ? auth.hasRole(role) : true)
		?	<Component {...props} /> 
		:	<Redirect to={{ 
			pathname: '/', 
			state: { from: props.location } 
		}} />
	)} />
)

export default PrivateRoute;