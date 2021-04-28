import React, { createContext, useState, useReducer } from 'react';
import { sessionReducer } from './sessionReducer'
import ModalLogOut from '../views/Notifications/Modals/ModalLogOut'
import { CERRAR_SESION } from './types';

export const usuarioContext = createContext();


let initialState = {
    claims: null,
    err: null,
    loader: false,
    renovations: [],
    requests: []
}

const UsersContext = (props) => {

    const [state, dispatch] = useReducer(sessionReducer, initialState)

    let [form, setForm] = useState({
        Sucursal: 0,
        Centro: 0,
        From: "",
        To: "",
    })

    // manejo de los cambios de fechas y CENTROs en el filtrado de solicitudes
    const handleForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    if (state.err) return <ModalLogOut />

    const endSession = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }
    const envApp = Boolean(process.env.REACT_APP_JSON === 'TRUE')
    return (
        <usuarioContext.Provider
            value={{
                envApp,
                info: state.claims,
                form,
                requests: state.requests,
                loader: state.loader,
                renovations: state.renovations,
                dispatch,
                handleForm,
                endSession,

            }}
        >
            {props.children}
        </usuarioContext.Provider>
    )
}

export default UsersContext;