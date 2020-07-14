import React from 'react';
import { Col, Card, CardTitle, CardBody, CardImg } from 'reactstrap';
import styled from '@emotion/styled';

const Img = styled.img`
    width: 150px;
`;

const DescripcionProyect = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`;

const Titulo = styled.a`
    font-size:1.5rem;
    font-weight: bold;
    margin: 0;
    /* :hover {
        cursor: pointer;
    } */
`;
const Proyect = styled.li`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
    background-color: #FFF;
    margin-bottom: 10px;

`;
const TextoDescripcion = styled.p`
    font-size: 1rem;
    margin-top: 25px;
    color: #888;
`



const CardProgram = ({ program, view }) => {
    const { img, title, description } = program;


    return (
        <React.Fragment>
            {
                view ?
                    (
                        <Col xs="12" sm="2" >
                            <Card className="cardsrow">
                                <CardImg top className="photo card" src={img} alt="card" style={{ marginBottom: '0' }} />
                                <CardBody>
                                    <CardTitle style={{ marginBottom: '0' }}><h4>{title}</h4></CardTitle>
                                    <CardTitle ><p>{description}</p></CardTitle>
                                </CardBody>
                            </Card>
                        </Col >
                    ) : (
                        // <h1>Lista</h1>
                        // <Col sm="2">s</Col>
                        <Col xs="12" sm="9" className="justify-content-center" style={{ paddingLeft: '20%' }}>
                            <Proyect>
                                <DescripcionProyect>
                                    <div>
                                        <Img src={img} className="photoul" />
                                    </div>
                                    <div>
                                        <Titulo>{title}</Titulo>
                                        <TextoDescripcion>{description}</TextoDescripcion>
                                    </div>
                                </DescripcionProyect>
                            </Proyect>
                        </Col>

                    )}

        </React.Fragment>
    );
}

export default CardProgram;