import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../Css/GetOrderUserPages.css'
import clienteAxios from '../config/axios';
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2';

const GetOrderUserPages = () => {

  const { id } = useParams()
  const [status, setStatus] = useState(null);
  const [order, setOrder] = useState([]);
  const [rating, setRating] = useState(0)
 
  const GetOrder = useCallback(async () => {
   
    const res = await clienteAxios.get(`/api/v1/orden/user`, order, {
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    console.log(res)
    setOrder(res.data)
  }, []);

  useEffect(() => {
    GetOrder()
  }, [])

  const onRatingChange = async(score, id) =>{
    setRating(score);
    await clienteAxios.put(`/api/v1/orden/user/${id}/puntaje`, {score})
    Swal.fire(
      'Muchas Gracias',
      'Por Tu Puntuacion',
      'success'
    )
    GetOrder()
  }

  const getStatusOfPayment = useCallback(
    async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const params = urlParams.getAll('collection_id');
      console.log('params ->', params);
      const response = await clienteAxios.get(`/api/v1/orden/mp/payment?payment_id=${params[0]}`);
      const StatusMP = response.data.payment_data.status
      const ExternalRef = response.data.payment_data.external_reference
      console.log('external ->--', ExternalRef)
      try {
        if (StatusMP === 'approved') {
          await clienteAxios.put(`/api/v1/orden/user/${id}/pagoexitoso`)
          GetOrder()
          Swal.fire(
            'Acreditacion Existosa',
            'Tu Pedido esta en Proceso',
            'success'
          )
        } else{
          await clienteAxios.delete(`/api/v1/orden/user/${id}/pagorechazado`)
          GetOrder()
          Swal.fire(
            'Tiene problemas Con tu Tarjeta',
            'Prueba Con Otra Tarjeta o Puedes Pagar En Efectivo',
            'error'
          )
        }
      } catch (error) {
        console.log(error)
      }
      console.log('responseData ->', response.data);
      setStatus(StatusMP);
    },
    [],
  );

  useEffect(() => {
    getStatusOfPayment()
  }, [])

  const cards = order.map(a =>
    <div key={a._id} className="my-5 card">
      <div className="card-body">
        <p className="card-text">Comida: {a.food.title}</p>
        <p className="card-title">Cantidad: {a.quantity}</p>
        <p className="card-text">Direccion: {a.address}</p>
        <p className="card-text">Pagara Con: {a.amountTopay}</p>
        <p className="card-text">Estado: {a.state}</p>
        <div>
          {a.state === 'Enviado'
            ?
            <>
               <div className='d-flex'>
                <div className='d-flex align-items-center'>
                  <p className='p-0 m-0'>Puntuar Servicio</p>
                </div>
                 <div className='ml-5'> 
                  <ReactStars
                    className='stars'
                    count={5}
                    half={false}
                    onChange={newValue => onRatingChange(newValue, a._id)}
                    size={30}
                    activeColor="#ffd700"
                    value= {rating}
                    
                  />
                  
                </div>
              </div>
            </>
            :

            ''

          }
        </div>
      </div>
    </div>
  )

  return (
    
      
    <div className="container mt-5 mt-md-0">
      { order.length > 0 ?
        <div className="card-columns py-5">
          {cards}
        </div>
      :
        <div className="py-5">
          <h3 className="text-center mt-5 pt-5 pb-4">Todavía no realizaste ningún pedido</h3>
          <p className="text-center d-block">Por favor, realiza un pedido para poder hacer el seguimiento del mismo</p>  
        </div>
      }
    </div>

  );
}

export default GetOrderUserPages;