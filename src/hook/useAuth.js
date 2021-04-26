import { useEffect, useState } from 'react'
import axiosClient from '../helpers/axiosClient'

// solicita al backend la informacion del usuario, la sesion actual, en las cookies se encuentra
// almacenado el token firmado
export const useAuth = (data) => {

    const [get, setGet] = useState({
        claims: null,
        pending: true
    })

    //si se actualiza la pagina, hace la llamada al backend con las credenciales en la cabecera
    // de la peticion, si el token esta vencido, se recibe un codigo 403
    useEffect(() => {
        if (data) return setGet({
            claims: data,
            pending: false
        })
        axiosClient.get('/api/currentuser', { timeout: 2500 }) // tiempo de espera, en caso que se exceda envia a la pagina de error
            .then(info => {
                if (info?.data?.info) {
                    return setGet({
                        claims: info.data.user,
                        pending: false
                    })
                }
                return setGet({
                    claims: info.data.codigo,
                    pending: false
                })
            })
            .catch(err => {
                return setGet({
                    claims: 412,
                    pending: false
                })
            })
        // eslint-disable-next-line
    }, [])
    return get;
}

