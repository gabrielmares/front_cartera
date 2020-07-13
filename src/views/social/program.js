import React from 'react';
import { Col, Card, CardTitle, CardBody, CardImg } from 'reactstrap';

const CardProgram = ({ program }) => {
    const { img, title, description } = program;
    return (
        <Col xs="12" sm="3">
            <Card className="cardsrow">
                <CardImg top className="photo card" src={img} alt="card" style={{ marginBottom: '0' }}/>                
                <CardBody>
                <CardTitle style={{ marginBottom: '0' }}><h4>{title}</h4></CardTitle>
                    <CardTitle ><p>{description}</p></CardTitle>
                </CardBody>
            </Card>
        </Col>
    );
}

export default CardProgram;