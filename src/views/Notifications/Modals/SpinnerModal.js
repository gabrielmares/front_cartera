import React, { useContext } from 'react';
import { Modal, Spinner } from 'reactstrap';
import { usuarioContext } from '../../../Context/contextUsers';

const SpinnerModal = ({ mensaje }) => {

    const { loader } = useContext(usuarioContext)


    return (
        <div className="animated fadeIn justify-content-center">
            <Modal isOpen={loader} size="sm" >
                <div className="text-center">
                    <Spinner
                        className="text-center"
                        color="info"
                        style={{ width: '10rem', height: '10rem' }}
                        type='grow'
                    />
                </div>
                <h4 className="text-center">{mensaje}</h4>

            </Modal>
        </div>
    );
}

export default SpinnerModal;
