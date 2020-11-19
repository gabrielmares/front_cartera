import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardGroup, CardImg, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import img from "../Login/grameen.png";
import PrivateRoute from '../../../containers/Private'
import axiosClient from '../../../helpers/axiosClient'
import { useAuth } from '../../../helpers/Helpers'
import { usuarioContext } from '../../../provider/contextUsers';

const DefaultLayout = React.lazy(() => import('../../../containers/DefaultLayout'));

const Login = (props) => {
  let history = useHistory();
  let { setInfo } = useContext(usuarioContext)
  const LayOut = (claims) => {
    setInfo(claims)
    history.push('/grameen/inicio');
    return <PrivateRoute path="/grameen/inicio" component={<DefaultLayout usuario={claims} />} />
  }

  const [user, saveuser] = useState({
    password: "",
    email: ""
  });


  // revisamos si ya hay una sesion abierta en el navegador
  let { pending, claims } = useAuth();

  if (pending) return false;
  // si habia sesion y caduco continuar con el proceso de loggeo,
  // de otra manera,redirige a la pantalla de inicio
  if (claims !== 403) {
    return LayOut(claims);
  }


  const { email, password } = user;

  // funcion para iniciar sesion, envia los datos al backend para firmar el token
  const LoginUser = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      return alert("Todos los campos son obligatorios");
    }
    let login = await axiosClient.post("/api/signin", user);

    if (login.data.info) {
      let { data: { user } } = login
      return LayOut(user);
    }


  }
  const _onChange = e => {
    e.preventDefault();
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
                  <Form >
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
                      <Input type="text" name="email" value={email} placeholder="Usuario" id="email" onChange={e => _onChange(e)} autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" id="password" value={password} placeholder="Contraseña" onChange={e => _onChange(e)} autoComplete="current-password" />
                    </InputGroup>
                    <Row>

                      <CardBody className="text-center">
                        <div>

                          <button type="submit" className="btn btn-primary" onClick={e => LoginUser(e)}>Entrar</button>
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
