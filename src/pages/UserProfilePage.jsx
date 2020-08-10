import React, { useState, useEffect } from 'react';
import clientAxios from '../config/axios';


const UserProfilePage = () => {

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
    })

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

    
    const handlerChange = (e) => {
       setUserEdit({ ...userEdit, [e.target.name]: e.target.value })
    }


    return(
        <div className="container my-5 pt-3">
            <h2 className="my-5 pt-5 pt-md-0 text-center">Mi Perfil</h2>
            <div className="row mx-0 justify-content-center flex-nowrap">
                <form className="col-md-9">
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
                            <input type="text" className="form-control my-2 mx-2" onChange={handlerChange} autoFocus name="age" value={age}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label  htmlFor="address">Dirección</label>
                            <input type="text" className="form-control my-2 mx-2" onChange={handlerChange} name="address" value={address}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="password">Contraseña</label>
                            <input type="text" className="form-control my-2 mx-2" onChange={handlerChange} name="password" />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="passwordRepeat">Repetir Contraseña</label>
                            <input type="text" className="form-control my-2 mx-2" onChange={handlerChange} name="passwordRepeat" />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Email</label>
                            <input type="text" className="form-control my-2 mx-2" onChange={handlerChange} name="email" value={email}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="phonenumber">Numero de Teléfono</label>
                            <input type="text" className="form-control my-2 mx-2" onChange={handlerChange} name="phonenumber" value={phonenumber}/>
                        </div>
                        <input type="submit" className="mx-auto my-3 btn btn-danger" value="Modificar" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfilePage;