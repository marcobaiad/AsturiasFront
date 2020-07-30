import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/logUser.css'
import clienteAxios from '../config/axios';


const AdmMenu = () => {

	const [menu, setMenu] = useState([]);


	useEffect(() => {
		const consultApi = () => {
			clienteAxios.get('api/v1/comidas/todas')

				.then(response => {
					setMenu(response.data)
				})
				.catch(error => {
					console.log(error)
				})
		}
		consultApi();
	}, []);

	const cards = menu.map(a =>
		<Link to={'/admin/edit/' + a._id} >
			<div key={a._id} className=" row my-5 card DivContainer">
				<img
					className="card-img-top imgAdmin"
					src={`http://localhost:3001` + a.imageUrl}
					alt="Card image cap"
				/>
				<div className="card-body">
					<h4 className="card-title"> {a.title} </h4>
					<p className="card-text" > {a.summary} </p>
					<p className="card-text" > {a.description} </p>
					<p className="card-text" > $ {a.price} </p>
					<p className="card-text"> {a.enable ? 'Habilitado' : 'Deshabilitado'}</p>
				</div>
			</div>
		</Link>
	);

	return (
		<>
			<h1 className="my-5 text-center titleAdmFoods" > Menu de Comidas (administrador) </h1>
			<div className="container" >
			<div className="card-columns">
					{cards}
				</div>
			</div>
		</>
	);
}

export default AdmMenu;