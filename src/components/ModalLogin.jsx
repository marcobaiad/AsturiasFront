import React, { useState, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Css/logUser.css';
import auth from '../utils/auth';
import clienteAxios from '../config/axios';
import Modal from 'react-bootstrap/Modal';


const ModalLogin = (props) => {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')

  const rolelocal = localStorage.getItem('role')

  const history = useHistory();

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setTimeout(() => {
        node.focus();
      }, 1)
    }
  }, []);


  const logUser = e => {
    e.preventDefault();

    clienteAxios.post('/api/v1/usuarios/login', { username, password })
      .then(response => {
        auth.logedIn(response.data.token, response.data.role, response.data.id);
        Swal.fire({
          icon: "success",
          title: "Logueado correctamente",
          showConfirmButton: false,
          timer: 1000
        });

        response.data.role === 'admin' ?
          history.push('/admin/todas')
          :
          history.push('/')
      }).catch(function () {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          showConfirmButton: false,
          timer: 3000
        });
      })
  }

  const recoverPass = (e) => {

    clienteAxios.post('/api/v1/usuarios/sendrecoverypass', { email })

    if (email === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresar Email'
      })
    } else {
      Swal.fire({
        icon: "success",
        title: "Mensaje enviado",
        showConfirmButton: false,
        timer: 3000
      });
    }
  }


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <>
        <div className="registrationmodal-form">
          <form className="" onSubmit={logUser}>
            <h1 className='titulomodal'>Iniciar Sesión</h1>
            <div className="form-group px-3">
              <input
                type="text"
                className="form-control item"
                placeholder="Usuario"
                name="username"
                ref={measuredRef}
                autoFocus
                minLength="4"
                onChange={(e) => { setUser(e.target.value) }} />
            </div>
            <div className="form-group px-3">
              <input
                type="password"
                className="form-control item"
                placeholder="Contraseña"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </div>
            <div className="d-flex text-right">
              <div className="form-group col-md-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1" />
                  <label className="custom-control-label remember olvideContrasenia" htmlFor="customCheck1">Recordarme</label>
                </div>
              </div>
              <div className="col-md-9">
                <Link to="" className="olvideContrasenia" data-toggle="modal" data-target="#exampleModalCentered"
                >
                  Olvidé mi Contraseña
              </Link>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-block modalBtn"
            >Ingresar</button>
          </form>
        </div>
        <div className="modal"
          id="exampleModalCentered" tabIndex="-1"
          role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content modalrecover">
              <div className="modal-header d-block">
                <h5 className="text-center" id="exampleModalCenteredLabel">Recuperar contraseña</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <div className="col-md-12 text-center">

                    <label htmlFor="formGroupExampleInput">Ingresa tu email con el que te registraste para recuperar tu contraseña</label>
                    <input
                      type="email"
                      className="form-control item"
                      id="inputEmail3"
                      placeholder="Email"
                      required
                      name="recuperarEmail"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      onChange={(e) => { setEmail(e.target.value) }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-block modalBtn" onClick={recoverPass}>Recuperar</button>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );

}

export default ModalLogin;