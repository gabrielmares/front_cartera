import React, { Component } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import {  Nav, Button } from 'reactstrap';
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

        <Nav className="d-md-down-none" navbar>

        </Nav>
        <Nav className="ml-auto" navbar>
          
            <Button color="link" className="fa fa-sign-out font-3x1" onClick={e => this.props.onLogout(e)}>Salir</Button>

        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
