import React from 'react';
import { useHistory } from 'react-router-dom';
import {

  Card,
  CardBody,
  Col,
  Row,
  NavLink
} from 'reactstrap';
import axiosClient from '../../helpers/axiosClient';
import { usuarioContext } from '../../Context/contextUsers';
import { LISTA_DE_RENOVACIONES_EXITOSO, LISTA_SOLICITUDES_EXITOSO } from '../../Context/types';



const Dashboard = () => {
  let history = useHistory();
  const { info, dispatch } = React.useContext(usuarioContext)
  // se filtra la respuesta de la api por sucursal y se almacena en su propio state
  const [obregon, setObregon] = React.useState({
    renovations: [],
    requests: []
  })
  const [huatabampo, setHuatabampo] = React.useState({
    renovations: [],
    requests: []
  })
  const [navojoa, setNavojoa] = React.useState({
    renovations: [],
    requests: []
  })

  const filtrarSucursales = (totales) => {
    switch (info.sucursal) {
      case 0:
        setObregon({
          renovations: totales.data.renovations.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 1)),
          requests: totales.data.requests.filter(invoice => (parseInt(invoice.sucursal) === 1))
        })
        setHuatabampo({
          renovations: totales.data.renovations.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 2)),
          requests: totales.data.requests.filter(invoice => (parseInt(invoice.sucursal) === 2))
        })
        setNavojoa({
          renovations: totales.data.renovations.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 3)),
          requests: totales.data.requests.filter(invoice => (parseInt(invoice.sucursal) === 3))
        })
        break;
      case 1:
        setObregon({
          renovations: totales.data.renovations.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 1)),
          requests: totales.data.requests.filter(invoice => (parseInt(invoice.sucursal) === 1))
        })
        break;
      case 2:
        setHuatabampo({
          renovations: totales.data.renovations.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 2)),
          requests: totales.data.requests.filter(invoice => (parseInt(invoice.sucursal) === 2))
        })
        break;
      case 3:
        setNavojoa({
          renovations: totales.data.renovations.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 3)),
          requests: totales.data.requests.filter(invoice => (parseInt(invoice.sucursal) === 3))
        })
        break;
      default:
        break;
    }
  }

  // al cargar la vista, hace la llamada a la api para obtener la informacion a desplegar
  // con solicitudes y renovaciones por sucursal
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    axiosClient.get('/api/operaciones/totales', {
      params: {
        sucursal: info.sucursal
      }
    }).then(totales => {
      filtrarSucursales(totales)
      return setLoading(false);

    })
    // eslint-disable-next-line
  }, [info])


  if (loading) return false

  // si da clic en el cuadro de sucursales, lo reenvia a la vista donde se muestra el total de solicitudes por sucursal
  const renovationsTo = (lista) => {
    dispatch({
      type: LISTA_DE_RENOVACIONES_EXITOSO,
      payload: lista
    })
    return history.push('/renovaciones');
  }
  // al dar clic a las solicitudes por sucursal, te reenvia a la vista y carga el componente en el state para ser desplegado
  const requestsTo = (lista) => {
    dispatch({
      type: LISTA_SOLICITUDES_EXITOSO,
      payload: lista
    });
    return history.push('/solicitudes')
  }



  return (
    <div className="animated fadeIn">
      <Row>
        {(info.sucursal === 1 || info.sucursal === 0) ? (<Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-primary " >
            <CardBody>
              <h4>Obregon</h4>
              <NavLink onClick={() => renovationsTo(obregon.renovations)} style={{ cursor: 'pointer' }} >
                <div className="text-value" >
                  <div>{obregon.renovations.length}</div> <h6>Creditos por renovar </h6>
                </div>
              </NavLink>
              <NavLink onClick={() => requestsTo(obregon.requests)} style={{ cursor: 'pointer' }}>
                <div className="text-value" >
                  <div>{obregon.requests.length}</div> <h6>Solicitudes en proceso</h6>
                </div>
              </NavLink>
            </CardBody>

          </Card>
        </Col>) : (null)}

        {(info.sucursal === 2 || info.sucursal === 0) ? (<Col xs="12" sm="6" lg="3" >
          <Card className="text-white bg-success">
            <CardBody>
              <h4>Huatabampo</h4>
              <NavLink onClick={() => renovationsTo(huatabampo.renovations)} style={{ cursor: 'pointer' }} >
                <div className="text-value" >
                  <div>{huatabampo.renovations.length}</div> <h6>Creditos por renovar </h6>
                </div>
              </NavLink>
              <NavLink onClick={() => requestsTo(huatabampo.requests)} style={{ cursor: 'pointer' }}>
                <div className="text-value" >
                  <div>{huatabampo.requests.length}</div> <h6>Solicitudes en proceso</h6>
                </div>
              </NavLink>
            </CardBody>
          </Card>
        </Col>) : (null)}


        {(info.sucursal === 3 || info.sucursal === 0) ? (<Col xs="12" sm="6" lg="3">

          <Card className="text-white bg-info">
            <CardBody>
              <h4>Navojoa</h4>
              <NavLink onClick={() => renovationsTo(navojoa.renovations)} style={{ cursor: 'pointer' }} >
                <div className="text-value" >
                  <div>{navojoa.renovations.length}</div> <h6>Creditos por renovar </h6>
                </div>
              </NavLink>
              <NavLink onClick={() => requestsTo(navojoa.requests)} style={{ cursor: 'pointer' }}>
                <div className="text-value" >
                  <div>{navojoa.requests.length}</div> <h6>Solicitudes en proceso</h6>
                </div>
              </NavLink>
            </CardBody>
          </Card>
        </Col>) : (null) }


      </Row>

    </div >
  );
}
// }

export default Dashboard;

