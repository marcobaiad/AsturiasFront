import React from 'react';
import '../Css/Reguser.css';
import clienteAxios from '../config/axios';
import swal from 'sweetalert2';


class RegUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastname: '',
      address: '',
      age: '',
      email: '',
      username: '',
      password: '',
      phonenumber: '',
      registro: []
    };
  }


  handleChange = (e) => {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  onSubmitCreateHandler = async (e) => {
    let registro = this.state.registro;
    registro.push({ name: this.state.name, lastname: this.state.lastname, address: this.state.address, age: this.state.age, username: this.state.username, password: this.state.password, phonenumber: this.state.phonenumber, email: this.state.email });
    this.setState({ registro })
    e.preventDefault();
    try {
      await clienteAxios.post(`/api/v1/usuarios`, { name: this.state.name, lastname: this.state.lastname, address: this.state.address, age: this.state.age, username: this.state.username , password: this.state.password, phonenumber: this.state.phonenumber, email: this.state.email });
      swal.fire({
        icon: 'success',
        title: 'Registro correcto',
      });
      window.location = '/';      
    } catch (err) {
      const { response } = err;
      const errores = response.data.mensaje;
      swal.fire({
        icon: 'error',
        title: 'No se pudo registrar',
        text: errores
      });
    }
  }


  OnlyNumber = (event) => {
    if (event.charCode <= 47) {
      swal.fire({
        icon: 'error',
        title: 'Solo puede ingresar números'
      });
      return false
    }
    if (event.charCode >= 58) {
      swal.fire({
        icon: 'error',
        title: 'Solo puede ingresar números',
      });
      return false
    }
  }

  render() {
    return (
      <div className='imgBackgroundReg registration-form'>
        <form onSubmit={this.onSubmitCreateHandler} id="formulario-reset" className='container-fluid py-5 px-5'>
          <h1 className='titulo text-white pb-5'>Registro de Usuario</h1>
          <div className="form-row">
            <div className="form-group col-md-6 mb-0">
              <input autoFocus type="text" maxLength="25" className="form-control item" name="name" onChange={this.handleChange} required placeholder="Nombre" />
            </div>
            <div className="form-group col-md-6 mb-0">
              <input type="text" className="form-control item" maxLength="25" name="lastname" onChange={this.handleChange} required placeholder="Apellido" />
            </div>
            <div className="form-group col-md-6 mb-0">
              <input type="text" minLength="9" maxLength="11" className="form-control item" onKeyPress={this.OnlyNumber} name="phonenumber" onChange={this.handleChange} required title="3810000000" placeholder="N° Celular" />
            </div>
            <div className="form-group col-md-6 mb-0">
              <input type="text" className="form-control item" onKeyPress={this.OnlyNumber} name="age" onChange={this.handleChange} required placeholder='Edad: Ej. "27"' />
            </div>
          </div>
          <div className="form-group">
            <input type="email" className="form-control item" name="email" onChange={this.handleChange} title="ejemplo@mail.com" required placeholder="Correo electrónico" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control item" name="address" onChange={this.handleChange} required placeholder="Dirección" />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6 mb-0">
              <input type="text" minLength="4" className="form-control item" name="username" onChange={this.handleChange} title="El usuario debe contener al menos 4 caracteres" required placeholder="Usuario" />
            </div>
            <div className="form-group col-md-6 mb-0">
              <input type="password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="form-control item" name="password" onChange={this.handleChange} title="La contraseña debe tener al menos 8 caracteres, una mayuscula y una minuscula" required placeholder="Contraseña" />
            </div>
          </div>
          <button type="submit" className="btn btn-block create-account">Registrarse</button>
        </form>
      </div>
    )
  }
}

export default RegUser;