import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardGroup, CardImg, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Button } from 'reactstrap';
import img from "../Login/grameen.png";
import PrivateRoute from '../../../containers/Private'
import { usuarioContext } from '../../../Context/contextUsers';
import SpinnerModal from '../../Notifications/Modals/SpinnerModal';
import { FALLO_INICIO_SESION, INICIAR_SESION, INICIO_SESION_EXITOSO } from '../../../Context/types';
import { LoginFn } from '../../../helpers/LoginFn';

const DefaultLayout = React.lazy(() => import('../../../containers/DefaultLayout'));

const Login = () => {
  let history = useHistory();

  let { loader, dispatch } = useContext(usuarioContext)
  const [errEmail, setErrEmail] = useState(false)
  const [errPassword, setErrPassword] = useState(false)
  const [user, saveuser] = useState({
    password: "",
    email: ""
  });


  const { email, password } = user;

  const IniciarSesion = async () => {
    setErrEmail(false)
    setErrPassword(false)
    dispatch({
      type: INICIAR_SESION
    })
    const callAPI = await LoginFn(email, password)
    if (callAPI === 500) {
      dispatch({
        type: FALLO_INICIO_SESION
      })
      setErrPassword(true)
    }
    if (callAPI === 501) {
      dispatch({
        type: FALLO_INICIO_SESION
      })
      setErrEmail(true)
    }

    if (callAPI?.email) {
      dispatch({
        type: INICIO_SESION_EXITOSO,
        payload: callAPI
      })
      history.push('/inicio')
      return <PrivateRoute path="/inicio" name='Home' component={<DefaultLayout />} />
    }

    dispatch({
      type: FALLO_INICIO_SESION
    })

  }



  const handleChange = e => {
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
                    <InputGroup className="mb-1">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="email" value={email} placeholder="Usuario" id="email" onChange={e => handleChange(e)} autoComplete="email" />
                    </InputGroup>
                    <div className='row justify-content-center mb-4'>
                      {(errEmail) && <span className='text-center text-danger'>Usuario desconocido</span>}
                    </div>
                    <InputGroup className="mb-2">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" id="password" value={password} placeholder="Contraseña" onChange={e => handleChange(e)} autoComplete="current-password" />
                    </InputGroup>
                    <div className='row justify-content-center mb-4'>
                      {(errPassword) && <span className='text-center text-danger'>Contraseña Incorrecta</span>}
                    </div>
                    <Row>

                      <CardBody className="text-center">
                        <div>
                          <Button type="button" color='primary' block disabled={email.length === 0 && password.length === 0} onClick={() => IniciarSesion()}>Entrar</Button>
                        </div>
                      </CardBody>

                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card className="text-white d-md-down-none" style={{ width: '44%' }}>
                <CardBody className="text-center">
                  <CardImg top width="10%" src={img} alt="Grameen" />

                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
      {loader && <SpinnerModal
        mensaje='Iniciando sesion'
      />}
    </div>
  );
}
// }

export default Login;
