import React from 'react'
import { Table } from 'reactstrap'


const Solicitudes = () => {
    return (
        <>
            <Table size='lg' responsive striped className="justify-content-center tablarenovaciones" >
                <thead className="text-center" style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>
                    <tr>
                        <th style={{ width: '18rem' }}>Nombre</th>
                        <th style={{ width: '4rem' }}>Centro</th>
                        <th style={{ width: '4rem' }}>Grupo</th>
                        <th style={{ width: '8rem' }}> Ultimo </th>
                        <th style={{ width: '6rem' }}> Tipo de ingreso</th>
                    </tr>
                </thead>

                <tbody className="text-center" >
                    < tr >
                        <td style={{ width: '18rem', textAlign: 'left' }}>
                            <b className="linkDoc" >
                                Nombre
                            </b>
                        </td>
                        <td style={{ width: '4rem' }}>Centro</td>
                        <td style={{ width: '4rem' }}>Grupo</td>
                        <td style={{ width: '9rem' }}>Ultimo Contrato</td>
                        <td style={{ width: '6rem' }}>Renovacion/Nuevo ingreso</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default Solicitudes;