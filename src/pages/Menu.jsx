import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import clienteAxios from '../config/axios';

const Menu = () => {
  const params = useParams()
  const [menu, setMenu] = useState([]);


  useEffect(() => {
    const consultApi = () => {
      clienteAxios.get('api/v1/comidas/todas')

        .then(response => {
          setMenu(response.data)
        })
        .catch(error => {
          const { response } = error
          console.log(response)
        })
    }
    consultApi();
  }, []);

  const cards = menu.map(a =>
    <div key={a._id} className="my-5 card">
      <img className="card-img-top" src="/images/pathToYourImage.png" alt="Card image cap" />
      <div className="card-body">
        <h4 className="card-title">{a.title}</h4>
        <p className="card-text">{a.description}</p>
        <p className="card-text">{a.price}</p>
        <p className="card-text">{a.category}</p>
         
      </div>
    </div>
  );

  return (
    <>
      <h1 className="my-5 titulo">Nuestro Menu de Comidas</h1>
      <div className="card-columns">
        {cards}
      </div>
    </>
  );
}

export default Menu;