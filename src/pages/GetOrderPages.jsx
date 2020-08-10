import React, { useState, useEffect, useCallback } from 'react';

import clienteAxios from '../config/axios';


const GetOderPages = () => {
  const [order, setOrder] = useState([]);
  const [orderFilter, setOrderFilter] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [enProceso, setEnProceso] = useState([]);
  const [enviados, setEnviados] = useState([]);
  const [cancelados, setCancelados] = useState([]);


  const GetOrder = useCallback(async () => {
    const res = await clienteAxios.get(`/api/v1/orden/`, order);
    setOrder(res.data);
    setOrderFilter(res.data)

    let Pendiente = res.data.filter(Pendientes => Pendientes.state === "Pendiente");
    let EnProceso = res.data.filter(EnProceso => EnProceso.state === "En Proceso");
    let Cancelado = res.data.filter(Cancelados => Cancelados.state === "Cancelado");
    let Enviado = res.data.filter(Enviados => Enviados.state === "Enviado");

    
    if (Pendiente) {
      setPendientes(Pendiente)
    }
    if (EnProceso) {
      setEnProceso(EnProceso)
    }
    if (Cancelado) {
      setCancelados(Cancelado)
    }
    if (Enviado) {
      setEnviados(Enviado)
    }
  }, []);

  useEffect(() => {
    GetOrder()
  }, [])

  const EnProceso = async (id) => {
    await clienteAxios.put(`https://asturiasrestorant.herokuapp.com/api/v1/orden/${id}/ep`)
    GetOrder()
  }

  const Enviar = async (id) => {
    await clienteAxios.put(`https://asturiasrestorant.herokuapp.com/api/v1/orden/${id}/enviar`)
    GetOrder()
  }

  const Cancelar = (id) => {
    clienteAxios.put(`https://asturiasrestorant.herokuapp.com/api/v1/orden/${id}/cancelar`)
    GetOrder()
  }

  const HandlerClicTodas = () => {
    setOrderFilter(order)
  }

  const HandlerClicPendientes = () => {
    setOrderFilter(pendientes)
  }

  const HandlerClicEnviadas = () => {
    setOrderFilter(enviados)
  }

  const HandlerClicEnProceso = () => {
    setOrderFilter(enProceso)
  }

  const HandlerClicCanceladas = () => {
    setOrderFilter(cancelados)
  }

  const cards = orderFilter.map(a =>
    <div className="col col-12 col-md-4">
      <div key={a._id} className="my-2 card">
        <div className="card-body">
          <p className="card-text">Comida: {a.food.title}</p>
          <p className="card-title">Cantidad: {a.quantity}</p>
          <p className="card-text">Dirección: {a.address}</p>
          <p className="card-text">Usuario: {a.user.name}</p>
          <p className="card-text">Pagara Con: {a.amountTopay}</p>
          <p className="card-text">Estado: {a.state}</p>
          <p className="card-text">Puntuación de Servicio: {a.score}</p>
        </div>
        <div className='row justify-content-center justify-content-md-around mx-0'>
          {a.state === 'Pendiente' || a.state === 'En Proceso'
            ?
            <>
              <button onClick={() => EnProceso(a._id)} className='btn btn-outline-primary col-11 my-1 my-md-2 mx-1'>En Proceso</button>
              <button onClick={() => Enviar(a._id)} className='btn btn-outline-success col-11 my-1 my-md-2 mx-1'>Enviado</button>
              <button onClick={() => Cancelar(a._id)} className='btn btn-outline-secondary col-11 my-1 my-md-2 mx-1'>Cancelar</button>
            </>
            :
            ''
          }
        </div>
      </div>
    </div>
  ).reverse();

 return (
    <div className="container">
      <div class="btn-group w-100" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" onClick={HandlerClicTodas}>Todas</button>
        <button type="button" class="btn btn-secondary" onClick={HandlerClicPendientes}>Pendientes</button>
        <button type="button" class="btn btn-secondary" onClick={HandlerClicEnProceso}>En Proceso</button>
        <button type="button" class="btn btn-secondary" onClick={HandlerClicCanceladas}>Canceladas</button>
        <button type="button" class="btn btn-secondary" onClick={HandlerClicEnviadas}>Enviadas</button>
    </div>
      <div className="row pt-5 overflow-auto" style={{height: "72vh"}}>
        {cards}
      </div>
    </div>
  );
}

export default GetOderPages;