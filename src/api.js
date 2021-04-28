import JsonServer from './server.json'

const Api = ({ form, endPoint }) => {
    const { Sucursal, Centro } = form

    switch (endPoint) {
        case 'listas':
            if (parseInt(Sucursal) === 0) return JsonServer.data.renovations
            let renovaciones = JsonServer.data.renovations.filter(cliente => cliente.FINNOSUCURSAL === parseInt(Sucursal))
            if (parseInt(Centro) > 0) return renovaciones = renovaciones.filter(cliente => cliente.CENTRO === parseInt(Centro))
            return renovaciones

        case 'solicitudes':
            if (parseInt(Sucursal) === 0) return JsonServer.data.requests
            let solicitudes = JsonServer.data.requests.filter(cliente => cliente.sucursal === parseInt(Sucursal))
            if (parseInt(Centro) > 0) return solicitudes = solicitudes.filter(cliente => cliente.centro === parseInt(Centro))
            return solicitudes
        default:
            break;
    }
}

export default Api;