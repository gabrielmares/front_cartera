import React, { useContext } from 'react';
import { CardHeader, Col, Card} from 'reactstrap';
import RequestTable from './RenovationTable';
import DangerModal from '../Notifications/Modals/Modals';
import SpinnerModal from '../Notifications/Modals/SpinnerModal'
import { Inputdate, CambiarFecha, sumaFechas } from '../../helpers/Helpers'
import { useHistory } from 'react-router-dom';
import axiosClient from '../../helpers/axiosClient';
import { usuarioContext } from '../../provider/contextUsers'
import InputsFilters from './components/InputsFilters'


const Renovacion = () => {
    let history = useHistory();
    const [spin, setSpin] = React.useState(false)
    const [submit, setSubmit] = React.useState({
        toRenovation: [],
        getInfo: false,
        noRows: true
    })
    const [modal, setModal] = React.useState(false);


    const { renovations, info, setRenovations } = useContext(usuarioContext)
    const { toRenovation, getInfo, noRows } = submit;
    //toRequest contiene las solicitudes a renovar, getInfo, cuando cambia a true hace la llamada a la api
    // noRows previene el bloqueo del componente cuando no encuentra valores que mostrar

    const [filter, setFilter] = React.useState({
        FINNOSUCURSAL: info.sucursal,
        centro: '',
        from: "",
        to: "",
    })
    const { FINNOSUCURSAL, centro, from, to } = filter
    React.useEffect(() => {
        if (getInfo) {
            const get = async () => {
                try {
                    let q = await axiosClient.get('/api/operaciones/listas', {
                        params: {
                            FINNOSUCURSAL: FINNOSUCURSAL,
                            CENTRO: centro ? (centro) : (0),
                            DESDE: from ? (from) : (CambiarFecha(Date.now())),
                            HASTA: to ? (to) : (CambiarFecha(sumaFechas(new Date(), 14)))
                        }
                    })
                    if (q.data.codigo === 403) {
                        // mostramos modal que notifica al usuario que las credenciales estan vencidas
                        setModal(true)
                    } else if (q.data === "") {
                        // quitamos el spin y evitamos que se bloquee la pantalla sin informacion, noRows
                        setSpin(false)
                        return setSubmit({
                            getInfo: false,
                            toRenovation: null,
                            noRows: true
                        })
                    }
                    // pasamos los registros al state para pintarlos en pantalla y quitamos el spin
                    setSpin(false)
                    return setSubmit({
                        getInfo: false,
                        toRenovation: q.data,
                        noRows: false
                    })
                } catch (error) {
                    setSpin(false)
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


    const reset = () => {
        return history.push('/')
    }


    const handleChange = e => {
        Inputdate(e.target.value)
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // si el usuario administrador, oficial o gerente puede enviar la solicitud en blanco
        // el resto de usuarios con sucursal asignada, se les rellena el input con el numero de sucursal
        // y se bloquea el campo, evitando revisar sucursales ajenas
        if (isNaN(FINNOSUCURSAL) || FINNOSUCURSAL === "") return false
        setSpin(true);
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

    // si no hay solicitudes almacenadas en el state global, se le asignan las del state local
    if (renovations.length === 0 && toRenovation.length > 0) {
        return setRenovations(toRenovation)
    }

    // cuando el state global tiene la informacion, las pasa al state local
    if (renovations.length > 0 && toRenovation.length === 0) {
        return setSubmit({
            getInfo: false,
            toRenovation: renovations,
            noRows: false
        })
    }

    return (
        <Col style={{ marginLeft: '12rem' }} className="animated fadeIn" lg='9' md='12'>
            <Card style={{ height: '50rem' }}>
                <CardHeader>
                    <h3 className='text-center'>Creditos a vencer por sucursal</h3>
                    <br />
                    <InputsFilters handleSubmit={handleSubmit} />                
                </CardHeader>
                {spin && (
                    <SpinnerModal
                        modal={spin}
                    />
                )}
                {noRows ?
                    (null)
                    : (
                        <RequestTable
                            info={toRenovation}
                            show={spin}
                            hide={setSpin}
                        />
                    )
                }
            </Card>

        </Col >
    );
}

export default Renovacion;