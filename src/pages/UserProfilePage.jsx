import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clientAxios from '../config/axios';
import swal from 'sweetalert2';


const UserProfilePage = () => {

    const history = useHistory();
    const IdUser = localStorage.getItem('id');
    const [userEdit, setUserEdit] = useState({ 
    name: '', 
    lastname: '', 
    username: '', 
    age: '', 
    address: '', 
    email: '', 
    phonenumber: '', 
    password: ''
    });
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const usuarioID = localStorage.getItem('id')
     
    const {name, lastname, username, age, address, email, phonenumber, password} = userEdit

    const traerUser = async () => {
        try {
            const datosUser = await clientAxios.get(`/api/v1/usuarios/${IdUser}`);
            setUserEdit(datosUser.data);
        } catch (error) {
            console.log(error);
        }
    }; 

    useEffect(() => {
        traerUser()
    }, [])

    const EditUsuario = async (e) => {
        e.preventDefault();
        
        try {
            if (password !== passwordRepeat) {
                swal.fire({
                    icon: 'error',
                    title: 'Las constraseñas no coinciden'
                });
                return false
            }
            if (age <= 17) {
                swal.fire({
                    icon: 'error',
                    title: 'Debes ser mayor de edad'
                });
                return false
            }
            await clientAxios.put(`/api/v1/usuarios/userEdit/${usuarioID}`, { age, address, email, phonenumber, password });
            swal.fire({
                icon: 'success',
                title: 'Tus cambios se han guardado con éxito',
            });
            history.push('/');
        } catch (error) {
            console.log(error);
        }

    }; 

    const OnlyNumber = (event) => {
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
    
    const handlerChange = (e) => {
       setUserEdit({ ...userEdit, [e.target.name]: e.target.value })
    }
    

    return(
        <div className="container my-5 pt-3">
            <h2 className="my-5 pt-5 pt-md-0 text-center">Mi Perfil</h2>
            <div className="row mx-0 justify-content-center flex-nowrap">
                <form className="col-md-9" onSubmit={EditUsuario}>
                    <div className="form-group row mx-0">
                        <div className="col-12 col-md-6">
                            <label>Apellido y Nombre</label>
                            <input type="text" className="form-control my-2 mx-2" value={lastname + ' ' + name} disabled title="Este campo no se puede Editar"/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Nombre de Usuario</label>
                            <input type="text" className="form-control my-2 mx-2" value={username} disabled title="Este campo no se puede Editar"/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="age">Edad</label>
                            <input type="text" onKeyPress={OnlyNumber} className="form-control my-2 mx-2" onChange={handlerChange} autoFocus name="age" value={age}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label  htmlFor="address">Dirección</label>
                            <input type="text" className="form-control my-2 mx-2" onChange={handlerChange} name="address" value={address}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" placeholder="Ej: Contraseña123" minLength="8" maxLength="32" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="form-control my-2 mx-2" onChange={handlerChange} name="password" />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="passwordRepeat">Repetir Contraseña</label>
                            <input type="password" placeholder="Ej: Contraseña123" onChange={(e) => { setPasswordRepeat(e.target.value) }} minLength="8" maxLength="32" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="form-control my-2 mx-2" name="passwordRepeat" />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Email</label>
                            <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" className="form-control my-2 mx-2" onChange={handlerChange} name="email" value={email}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="phonenumber">Numero de Teléfono</label>
                            <input type="text" onKeyPress={OnlyNumber} className="form-control my-2 mx-2" onChange={handlerChange} name="phonenumber" value={phonenumber}/>
                        </div>
                        <input type="submit" className="mx-auto my-3 btn btn-danger" value="Modificar" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfilePage;