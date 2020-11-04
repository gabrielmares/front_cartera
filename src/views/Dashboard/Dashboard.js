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
import { usuarioContext } from '../../provider/contextUsers';



const Dashboard = () => {
  let history = useHistory();
  const { info, setRequestBySuc } = React.useContext(usuarioContext)
  const [obregon, setObregon] = React.useState({})
  const [huatabampo, setHuatabampo] = React.useState({})
  const [navojoa, setNavojoa] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    axiosClient.get('/api/operaciones/totales', {
      params: {
        sucursal: info.sucursal
      }
    }).then(totales => {
      switch (info.sucursal) {
        case 0:
          setObregon(totales.data.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 1)))
          setHuatabampo(totales.data.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 2)))
          setNavojoa(totales.data.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 3)))
          break;
        case 1:
          setObregon(totales.data.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 1)))
          break;
        case 2:
          setHuatabampo(totales.data.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 2)))
          break;
        case 3:
          setNavojoa(totales.data.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 3)))
          break;
        default:
          break;
      }
      setLoading(false);

    })
    // eslint-disable-next-line
  }, [info])


  if (loading) return false

  // si da clic en el cuadro de sucursales, lo reenvia a la vista donde se muestra el total de solicitudes por sucursal
  const routeTo = (lista) => {
    console.log(lista.length)
    setRequestBySuc(lista)
    return history.push('/grameen/renovaciones');
  }




  return (
    <div className="animated fadeIn">
      <Row>
        {(obregon.length > 0) ? (<Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-primary " onClick={() => routeTo(obregon)} style={{ cursor: 'pointer' }}>
            <CardBody className="pb-0">
              <NavLink ><div className="text-value">{obregon.length}</div></NavLink>
              <div>Obregon</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            </div>
          </Card>
        </Col>) : (null)}

        {(huatabampo.length > 0) ? (<Col xs="12" sm="6" lg="3" >
          <Card className="text-white bg-success" onClick={() => routeTo(huatabampo)} style={{ cursor: 'pointer' }}>
            <CardBody className="pb-0">
              <NavLink ><div className="text-value">{huatabampo.length}</div></NavLink>
              <div>Huatabampo</div>
            </CardBody>
            <div className="chart-wrapper" style={{ height: '70px' }}>
            </div>
          </Card>
        </Col>) : (null)}


        {(navojoa.length > 0) ? (<Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info" onClick={() => routeTo(navojoa)} style={{ cursor: 'pointer' }}>
            <CardBody className="pb-0">
              <NavLink ><div className="text-value">{navojoa.length}</div></NavLink>
              <div>Navojoa</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            </div>
          </Card>
        </Col>) : (null)}


      </Row>

    </div>
  );
}
// }

export default Dashboard;

