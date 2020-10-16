import React from 'react';
import {Col, CardBody, Card, CardHeader,  FormGroup, Input, Label } from 'reactstrap'

const Universidades = (props) => {
    return (
        <Col xs="12" sm="6">
            <Card>
                <CardHeader>
                    <strong>Universidades</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label htmlFor="company">Company</Label>
                        <Input type="text" id="company" placeholder="Enter your company name" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="vat">VAT</Label>
                        <Input type="text" id="vat" placeholder="DE1234567890" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="street">Street</Label>
                        <Input type="text" id="street" placeholder="Enter street name" />
                    </FormGroup>
                    <FormGroup row className="my-0">
                        <Col xs="8">
                            <FormGroup>
                                <Label htmlFor="city">City</Label>
                                <Input type="text" id="city" placeholder="Enter your city" />
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                            <FormGroup>
                                <Label htmlFor="postal-code">Postal Code</Label>
                                <Input type="text" id="postal-code" placeholder="Postal Code" />
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="country">Country</Label>
                        <Input type="text" id="country" placeholder="Country name" />
                    </FormGroup>
                </CardBody>
            </Card>
        </Col>
    );
}

export default Universidades;