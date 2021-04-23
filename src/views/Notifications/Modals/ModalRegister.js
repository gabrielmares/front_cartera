import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalBody, InputGroup, Form, InputGroupAddon, Input, InputGroupText, ModalHeader, ModalFooter, Col } from 'reactstrap';
import axiosClient from '../../../helpers/axiosClient';


const Modals = ({ show, hide }) => {
    let history = useHistory(); 
    const [user, setUser] = React.useState({
        nombre: '',
        email: "",
        sucursal: "",
        rol: "",
        password: ""
    })
    const { nombre, email, sucursal, password, rol } = user

    const toggleModal = (e) => {
        e.preventDefault();
        hide(false)
    }

    const handleChange = e => {

        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axiosClient.post('/api/signup', {
                nombre,
                password,
                rol,
                sucursal: (sucursal === "") ? (0) : (sucursal),
                email
            }).then(res => {
                if (res.data) {
                    console.log(res.data)
                    history.push('/grameen/admon/users')
                    return hide(false)
                }
            })
        } catch (error) {

        }


    }
    return (
        <div className="animated fadeIn">
            <Modal isOpen={show} className="modal-primary">
                <ModalHeader className="justify-content-center">Alta de Usuarios</ModalHeader>
                <ModalBody >
                    <Col md={{ size: 10, offset: 1 }}>
                        <Form>
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="icon-user"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="text"
                                    placeholder="Nombre del Usuario"
                                    value={nombre}
                                    name="nombre"
                                    onChange={e => handleChange(e)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>@</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    name="email"
                                    onChange={e => handleChange(e)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="icon-lock"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    name="password"
                                    onChange={e => handleChange(e)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="cui-user"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="select"
                                    placeholder="Rol de Usuario"
                                    name="rol"
                                    value={rol}
                                    onChange={e => handleChange(e)}
                                >
                                    <option value={1}>Administrador</option>
                                    <option value={2}>Oficial de Cumplimiento</option>
                                    <option value={3}>Gerencia</option>
                                    <option value={4}>Coordinacion</option>
                                    <option value={5}>Capturista</option>
                                    <option value={6}>Promotor</option>
                                    <option value={7}>Archivo</option>
                                </Input>
                            </InputGroup>
                            <InputGroup className="mb-4">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="cui-task"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    disabled={(rol >= 4) ? (false) : (true)}
                                    type="select"
                                    placeholder="Sucursal"
                                    name="sucursal"
                                    value={sucursal}
                                    onChange={e => handleChange(e)}
                                >
                                    <option value={0}></option>
                                    <option value={1}>Obregon</option>
                                    <option value={2}>Huatabampo</option>
                                    <option value={3}>Navojoa</option>
                                </Input>
                            </InputGroup>

                        </Form>
                    </Col>
                    <ModalFooter className="justify-content-center">
                        <Button color="primary" onClick={(e) => handleSubmit(e)}>&nbsp; Crear &nbsp;</Button>
                        <Button color="warning" onClick={(e) => toggleModal(e)} >Cancelar</Button>
                    </ModalFooter>
                </ModalBody>

            </Modal>
        </div >
    );
}

export default Modals;
