import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'

import clienteAxios from '../config/axios';


const GetOderPages = () => {
  const [order, setOrder] = useState([]);

  const GetOrder = useCallback(async () => {
    const res = await clienteAxios.get(`/api/v1/orden/`, order);
    setOrder(res.data)
  }, []);

  useEffect(() => {
    GetOrder()
  }, [])

  const EnProceso = async (id) => {
    await clienteAxios.put(`http://localhost:3001/api/v1/orden/${id}/ep`)
    GetOrder()
  }

  const Enviar = async (id) => {
    await clienteAxios.put(`http://localhost:3001/api/v1/orden/${id}/enviar`)
    GetOrder()
  }

  const Cancelar = (id) => {
    clienteAxios.put(`http://localhost:3001/api/v1/orden/${id}/cancelar`)
    GetOrder()
  }



   const cards = order.map(a =>
    <div key={a._id} className="my-5 card">
      <div className="row">
        <div className="col col-12 col-md-8 col-lg-8">
          <div className="card-body">
            <p className="card-text">Comida: {a.food.title}</p>
            <p className="card-title">Cantidad: {a.quantity}</p>
            <p className="card-text">Dirección: {a.address}</p>
            <p className="card-text">Usuario: {a.user.name}</p>
            <p className="card-text">Pagara Con: {a.amountTopay}</p>
            <p className="card-text">Estado: {a.state}</p>
            <p className="card-text">Puntuación de Servicio: {a.score}</p>
          </div>
        </div>
        <div className="col col-12 col-md-4 col-lg-4">
          <div className='row justify-content-around'>
            {a.state === 'Pendiente' || a.state === 'En Proceso'
              ?
              <>
                <button onClick={() => EnProceso(a._id)} className='btn btn-outline-primary mt-3 w-75'>En Proceso</button>
                <button onClick={() => Enviar(a._id)} className='btn btn-outline-success my-3 w-75'>Enviado</button>
                <button onClick={() => Cancelar(a._id)} className='btn btn-outline-secondary mb-3 w-75'>Cancelar</button>
              </>
              :
              ''
            }
          </div>
        </div>
      </div>
    </div>
  );

 return (
    <div className="container">
      <div className="card-columns pt-5">
        {cards}
      </div>
    </div>
  );
}

export default GetOderPages;