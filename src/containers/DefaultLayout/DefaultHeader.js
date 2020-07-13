import React, { Component } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { Nav, Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/grameen_logo.png'
// import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 100, height: 25, alt: 'Grameen' }}
        // minimized={{ src: sygnet, width: 35, height: 35, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />


        <Nav className="ml-auto" navbar>

        </Nav>
        <Col col="2" sm="1" md="1" className="mb-xl-0">
          <Button block outline color="danger" onClick={e => this.props.onLogout(e)}>
            <i className="cui-account-logout "></i>&nbsp;Salir
                </Button>
        </Col>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
