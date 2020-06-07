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
                    <Input type="text" name="username" value={username} placeholder="username" id="username" onChange={_onChange} autoComplete="username" />
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
                    {/* <Col xs="6" className="text-center">
                          <Button color="primary" className="px-4">Entrar</Button>
                        </Col> */}
                    <CardBody className="text-center">
                      <div>
                        {/* <Link to="/">
                              
                            </Link> */}
                        {/* <Button type="submit" color="primary" className="col-12 mt-6">Entrar</Button> */}
                        <button type="submit" className="btn btn-primary">Entrar</button>
                      </div>
                    </CardBody>
                    {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                  </Row>
                </Form>
              </CardBody>
            </Card>
            <Card className="text-white d-md-down-none" style={{ width: '44%' }}>
              <CardBody className="text-center">
                <CardImg top width="10%" src={img} alt="Grameen AC" />
                {/* <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div> */}
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
