import React, { createContext, useState } from 'react';

export const usuarioContext = createContext();

const UsersContext = (props) => {
    let [info, setInfo] = useState(null)
    let [requestBySuc, setRequestBySuc] = useState({})
    let [mngtUser, setMngtUser] = useState(null)



    return (
        <usuarioContext.Provider
            value={{
                info,
                setInfo,
                mngtUser,
                setMngtUser,
                requestBySuc,
                setRequestBySuc
            }}
        >
            {props.children}
        </usuarioContext.Provider>
    )
}

export default UsersContext;