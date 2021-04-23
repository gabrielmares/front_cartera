import React, { useContext } from 'react';
import { Inputdate } from '../../../helpers/Helpers'
import { Form, Label, CustomInput, Button, Input } from 'reactstrap'
import { usuarioContext } from '../../../provider/contextUsers'

const InputFilter = ({ handleSubmit }) => {

    // const { toRequest } = submit;
    const { info, form, setForm, spin } = useContext(usuarioContext)
 
    // variables globales de filtros por sucursales
    const { FINNOSUCURSAL, centro, from, to } = form

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




    return (
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
                disabled={(spin || (info.sucursal > 0)) || process.env.REACT_APP_JSON === "TRUE"}
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
                disabled={spin || process.env.REACT_APP_JSON === "TRUE"}
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
                disabled={spin || process.env.REACT_APP_JSON === "TRUE"}
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
                disabled={spin || process.env.REACT_APP_JSON === "TRUE"}
                onChange={(e) => handleChange(e)}
            />
            <Button
                type="submit"
                className="ml-4 col-1"
                color="success"
                disabled={spin || process.env.REACT_APP_JSON === "TRUE"}
                onClick={(e) => handleSubmit(e)}
            >Buscar</Button>
        </Form>
    );
}

export default InputFilter;