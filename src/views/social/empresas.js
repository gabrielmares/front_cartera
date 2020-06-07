import React from 'react';
import { Col, CardBody, Card, CardHeader, FormGroup, Input, Label, Button } from 'reactstrap'

const Empresas = () => {
    return (
        <Col xs="12" sm="3">
            <Card>
                <CardHeader className="text-center">
                    <strong>Agregar Empresa</strong>
                    {/* <small> Form</small>] */}
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label htmlFor="company">Nombre</Label>
                        <Input type="text" id="company" placeholder="Nombre de la Compañia" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="vat">RFC</Label>
                        <Input type="text" id="vat" placeholder="DEF1234567890" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="street">Direccion</Label>
                        <Input type="text" id="street" placeholder="Oficina Matriz" />
                    </FormGroup>
                    <FormGroup row className="my-0">
                        <Col xs="8">
                            <FormGroup>
                                <Label htmlFor="city">Ciudad</Label>
                                <Input type="text" id="city" placeholder="Ej. Obregon" />
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                            <FormGroup>
                                <Label htmlFor="postal-code">Codigo Postal</Label>
                                <Input type="text" id="postal-code" placeholder="Ej. 85000" />
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="country">Contacto en la Empresa</Label>
                        <Input type="text" id="country" placeholder="Vinculacion" />
                    </FormGroup>
                    <Button type="submit" color="primary" size="lg" block >Guardar</Button>
                    {/* <Col col="2" className="mb-3 mb-xl-0 text-center">
                        <Button color="primary" size="lg">Guardar Empresa</Button>
                    </Col> */}
                </CardBody>
            </Card>
        </Col>
    );
}

export default Empresas;