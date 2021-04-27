import React, { useContext } from 'react';
import { Form, Label, CustomInput, Button, Input, Row } from 'reactstrap'
import { usuarioContext } from '../../../Context/contextUsers'

const InputFilter = ({ handleSubmit }) => {

    // const { toRequest } = submit;
    const { info, form, setForm, spin } = useContext(usuarioContext)
 
    // variables globales de filtros por sucursales
    const { Sucursal} = form

    // manejo de los cambios de fechas y centros en la vista
    const handleChange = e => {
        Inputdate(e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    if (FINNOSUCURSAL === "") {
        setForm({
            ...form,
            FINNOSUCURSAL: info.sucursal
        })
    }



    const { Sucursal, Centro, From, To } = form

    return (

        <Form inline className='justify-content-around' >
            <Row >
                <Label
                    for="selectSucursal"
                    className="mr-2">
                    <b>Sucursal</b>
                </Label>
                <CustomInput
                    type="select"
                    id="selectSucursal"
                    className="col-2 mr-2"
                    name="Sucursal"
                    value={Sucursal}
                    onChange={(e) => handleForm(e)}
                    disabled={(spin || (info.sucursal > 0))}
                >
                    <option value={0}></option>
                    <option value={1}>Obregon</option>
                    <option value={2}>Huatabampo</option>
                    <option value={3}>Navojoa</option>
                </CustomInput>
                {/* separador */}
                <Label
                    for="inputCENTRO"
                    className="mr-1 ml-2"
                >
                    <b>Centro</b>
                </Label>
                <Input type="number"
                    id="inputCENTRO"
                    name="Centro"
                    className="col-1 mr-2"
                    value={Centro}
                    disabled={spin}
                    onChange={(e) => handleForm(e)}
                />
                {/* separador */}
                <Label
                    for="from"
                    className="mr-1 ml-2">
                    <b>Desde</b>
                </Label>
                <input
                    type="date"
                    name="From"
                    id="from"
                    className="col-2 fechas"
                    value={From}
                    disabled={spin}
                    onChange={(e) => handleForm(e)}
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
                    name="To"
                    className="col-2 fechas"
                    value={To}
                    disabled={spin}
                    onChange={(e) => handleForm(e)}
                />
                <Button
                    type="button"
                    className="ml-4 col-1"
                    color="success"
                    disabled={(parseInt(Sucursal) === 0 && Centro > 0) || spin}
                    onClick={() => handleSubmit()}
                >Buscar</Button>
            </Row >
            
        </Form>

    );
}

export default InputFilter;