import React from 'react';
import {Col, CardBody, Card, CardHeader, FormGroup, Input, Label } from 'reactstrap'

const Beneficiarios = () => {
    return (
        <Col xs="12" sm="4">
            <Card>
                <CardHeader className="text-center">
                    <strong>Beneficiarios</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label htmlFor="company">Nombre</Label>
                        <Input type="text" id="company" placeholder="Nombre Completo" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="vat">CURP*</Label>
                        <Input type="text" id="vat" placeholder="Requerido" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="street">Direccion</Label>
                        <Input type="text" id="street" placeholder="Lugar de Residencia" />
                    </FormGroup>
                    <FormGroup row className="my-0">
                        <Col xs="7">
                            <FormGroup>
                                <Label htmlFor="city">Municipio</Label>
                                <Input type="text" id="city" placeholder="Municipio" />
                            </FormGroup>
                        </Col>
                        <Col xs="5">
                            <FormGroup>
                                <Label htmlFor="postal-code">Codigo Postal</Label>
                                <Input type="text" id="postal-code" placeholder="Eje. 85000" />
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="country">Comunidad</Label>
                        <Input type="text" id="country" placeholder="Municipio de residencia" />
                    </FormGroup>
                </CardBody>
            </Card>
        </Col>
    );
}

export default Beneficiarios;