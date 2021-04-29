import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { usuarioContext } from '../Context/contextUsers'
import Login from '../views/Pages/Login/Login';
import Page404 from '../views/Pages/Page404/Page404';
import { TOKEN_VALIDO } from '../Context/types';

const PrivateRoute = ({ component: Component }) => {
    const { info, dispatch } = useContext(usuarioContext);
    const reloadApp = (claims) => {
        dispatch({
            type: TOKEN_VALIDO,
            payload: claims
        })
    }
    //si hay informacion de la sesion de usuario, useAuth no se 
    //hace una nueva verificacion de identidad
    // useAuth se usa cuando el usuario recarga la app, verifica con el backend
    // la identidad del usuario que tiene abierta la sesion

    let { pending, claims } = useAuth(info);


    useEffect(() => {
        // cuando refresca la app se le reasignan los claims a info
        // el state global, para manejar la informacion del usuario
        if (!info) return reloadApp(claims)
        // eslint-disable-next-line
    }, [info, claims])
    // cuando aun no tiene la informacion useAuth responde en true
    // cuando termina la consulta retorna false y la informacion del usuario
    if (pending) return false;
    // cuando la sesion caduco o el token no es valido el servidor retorna
    // el msg 403, sirve de indicacion a la app para reenviar al usuario
    // a iniciar sesion de nuevo
    if (claims === 403) return <Redirect to="/" component={Login} />
    //si fallo la conexion con el backend, reenviamos a la pagina de error
    if (claims === 412) return <Redirect to="/error" component={Page404} />


    return <Component />
}

export default PrivateRoute;