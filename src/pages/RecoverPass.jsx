import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

const RecoverPass = (props) => {
  const { tokenId } = useParams()
  console.log('resetLinkFrontend ->', tokenId)
  const [newPass, setNewPassword] = useState('');
  const [newPasswordRetype, setNewPasswordRetype] = useState('');
  const history = useHistory();
  const changePassword = (e) => {
    e.preventDefault()
    if (newPass !== newPasswordRetype) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden!',
        showConfirmButton: false,
        timer: 3000
      })
    } else if (newPass === newPasswordRetype) {
      clienteAxios.put(`/api/v1/usuarios/recoverypassresponse/${tokenId}`, { newPass })
      Swal.fire({
        icon: 'success',
        title: 'Ha cambiado su contraseña con éxito',
        showConfirmButton: false,
        timer: 3000
      })
      history.push('/')
    }
  }
  return (
    <div className="container my-5 pt-5">
      <h1 className="mt-5 text-center">Asturias Bar</h1>
      <h3 className="mb-3 text-center">Cambio de contraseña</h3>
      <div className="row justify-content-center"  >
        <form className="col col-md-6 col-10 my-2" style={{ border: '1px solid gray' }} onSubmit={changePassword}>
          <div className="form-group">
            <p className="mt-2 text-center">Ingrese nueva contraseña</p>
            <input
              className="form-control"
              type="password"
              id="inputPassword6"
              name="newPass"
              placeholder="Contraseña nueva"
              onChange={(e) => { setNewPassword(e.target.value) }}
              autofocus
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="newPasswordRetype"
              placeholder="Repetir contraseña"
              type="password"
              onChange={(e) => { setNewPasswordRetype(e.target.value) }}
              autofocus
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-danger my-2" >Cambiar contraseña</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RecoverPass;