import React from 'react';
import { Nav, Button } from 'reactstrap';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logoGrameen from '../../assets/img/brand/grameen_logo.png'
import { useHistory } from 'react-router-dom';
import Row from 'reactstrap/lib/Row';
import { logOut } from '../../helpers/Helpers';
import logoPublico from '../../assets/img/brand/public.png'


const DefaultHeader = ({ usuario }) => {


  let history = useHistory()

  // llamamos a la api para que borre los cookies de la sesion
  // reenviamos a la pantalla principal
  const signOut = async (e) => {
    e.preventDefault()
    if (process.env.REACT_APP_JSON === 'TRUE' && window.localStorage.getItem('Demo')) {
      window.localStorage.removeItem('Demo');
      return history.push('/entrar')
    }

    logOut()
    history.push('/entrar');
  }

  const logoApp = (process.env.REACT_APP_JSON === 'TRUE' && window.localStorage.getItem('Demo')) ? logoPublico : logoGrameen

  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logoApp, width: 100, height: 25, alt: 'Grameen' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />
      <h2 style={{ paddingLeft: '2rem', marginTop: '10px' }}>{usuario}</h2>

      <Nav className="ml-auto" navbar>

      </Nav>
      <Row className="justify-content-end mr-4">
        <Button id="LogOut" outline color="danger" onClick={e => signOut(e)}>
          <i className="cui-account-logout"></i>&nbsp;
            Salir
          </Button>
      </Row>
    </React.Fragment>
  );
}



export default DefaultHeader;
