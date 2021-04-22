import React from 'react';
import { Nav, Button, Col } from 'reactstrap';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import PublicImg from '../../assets/img/brand/public.png'
import { useHistory } from 'react-router-dom';
import axiosClient from '../../helpers/axiosClient'



const DefaultHeader = ({ usuario }) => {


  let history = useHistory()

  // llamamos a la api para que borre los cookies de la sesion
  // reenviamos a la pantalla principal
  const signOut = async (e) => {
    e.preventDefault()
    await axiosClient.get('/api/logout');
    history.push('/');
  }


  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: PublicImg, width: 100, height: 25, alt: 'Grameen' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />
      <h2 style={{ paddingLeft: '2rem', marginTop: '10px' }}>{usuario}</h2>

      <Nav className="ml-auto" navbar>

      </Nav>
      <Col col="2" sm="2" md="2" xl="1" className="justify-content-end">
        <Button style={{ marginLeft: '50px' }} id="LogOut" outline color="danger" onClick={e => signOut(e)}>
          <i className="cui-account-logout"></i>&nbsp;
            Salir
          </Button>
      </Col>
    </React.Fragment>
  );
}



export default DefaultHeader;
