import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import axiosClient from '../../helpers/axiosClient';
import { Login } from '../Pages';
import UsersTable from './UsersTable'
import ModalRegister from '../Notifications/Modals/ModalRegister'


const Users = () => {

  const [users, setUsers] = useState({
    list: {},
    ready: false
  })
  const { list, ready } = users
  const [modal, setModal] = useState(false)
  useEffect(() => {
    axiosClient.get('/api/userslist')
      .then(userslist => {
        if (userslist.data !== "") {
          return setUsers({
            ready: true,
            list: userslist.data
          })
        } else if (userslist.data.claims === 403) {
          return <Redirect to="/" component={Login} />
        }
      })
  }, [])

  // if (modal) return ]
  return (
    <div className="animated fadeIn">
      <Container>
        <Col xl={12}>
          <Card>
            <CardHeader className="justify-content-between">
              <Row>
                <Col className="col-auto mr-auto pt-2">
                  <h4><i className="fa fa-align-justify"></i> Listado de Usuarios</h4>
                </Col>
                <Col className="col-auto">
                  <Button color="primary" onClick={() => setModal(true)}>Agregar <i color="white" className="cui-user-follow"> </i></Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {ready && (<UsersTable users={list} />)}
              {modal && (<ModalRegister show={modal} hide={setModal} />)}
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  )
}

export default Users;
