import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const Renovaciones = React.lazy(() => import('./views/Solicitudes/Renovaciones'));

const routes = [
  { path: '/grameen/inicio', exact: true, name: "Creditos por renovar en sucursal", component: Dashboard, rol: 7 },
  { path: '/grameen/renovaciones', exact: true, component: Renovaciones, rol: 7 },
 
  { path: '/grameen/admon/users', exact: true, component: Users, rol: 1 },
];

export default routes;

