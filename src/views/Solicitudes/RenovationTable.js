import React from 'react';
import { Table } from 'reactstrap'
import axios from 'axios'
import generateDoc from '../../helpers/GeneratorDocs'

const RequestTable = ({ info, show, hide }) => {

    const handlePrint = async CODIGO => {
        hide(!show)
        try {
            const nuevaSolicitud = await axios.get(`${process.env.REACT_APP_SERVIDOR}/api/operaciones/renovacion`, {
                withCredentials: true,
                params: {
                    CODIGO
                },
            })
            generateDoc(nuevaSolicitud.data).then(() => hide(false));
        } catch (error) {
            console.log(error)
            alert('sucedio un error al generar el archivo')
            hide(!show)
        }
    }
    return (
        <>
            <Table size='lg' responsive striped className="justify-content-center tablarenovaciones" aria-disabled={show}>
                <thead className="text-center" style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>
                    <tr>
                        <th style={{ width: '18rem' }}>Nombre</th>
                        <th style={{ width: '4rem' }}>Centro</th>
                        <th style={{ width: '4rem' }}>Grupo</th>
                        <th style={{ width: '8rem' }}> Contrato y Saldo </th>
                        <th style={{ width: '6rem' }}> Pagado</th>
                        <th style={{ width: '9rem' }}>Ultimo Abono</th>
                        <th style={{ width: '9rem' }}>Vencimiento del Contrato</th>
                    </tr>
                </thead>

                <tbody className="text-center" >
                    {info.map((cliente, index) => (
                        < tr key={index} >
                            <td style={{ width: '18rem', textAlign: 'left' }}>
                                <b className="linkDoc" onClick={(cliente.PORPAGADO <= 85) ? (null) : (() => handlePrint(cliente.CODIGO))}>
                                    {cliente.NOMBRE}
                                </b>
                            </td>
                            <td style={{ width: '4rem' }}>{cliente.CENTRO}</td>
                            <td style={{ width: '4rem' }}>{cliente.GRUPO}</td>
                            <td style={{ width: '9rem' }}>{cliente.CONTRATO}, ${(cliente.SALDO).toFixed(2)}</td>
                            <td style={{ width: '6rem' }}>{(cliente.PORPAGADO).toFixed(2)} %</td>
                            <td style={{ width: '9rem' }}>{cliente.ULTIMO}</td>
                            <td style={{ width: '9rem' }}>{cliente.VENCIMIENTO}</td>
                        </tr> 
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default RequestTable;