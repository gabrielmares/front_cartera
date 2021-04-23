import React, { useContext } from 'react';
import { CardHeader, Col, Card } from 'reactstrap';
import TableRequestInProcess from './TableRequestInProcess';
import DangerModal from '../Notifications/Modals/Modals';
import { CambiarFecha, sumaFechas } from '../../helpers/Helpers'
import { useHistory } from 'react-router-dom';
import axiosClient from '../../helpers/axiosClient';
import { usuarioContext } from '../../provider/contextUsers'
import InputsFilters from './components/InputsFilters'

const Renovacion = () => {
    let history = useHistory();
    // const [spin, setSpin] = React.useState(false)

    const [modal, setModal] = React.useState(false);
    const { form, requestBySuc, setRequestBySuc, info } = useContext(usuarioContext);


    const { from, to, FINNOSUCURSAL, centro } = form;



    //toRequest contiene las solicitudes a renovar, getInfo, cuando cambia a true hace la llamada a la api
    // noRows previene el bloqueo del componente cuando no encuentra valores que mostrar
    const [submit, setSubmit] = React.useState({
        toRequest: [],
        getInfo: false,
        noRows: true
    })

    const { getInfo, noRows, toRequest } = submit;


    function update(rows) {

        setSubmit({
            getInfo: false,
            toRequest: rows,
            noRows: false
        });

        return console.log('tablas actualizadas')
    }

    React.useEffect(() => {
        if (getInfo) {
            const get = async () => {
                try {
                    let q = await axiosClient.get('/api/operaciones/solicitudes', {
                        params: {
                            FINNOSUCURSAL: FINNOSUCURSAL,
                            CENTRO: centro ? (centro) : (0),
                            DESDE: from ? (from) : (CambiarFecha(sumaFechas(new Date(), -14))),
                            HASTA: to ? (to) : (CambiarFecha(Date.now()))
                        }
                    })
                    if (q.data.codigo === 403) {
                        // mostramos modal que notifica al usuario que las credenciales estan vencidas
                        setModal(true)
                    } else if (q.data === "") {
                        // quitamos el spin y evitamos que se bloquee la pantalla sin informacion, noRows
                        return update(q.data)
                    }
                    // pasamos los registros al state para pintarlos en pantalla y quitamos el spin
                    return setSubmit({
                        getInfo: false,
                        toRequest: q.data,
                        noRows: false
                    })
                } catch (error) {
                    // quitar el spin, evitar que se bloquee la pantalla por no encontrar registros
                    setSubmit({
                        getInfo: false,
                        noRows: true
                    })

                }
            }
            get();
        }
        // eslint-disable-next-line
    }, [FINNOSUCURSAL, getInfo, centro, from, to])

    // funcion que cierra la sesion de usuario, cuando la tiene activa
    const reset = () => {
        return history.push('/')
    }

    const handleSubmit = e => {
        e.preventDefault();
        // si el usuario administrador, oficial o gerente puede enviar la solicitud en blanco
        // el resto de usuarios con sucursal asignada, se les rellena el input con el numero de sucursal
        // y se bloquea el campo, evitando revisar sucursales ajenas
        if (isNaN(FINNOSUCURSAL) || FINNOSUCURSAL === "") return false
        setSubmit({
            ...submit,
            getInfo: true,
        })
    }


    if (modal) {
        return (
            <DangerModal
                msg={'La sesion ha caducado, vuelva a iniciar sesion'}
                action={reset}
                header={'Error de sesion de usuario'}
                type={'modal-danger'}
            />

        )

    }
    // pasa las solicitudes locales, al state global
    if (requestBySuc.length === 0 && toRequest.length > 0) {
        setRequestBySuc(toRequest)
    }

    // pasa las solicitues globales al state local
    if (requestBySuc.length > 0 && toRequest.length === 0) {

        return setSubmit({
            getInfo: false,
            toRequest: requestBySuc,
            noRows: false
        })
    }


    return (
        <Col style={{ marginLeft: '12rem' }} className="animated fadeIn" lg='9' md='12'>
            <Card style={{ height: '50rem' }}>
                <CardHeader>
                    <h3 className='text-center'>Solicitudes de credito en Proceso</h3>
                    <br />
                    <InputsFilters
                        handleSubmit={handleSubmit}
                    />

                </CardHeader>
                {noRows ?
                    (null)
                    : (
                        <TableRequestInProcess
                            rows={toRequest}
                            tipoUsuario={info.sucursal}
                        />
                    )
                }
            </Card>

        </Col >
    );
}

export default Renovacion;