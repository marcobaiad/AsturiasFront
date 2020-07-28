import React, { useState, useEffect, useCallback } from 'react';
import '../Css/GetOrderUserPages.css'
import clienteAxios from '../config/axios';
import ReactStars from 'react-rating-stars-component'
import Swal from 'sweetalert2'

const GetOrderUserPages = () => {

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
    
      
    <div class="container mt-5 mt-md-0">
      <div className="card-columns py-5 ">
        {cards}
      </div>
    </div>

  );
}

export default GetOrderUserPages;