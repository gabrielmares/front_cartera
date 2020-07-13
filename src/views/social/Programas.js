import React from 'react';
import { CardGroup, Row } from 'reactstrap'
import CardProgram from './program';
import Proyects from '../../proyects';


const Programas = () => {
    const { proyects } = Proyects;
    return (
        <React.Fragment>
            {/* <h1>proyectos</h1> */}
            <Row>
                <CardGroup>
                    {
                        proyects.map(proyect => (
                            <CardProgram program={proyect} key={proyect.id} />
                        ))
                    }
                </CardGroup>
            </Row>
        </React.Fragment>
    )
}

export default Programas;

/*
<FormGroup>
                        <Label htmlFor="proyect">Proyecto</Label>
                        <Input type="text" id="proyect" placeholder="Asignar nombre al proyecto" />
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


                    <Col xs="12" sm="2">
            <Card>
                <CardImg top width="100%" src={} alt="" />
                <CardBody>
                    <CardTitle><strong>Nombre del programa</strong></CardTitle>
                    <CardText className="justify">It was popularised in the 1960s with the release of Letraset sheets containing</CardText>


                </CardBody>
            </Card>
        </Col>
*/