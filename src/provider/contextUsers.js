import React, { createContext, useState } from 'react';

export const usuarioContext = createContext();

const UsersContext = (props) => {
    let [info, setInfo] = useState(null) //almacen de la informacion del usuario, permisos, restricciones y configuracion de usuario
    let [requestBySuc, setRequestBySuc] = useState([]); //state para almacenar las solicitudes de la vista de solicitudes
    let [renovations, setRenovations] = useState([]); // state que almacena las renovaciones posibles que se despliegan en la tabla de la vista
    let [mngtUser, setMngtUser] = useState(null)
    // almacenamiento del filtro definido por el usuario, al usar el formulario de las vistas
    let [form, setForm] = useState({
        FINNOSUCURSAL: "",
        centro: '',
        from: "",
        to: "",
    })
    let [spin, setSpin] = useState(false)

    return (
        <usuarioContext.Provider
            value={{
                info,
                setInfo,
                mngtUser,
                setMngtUser,
                requestBySuc,
                setRequestBySuc,
                form,
                setForm,
                spin,
                setSpin,
                renovations,
                setRenovations
            }}
        >
            {props.children}
        </usuarioContext.Provider>
    )
}

export default UsersContext;