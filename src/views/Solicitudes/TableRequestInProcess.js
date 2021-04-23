 import React from 'react'
import { Table } from 'reactstrap'


const Solicitudes = ({ rows, tipoUsuario }) => {

    // funcion que vuelve legible al usuario el plazo de las solicitudes de credito
    let plazo = (amortizaciones) => {
        switch (amortizaciones) {
            case 13:
                return '6 Meses'
            case 26:
                return '1 año'
            case 39:
                return ' 18 Meses'
            default:
                return null

        }
    }

    // calculo del porcentaje aprobado de documentos registrados para la solicitud de credito
    let docs = (documentacion) => {
        let docs = (100 / documentacion.length), acc = 0
        // console.log(documentacion)
        documentacion.filter(doc => {
            if (parseInt(doc) > 1) {
                console.log(doc)
                acc += doc;
                return doc
            }
            return []
        })
        // console.log(documentacion.filter(doc => doc > 1).reduce((a, b) => parseInt(a) + parseInt(b), 'suma'))
        // return documentacion.filter(doc => doc > 1).reduce((a + b))
        return (acc / 2 * docs)
    }

    return (
        <>
            <Table size='lg' responsive striped className="justify-content-center tablarenovaciones" >
                <thead className="text-center" style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>
                    <tr>
                        <th style={{ width: '12rem' }}>Nombre</th>
                        {(tipoUsuario === 0) && (<th style={{ width: '4rem' }}>Sucursal</th>)}
                        <th style={{ width: '4rem' }}>Centro</th>
                        <th style={{ width: '4rem' }}>Grupo</th>
                        <th style={{ width: '4rem' }}>Solicitado</th>
                        <th style={{ width: '4rem' }}> Plazo </th>
                        <th style={{ width: '4rem' }}>Documentacion</th>

                    </tr>
                </thead>

                <tbody className="text-center" >
                    {rows.map((cliente, index) => (
                        < tr key={index}>
                            <td style={{ width: '12rem', textAlign: 'left' }}>
                                <b className="linkDoc" >
                                    {cliente.nombre}
                                </b>
                            </td>
                            { (tipoUsuario === 0) && (<td style={{ width: '4rem' }}>{cliente.sucursal}</td>)}
                            <td style={{ width: '4rem' }}>{cliente.centro}</td>
                            <td style={{ width: '4rem' }}>{cliente.grupo}</td>
                            <td style={{ width: '4rem' }}>{cliente.montosol}</td>
                            <td style={{ width: '4rem' }}>{plazo(parseInt(cliente.plazo))}</td>
                            <td style={{ width: '4rem' }}>{docs([cliente.solicitud, cliente.comprobante, cliente.ine, cliente.aviso])}%</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </>
    );
}

export default Solicitudes;