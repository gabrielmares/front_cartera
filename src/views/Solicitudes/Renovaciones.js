import React, { useContext } from 'react';
import { CardHeader, Col, Card, Form, Input, Label, Button, CustomInput } from 'reactstrap';
import RequestTable from './RequestTable';
import DangerModal from '../Notifications/Modals/Modals';
import SpinnerModal from '../Notifications/Modals/SpinnerModal'
import { Inputdate, CambiarFecha, sumaFechas } from '../../helpers/Helpers'
import { useHistory } from 'react-router-dom';
import axiosClient from '../../helpers/axiosClient';
import { usuarioContext } from '../../provider/contextUsers'


const Renovacion = () => {
    let history = useHistory();
    const [spin, setSpin] = React.useState(false)
    const [submit, setSubmit] = React.useState({
        toRequest: null,
        getInfo: false,
        noRows: true
    })
    const [modal, setModal] = React.useState(false);


    const { requestBySuc, info } = useContext(usuarioContext)
    const { toRequest, getInfo, noRows } = submit;
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
                            toRequest: null,
                            noRows: true
                        })
                    }
                    // pasamos los registros al state para pintarlos en pantalla y quitamos el spin
                    setSpin(false)
                    return setSubmit({
                        getInfo: false,
                        toRequest: q.data,
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
    if (requestBySuc.length > 0 && !toRequest) {
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
                    <h3 className='text-center'>Creditos a vencer por sucursal</h3>
                    <br />
                    <Form inline rows='1' style={{ marginLeft: '2rem' }}>
                        <Label
                            for="selectSucursal"
                            className="mr-2">
                            <b>Sucursal</b>
                        </Label>
                        <CustomInput
                            type="select"
                            id="selectSucursal"
                            className="col-2 mr-2"
                            name="FINNOSUCURSAL"
                            value={FINNOSUCURSAL}
                            onChange={(e) => handleChange(e)}
                            disabled={(spin || (info.sucursal > 0))}
                        >
                            <option value={0}></option>
                            <option value={1}>Obregon</option>
                            <option value={2}>Huatabampo</option>
                            <option value={3}>Navojoa</option>
                        </CustomInput>
                        {/* separador */}
                        <Label
                            for="inputCentro"
                            className="mr-2 ml-3"
                        >
                            <b>Centro</b>
                        </Label>
                        <Input type="number"
                            id="inputCentro"
                            name="centro"
                            className="col-1 mr-4"
                            value={centro}
                            disabled={spin}
                            onChange={(e) => handleChange(e)}
                        />
                        {/* separador */}
                        <Label
                            for="from"
                            className="mr-2 ml-3">
                            <b>Desde</b>
                        </Label>
                        <input
                            type="date"
                            name="from"
                            id="from"
                            className="col-2 fechas"
                            value={from}
                            disabled={spin}
                            onChange={(e) => handleChange(e)}
                        />
                        {/* separador */}
                        <Label
                            for="to"
                            className="mr-2 ml-3">
                            <b>Hasta</b>
                        </Label>
                        <input
                            type="date"
                            id="to"
                            name="to"
                            className="col-2 fechas"
                            value={to}
                            disabled={spin}
                            onChange={(e) => handleChange(e)}
                        />
                        <Button
                            type="submit"
                            className="ml-4 col-1"
                            color="success"
                            disabled={spin}
                            onClick={(e) => handleSubmit(e)}
                        >Buscar</Button>
                    </Form>
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
                            info={toRequest}
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