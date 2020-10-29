import React from 'react';
import { CardHeader, Col, Card, Form, Input, Label, Button, Spinner, CustomInput } from 'reactstrap';
import RequestTable from './RequestTable';
import DangerModal from '../Notifications/Modals/Modals';

import { Inputdate, CambiarFecha } from '../../helpers/Helpers'
import { useHistory } from 'react-router-dom';
import axiosClient from '../../helpers/axiosClient';


const Renovacion = () => {
    let history = useHistory();
    const [spin, setSpin] = React.useState(false)
    const [submit, setSubmit] = React.useState({
        info: null,
        getInfo: false,
        noRows: true
    })
    const [modal, setModal] = React.useState(false);
    const [filter, setFilter] = React.useState({
        FINNOSUCURSAL: "",
        centro: '',
        from: "",
        to: "",
    })


    const { info, getInfo, noRows } = submit;
    const { FINNOSUCURSAL, centro, from, to } = filter

    React.useEffect(() => {
        if ((FINNOSUCURSAL > 0) && getInfo) {
            const get = async () => {
                try {
                    let q = await axiosClient.get('/api/operaciones/listas', {
                        params: {
                            FINNOSUCURSAL,
                            CENTRO: centro ? (centro) : (0),
                            DESDE: from ? (from) : ('2019-01-01'),
                            HASTA: to ? (to) : (CambiarFecha(Date.now()))
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
                            info: null,
                            noRows: true
                        })
                    }
                    // pasamos los registros al state para pintarlos en pantalla y quitamos el spin
                    setSpin(false)
                    setSubmit({
                        getInfo: false,
                        info: q.data,
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
        if (isNaN(FINNOSUCURSAL) || FINNOSUCURSAL === "") return false
        setSpin(true);
        setSubmit({
            ...submit,
            getInfo: true,
        })

    }

    if (modal) {
        return (<DangerModal
            msg={'La sesion ha caducado, vuelva a iniciar sesion'}
            action={reset}
            header={'Error de sesion de usuario'}
            type={'modal-danger'}
        />

        )

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
                            disabled={spin}
                        >
                            <option value={null}></option>
                            <option value="1">Obregon</option>
                            <option value="2">Huatabampo</option>
                            <option value="3">Navojoa</option>
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
                    <Spinner
                        color="info"
                        size='md'
                        style={{ width: '3rem', height: '3rem' }}
                        type='grow'
                    />
                )}
                {noRows ?
                    (null)
                    : (
                        <RequestTable
                            info={info}
                        />
                    )
                }
            </Card>

        </Col >
    );
}

export default Renovacion;