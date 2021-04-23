import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../helpers/Helpers';
import { usuarioContext } from '../provider/contextUsers'
import Login from '../views/Pages/Login/Login';

const PrivateRoute = ({ component: Component }) => {
    const { info, setInfo } = useContext(usuarioContext);
    //si hay informacion de la sesion de usuario, useAuth no se 
    //hace una nueva verificacion de identidad
    // useAuth se usa cuando el usuario recarga la app, verifica con el backend
    // la identidad del usuario que tiene abierta la sesion

    // para la version publica, BETA, se usa el localstorage para almacenar la sesion del usuario
    const tokenLocal = window.localStorage.getItem('demo')

    let q = useAuth(info, tokenLocal);
    const { pending, claims } = q

    // cuando aun no tiene la informacion useAuth responde en true
    // cuando termina la consulta retorna false y la informacion del usuario

    if (pending) return false;
    // cuando la sesion caduco o el token no es valido el servidor retorna
    // el msg 403, sirve de indicacion a la app para reenviar al usuario
    // a iniciar sesion de nuevo
    if (claims === 403) return <Redirect to="/" component={Login} />


    // cuando refresca la app se le reasignan los claims a info
    // el state global, para manejar la informacion del usuario
    if (!info) { 
        setInfo(claims)
    }


    return (
        <Component usuario={info} />
    );
}

export default PrivateRoute;