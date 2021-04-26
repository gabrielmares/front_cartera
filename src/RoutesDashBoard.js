
import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const Renovaciones = React.lazy(() => import('./views/Solicitudes/Renovations'));
const Solicitudes = React.lazy(() => import('./views/Solicitudes/RequestsInProcess'))
const Config = React.lazy(() => import('./views/Solicitudes/Configuration'));


const routes = [
  { path: '/inicio', exact: true, component: Dashboard, rol: 7 },
  { path: '/renovaciones', exact: true, component: Renovaciones, rol: 7 },
  { path: '/solicitudes', exact: true, component: Solicitudes, rol: 7 },
  { path: '/admon/users', exact: true, component: Users, rol: 1 },
  { path: '/admon/configuration', exact: true, component: Config, rol: 1 }
];

export default routes;

