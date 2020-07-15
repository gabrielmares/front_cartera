import React from 'react';
import { Col, CardDeck } from 'reactstrap';
import styled from '@emotion/styled';

const Img = styled.img`
    width: 180px;
`;

const DescripcionProyect = styled.div`
    flex: 0 1 1200px;
    display: flex;
    grid-template-columns: 1fr 3fr;
    column-gap: 1rem;
    
`;

const Titulo = styled.a`
    /* padding:1rem; */
    font-size:1.5rem;
    font-weight: bold;
    margin: 0;
    /* :hover {
        cursor: pointer;
    } */
`;
const Proyect = styled.li`
    padding: 0.1rem;
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
    const { imgg, title, description } = program;


    return (
        <React.Fragment>
            {
                view ?
                    (
                        <Col xs="12" sm="4" xl="2" >
                           
                            <CardDeck className="mb-4 h-90" >
                                <div className="card" style={{ minHeight: '350px'}}>
                                    <img className="card-img-top photo" src={imgg} alt="Card"></img>
                                    <div className="card-body">
                                        <h4 className="card-title">{title}</h4>
                                        <p className="card-text">{description}</p>
                                        {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                                    </div>
                                </div>
                            </CardDeck>
                            
                        </Col>
                    )
                    :
                    (
                        <Col xs="12" sm="9" xl="10" className="justify-content-center" style={{ paddingLeft: '10%' }}>
                            <Proyect>
                                <DescripcionProyect>
                                    <div>
                                        <Img src={imgg} className="photoul" />
                                    </div>
                                    <div className="p-2 ml-4">
                                        <Titulo>{title}</Titulo>
                                        {/* <p className="card-text">{description}</p> */}
                                        <TextoDescripcion>{description}</TextoDescripcion>
                                    </div>
                                </DescripcionProyect>
                            </Proyect>
                        </Col>
                    )
            }

        </React.Fragment >
    );
}

export default CardProgram;



/*

<Col xs="12" sm="2" >

                                <CardImg top className="photo card" src={img} alt="card" style={{ marginBottom: '0' }} />
                                <CardBody>
                                    <CardTitle style={{ marginBottom: '0' }}><h4>{title}</h4></CardTitle>
                                     <CardTitle ><p className="card-text">{description}</p></CardTitle>
                                    </CardBody>
                                    </Card>
                                </Col >

                    */