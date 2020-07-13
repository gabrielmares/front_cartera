import React, { useState } from 'react';
import {Route } from 'react-router-dom';
import { Card, CardBody, CardGroup, CardImg, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import img from "../Login/grameen.png";

const DefaultLayout = React.lazy(() => import('../../../containers/DefaultLayout'));
const Login = (props) => {
  const [user, saveuser] = useState({
    username: "",
    password: ""
  });
  // useEffect(() => {
  //   if (logged) {
  //     props.history.push('/proyects');
  //   }      

  // }, [msg, logged, mostrarAlerta, props.history])
  const { username, password } = user;
  const Log_in = e => {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      return alert("Todos los campos son obligatorios");
      // return false;
    }
    else if (username === "demo" && password === "demo") {
      // alert("Bienvenido")
      window.localStorage.setItem('Demo', 'DEMO');
      props.history.push('/grameen/inicio');
        // eslint-disable-next-line no-unused-expressions
        < Route path = "/grameen" name = "Home" render = { props => <DefaultLayout {...props} />} />
    }
    else {
  alert("Datos Incorrectos");
}

  }
const _onChange = e => {
  saveuser({
    ...user,
    [e.target.name]: e.target.value
  })
}
return (
  <div className="app flex-row align-items-center">
    <Container>
      <Row className="justify-content-center">
        <Col md="8">
          <CardGroup>
            <Card className="p-4">
              <CardBody className="align-items-center">
                <Form onSubmit={Log_in}>
                  <Row>
                    <Col m="12" className="text-center">
                      <h1>Iniciar Sesión</h1>
                    </Col>
                  </Row>
                  <br />
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="username" value={username} placeholder="Usuario" id="username" onChange={_onChange} autoComplete="username" />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" name="password" id="password" value={password} placeholder="Contraseña" onChange={_onChange} autoComplete="current-password" />
                  </InputGroup>
                  <Row>
                    
                    <CardBody className="text-center">
                      <div>
                        
                        <button type="submit" className="btn btn-primary">Entrar</button>
                      </div>
                    </CardBody>
                   
                  </Row>
                </Form>
              </CardBody>
            </Card>
            <Card className="text-white d-md-down-none" style={{ width: '44%' }}>
              <CardBody className="text-center">
                <CardImg top width="10%" src={img} alt="Grameen AC" />
                
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  </div>
);
}
// }

export default Login;
