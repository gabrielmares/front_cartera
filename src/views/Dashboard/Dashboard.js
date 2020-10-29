import React from 'react';
import {

  Card,
  CardBody,
  Col,
  Row,
  NavLink
} from 'reactstrap';



const Dashboard = () => {

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card color="primary" className="text-white ">
            <CardBody className="pb-0">
              <NavLink ></NavLink>

              <div className="text-value">--</div>
              <div>Obregon</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <NavLink ></NavLink>

              <div className="text-value">--</div>
              <div>Navojoa</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-warning">
            <CardBody className="pb-0">
              <NavLink ></NavLink>

              <div className="text-value">--</div>
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

