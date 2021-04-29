import React, { useContext, useState, useEffect } from 'react';
import { CardHeader, Col, Card } from 'reactstrap';
import TableRequestInProcess from './TableRequestInProcess';
import { usuarioContext } from '../../Context/contextUsers'
import InputsFilters from './components/InputsFilters'
import { LISTA_SOLICITUDES_ENCERO, LISTA_SOLICITUDES_EXITOSO, LLAMADA_API_SOLICITUDES } from '../../Context/types';
import SpinnerModal from '../Notifications/Modals/SpinnerModal';
import useFetch from '../../hook/useFetch';

const Renovacion = () => {

    const { form, dispatch, requests, info, loader, endSession } = useContext(usuarioContext);
    const { Sucursal } = form;
    const endPoint = 'solicitudes'
    const [trigger, setTrigger] = useState(false)

    const exitoso = (rows) => {
        dispatch({
            type: LISTA_SOLICITUDES_EXITOSO,
            payload: rows
        })
        setTrigger(false)
    }

    const ceroRows = () => {
        dispatch({
            type: LISTA_SOLICITUDES_ENCERO,
        })
        setTrigger(false);
    }

    // si la API responde con error del token, terminamos la sesion del usuario con un mensaje en pantalla
    // para que vuelva a iniciar sesion


    /**
     * @gabrielmares
     * @param form envia los datos del formulario a la API
     * @param endPoint, es la ruta de la donde se hara la llamada
     * @param trigger, dispara la llamada a la API desde el boton buscar, en el formulario
     */

    const { pending, rows, token } = useFetch({ form, trigger, endPoint })

    useEffect(() => {
        // espera mientras la llamada a la API termina
        if (pending) return false
        // cuando encuentra datos, los pasa al reducer quien los pinta en la tabla, se cancela el evento submit
        // y fetchAPI para las siguientes consultas
        if (rows) return exitoso(rows)
        // cuando no encuentra resultados, retorna 0 el hook, el reducer deja un array en blanco en las solicitudes
        // y cancelamos el trigger y fetchAPI
        if (rows === 0) return ceroRows()
        if (!token) return endSession()
        // eslint-disable-next-line
    }, [pending, rows, trigger])


    const handleSubmit = () => {
        dispatch({
            type: LLAMADA_API_SOLICITUDES
        })
        // si el usuario administrador, oficial o gerente puede enviar la solicitud en blanco
        // el resto de usuarios con sucursal asignada, se les rellena el input con el numero de sucursal
        // y se bloquea el campo, evitando revisar sucursales ajenas
        if (info?.rol !== 0 && Sucursal === 0 && info?.sucursal > 0) return false
        setTrigger(true)
    }


    return (
        <Col className="animated fadeIn  mr-auto ml-auto" lg='10' >
            <Card style={{ height: `${window.innerHeight * 0.049}rem` }}>
                <CardHeader>
                    <h3 className='text-center'>Solicitudes de credito en Proceso</h3>
                    <br />
                    <InputsFilters
                        handleSubmit={handleSubmit}
                    />

                </CardHeader>
                {loader && <SpinnerModal mensaje='Descargando...' />}
                {requests.length > 0 &&
                    (
                        <TableRequestInProcess />
                    )
                }
            </Card>

        </Col >
    );
}

export default Renovacion;