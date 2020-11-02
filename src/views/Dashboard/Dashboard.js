import React from 'react';
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
  const { info } = React.useContext(usuarioContext)
  const [obregon, setObregon] = React.useState({})
  const [huatabampo, setHuatabampo] = React.useState({})
  const [navojoa, setNavojoa] = React.useState({})

  React.useEffect(() => {
    axiosClient.get('/api/operaciones/totales', {
      sucursal: info.sucursal
    }).then(totales => {
      console.log(totales.data.length)
      setObregon(totales.data.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 1)))
      setHuatabampo(totales.data.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 2)))
      setNavojoa(totales.data.filter(invoice => (parseInt(invoice.FINNOSUCURSAL) === 3)))
    })

  }, [info])

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-primary">
            <CardBody className="pb-0">


              <NavLink ><div className="text-value">{obregon.length}</div></NavLink>
              <div>Obregon</div>


            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <NavLink ><div className="text-value">{huatabampo.length}</div></NavLink>


              <div>Navojoa</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-success">
            <CardBody className="pb-0">
              <NavLink ><div className="text-value">{navojoa.length}</div></NavLink>


              <div>Huatabampo</div>
            </CardBody>
            <div className="chart-wrapper" style={{ height: '70px' }}>
            </div>
          </Card>
        </Col>
      </Row>

    </div>
  );
}
// }

export default Dashboard;

