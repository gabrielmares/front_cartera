 import React from 'react'
import { Table } from 'reactstrap'
import { usuarioContext } from '../../Context/contextUsers'


const Solicitudes = () => {

    const { info, requests } = useContext(usuarioContext)

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
                        <th style={{ width: '16rem' }}>Nombre</th>
                        {(info?.rol < 4) && (<th >Sucursal</th>)}
                        <th >Centro</th>
                        <th >Grupo</th>
                        <th >Solicitado</th>
                        <th style={{ width: '6.5em'}} > Plazo </th>
                        <th style={{ width: '9.5em', textAlign: 'right' }} >Documentacion</th>
                    </tr>
                </thead>

                <tbody className="text-center" >
                    {requests.map((cliente, index) => (
                        < tr key={index}>
                            <td style={{ width: '16rem', textAlign: 'left' }}>
                                <b className="linkDoc" >
                                    Nombre Cliente, ANONIMO
                                </b>
                            </td>
                            { (info?.rol < 4) && (<td>{cliente.sucursal}</td>)}
                            <td >{cliente.centro}</td>
                            <td >{cliente.grupo}</td>
                            <td >{cliente.montosol}</td>
                            <td  style={{ width: '6.5em' }} >{plazo(parseInt(cliente.plazo))}</td>
                            <td style={{ width: '9.5em' }}>{docs([cliente.solicitud, cliente.comprobante, cliente.ine, cliente.aviso])}%</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </>
    );
}

export default Solicitudes;