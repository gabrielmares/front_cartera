import React, { useContext } from 'react';
import { Table } from 'reactstrap'
import axios from 'axios'
import generateDoc from '../../helpers/GeneratorDocs'
import { usuarioContext } from '../../Context/contextUsers';
import { QUITAR_LOADER } from '../../Context/types';

const RequestTable = () => {

    const { loader, dispatch, renovations } = useContext(usuarioContext)

    const handlePrint = async CODIGO => {
        hide(!loader)
        try {
            const nuevaSolicitud = await axios.get(`${process.env.REACT_APP_SERVIDOR}/api/operaciones/renovacion`, {
                withCredentials: true,
                params: {
                    CODIGO
                },
            })
            generateDoc(nuevaSolicitud.data).then(() => dispatch({
                type: QUITAR_LOADER
            }));
        } catch (error) {
            console.log(error)
            alert('sucedio un error al generar el archivo')
            hide(!loader)
        }
    }
    return (
        <>
            <Table size='lg' responsive striped className="justify-content-center tablarenovaciones" aria-disabled={loader}>
                <thead className="text-center" style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>
                    <tr>
                        <th style={{ width: '18rem' }} >Nombre</th>
                        <th >Centro</th>
                        <th >Grupo</th>
                        <th style={{ width: '9em'}}  >Contrato</th>
                        <th >Saldo</th>
                        <th style={{ width: '8em'}}  >Ult. Abono</th>
                        <th style={{ width: '8em', textAlign: 'right' }}  >Vencimiento</th>
                    </tr>
                </thead>

                <tbody className="text-center" >
                    {renovations.map((cliente, index) => (
                        < tr key={index} >
                            <td style={{ width: '18rem', textAlign: 'left' }}>
                                <b className="linkDoc" onClick={(cliente.PORPAGADO <= 85) ? (null) : (() => handlePrint(cliente.CODIGO))}>
                                    {(cliente.PORPAGADO <= 85) ? ('Cliente aun no puede renovar') : ('Credito renovable')}
                                </b>
                            </td>
                            <td >{cliente.CENTRO}</td>
                            <td >{cliente.GRUPO}</td>
                            <td style={{ width: '8em' }}  >{cliente.CONTRATO}</td>
                            <td >{Math.floor(cliente.SALDO)}</td>
                            <td style={{ width: '8em' }} >{cliente.ULTIMO}</td>
                            <td style={{ width: '8em' }} >{cliente.VENCIMIENTO}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default RequestTable;