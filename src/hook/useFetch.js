import { useState, useEffect } from 'react'
import axiosClient from '../helpers/axiosClient'
import { CambiarFecha, sumaFechas } from '../helpers/Helpers'
import Api from '../api'

const useFetch = ({ form, trigger, endPoint }) => {

    const [rows, setRows] = useState(null)
    const [pending, setPending] = useState(trigger)
    const [token, setToken] = useState(true)

    const { Sucursal, From, To, Centro } = form;
    useEffect(() => {
        if (trigger) {
            const get = async () => {
                if (process.env.REACT_APP_JSON === 'TRUE' && window.localStorage.getItem('Demo')) {
                    const localQuery = Api({ form, endPoint })
                    setRows(localQuery);
                    return setPending(false);
                }
                let q = await axiosClient.get(`/api/operaciones/${endPoint}`, {
                    params: {
                        FINNOSUCURSAL: Sucursal,
                        CENTRO: Centro,
                        DESDE: From ? (From) : (CambiarFecha(sumaFechas(new Date(), -14))),
                        HASTA: To ? (To) : (CambiarFecha(Date.now()))
                    }
                })
                if (q.data.codigo === 403) {
                    // mostramos modal que notifica al usuario que las credenciales estan vencidas
                    setPending(false)
                    return setToken(false)
                }
                if (q.data.length === 0) {
                    // quitamos el spin y evitamos que se bloquee la pantalla sin informacion
                    setRows(0)
                    return setPending(false)
                }
                if (q.data.length > 0) {
                    setRows(q.data)
                    return setPending(false)
                }
            }
            get()
        }
        return setPending(false)

        // eslint-disable-next-line
    }, [trigger])

    return {
        pending,
        rows,
        token
    };
}

export default useFetch;