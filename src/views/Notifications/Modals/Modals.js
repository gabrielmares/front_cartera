import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const Modals = ({ msg, action, header, type }) => {
  console.log(msg)
  const [modal, setModal] = React.useState(true)

  const toggleDanger = (e) => {
    e.preventDefault();
    action();
    setModal(!modal);
  }



  return (
    <div className="animated fadeIn">
      <Modal isOpen={modal} className={type}>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>
          {msg}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={(e) => toggleDanger(e)}>Cerrar</Button>{' '}

        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Modals;
