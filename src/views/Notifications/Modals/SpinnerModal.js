import React from 'react';
import { Modal, Spinner } from 'reactstrap';

const SpinnerModal = ({ modal }) => {

    setInterval(() => {
        console.log('modal')
    }, 3000);


    return (
        <div className="animated fadeIn justify-content-center">
            <Modal isOpen={modal} size="sm" >
                <div className="text-center">
                    <Spinner
                        className="text-center"
                        color="info"
                        style={{ width: '10rem', height: '10rem' }}
                        type='grow'
                    />
                </div>
                <h4 className="text-center">Generando solicitud...</h4>

            </Modal>
        </div>
    );
}

export default SpinnerModal;
