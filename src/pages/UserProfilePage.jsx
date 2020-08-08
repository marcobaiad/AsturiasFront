import React, { useState, useEffect } from 'react';
import clientAxios from '../config/axios';


const UserProfilePage = () => {

    const [user, setData] = useState([])
    const IdUser = localStorage.getItem('id')

    const TraerData = async () =>{
        try {
            const datosUser = await clientAxios.get(`/api/v1/usuarios/${IdUser}`);
            setData(datosUser.data);
        } catch (error) {
            console.log('Codea bien gil');
        }
    }

    useEffect(() => {
        TraerData();
    });



    return(
        <div className="container mt-5">
            <h2>Mi Perfil</h2>
            <form className="col justify-content-center">
                <div className="align-items-center">
                    <input type="text" value={user.name}/>
                    <input type="text" value={user.lastname}/>
                    <input type="text" value={user.age}/>
                    <input type="text" value={user.address}/>
                    <input type="text" value={user.email}/>
                    <br/>
                    <input type="submit" value="Modificar" />
                </div>
            </form>
        </div>
    )
}

export default UserProfilePage;