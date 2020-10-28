import React, { createContext, useState } from 'react';

export const usuarioContext = createContext();

const UsersContext = (props) => {
    let [info, setInfo] = useState(null)

    return (
        <usuarioContext.Provider
            value={{
                info,
                setInfo
            }}
        >
            {props.children}
        </usuarioContext.Provider>
    )
}

export default UsersContext;