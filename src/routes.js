
import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const Renovaciones = React.lazy(() => import('./views/Solicitudes/Renovations'));
const Solicitudes = React.lazy(() => import('./views/Solicitudes/RequestsInProcess'))
const Config = React.lazy(() => import('./views/Solicitudes/Configuration'));


const routes = [
  { path: '/grameen/inicio', exact: true, component: Dashboard, rol: 7 },
  { path: '/grameen/renovaciones', exact: true, component: Renovaciones, rol: 7 },
  { path: '/grameen/solicitudes', exact: true, component: Solicitudes, rol: 7 },
  { path: '/grameen/admon/users', exact: true, component: Users, rol: 1 },
  { path: '/grameen/admon/configuration', exact: true, component: Config, rol: 1 }
];

export default routes;

