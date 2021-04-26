import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { logOut } from '../../../helpers/Helpers';
import { useHistory } from 'react-router-dom'

const Modals = () => {
    let history = useHistory()
    const [modal, setModal] = React.useState(true)
    const reset = () => {
        logOut()
        return history.push('/entrar')
    }

    const toggleDanger = (e) => {
        e.preventDefault();
        reset();
        return setModal(!modal);
    }



    return (
        <div className="animated fadeIn">
            <Modal isOpen={modal} className='modal-danger'>
            <ModalHeader>Error de sesion de usuario</ModalHeader>
            <ModalBody>
                La sesion ha caducado, vuelva a iniciar sesion
                </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={(e) => toggleDanger(e)}>Cerrar</Button>{' '}

            </ModalFooter>
            </Modal>
        </div >
    );
}

export default Modals;