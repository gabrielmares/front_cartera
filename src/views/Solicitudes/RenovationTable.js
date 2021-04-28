import React, { useContext } from 'react';
import { Table } from 'reactstrap'
import generateDoc from '../../helpers/GeneratorDocs'
import { usuarioContext } from '../../Context/contextUsers';
import { LLAMADA_API, QUITAR_LOADER } from '../../Context/types';
import axiosClient from '../../helpers/axiosClient';

const RequestTable = () => {

    const { loader, dispatch, renovations, envApp } = useContext(usuarioContext)

    const handlePrint = async CODIGO => {
        if (envApp) return alert('Funcion deshabilitada en modo DEMO')
        dispatch({
            type: LLAMADA_API
        })
        try {
            const nuevaSolicitud = await axiosClient.get('/api/operaciones/renovacion', {
                withCredentials: true,
                timeout: 5000,
                params: {
                    CODIGO
                },
            })
            generateDoc(nuevaSolicitud.data).then(() => dispatch({
                type: QUITAR_LOADER
            }));
        } catch (error) {
            dispatch({
                type: QUITAR_LOADER
            })

            alert('sucedio un error al generar el archivo')

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
                        <th style={{ width: '9em' }}  >Contrato</th>
                        <th >Saldo</th>
                        <th style={{ width: '8em' }}  >Ult. Abono</th>
                        <th style={{ width: '8em', textAlign: 'right' }}  >Vencimiento</th>
                    </tr>
                </thead>

                <tbody className="text-center" >
                    {renovations.map((cliente, index) => (
                        < tr key={index} >
                            <td style={{ width: '18rem', textAlign: 'left', color: (cliente.PORPAGADO<=85) ? 'gray' : 'black' }}>
                                <b className="linkDoc" onClick={(cliente.PORPAGADO <= 85) ? (() => alert('El cliente aun no puede renovar su credito')) : (() => handlePrint(cliente.CODIGO))}>
                                    {cliente.NOMBRE}
                                </b>
                            </td>
                            <td >{cliente.CENTRO}</td>
                            <td >{cliente.GRUPO}</td>
                            <td style={{ width: '8em' }}  >{envApp ? (cliente.FINNOSUCURSAL + "-" + (cliente.CONTRATO).substr(0, 6)) : cliente.CONTRATO}</td>
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