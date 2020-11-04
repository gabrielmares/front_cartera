import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../helpers/Helpers';
import { usuarioContext } from '../provider/contextUsers'
import Login from '../views/Pages/Login/Login';

const PrivateRoute = ({ component: Component }) => {

    const { info, setInfo } = useContext(usuarioContext);

    let q = useAuth(info);
    const { pending, claims } = q


    if (pending) return false;

    if (claims === 403) return <Redirect to="/" component={Login} />
    let data = (!info) ? (claims) : (claims)
    setInfo(data)
    return (
        <Component usuario={data} />
    );
}

export default PrivateRoute;