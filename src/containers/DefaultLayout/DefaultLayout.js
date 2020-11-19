import React, { Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { usuarioContext } from '../../provider/contextUsers'
import {
  // AppAside,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
import navigation from '../../sidebar';
import routes from '../../routes';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = ({ usuario }) => {
  let { info, setInfo } = useContext(usuarioContext);
  // const [loading, setLoading] = React.useState(true)
  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  if (info === null) {
    setInfo(usuario)
  }

  // filtrado de rutas por tipo tipo de usuario
  let filterRoutes = routes.filter(route => route.rol >= info.rol)
  let filterSidebar = {};
  filterSidebar.items = navigation.items.filter(nav => nav.rol >= info.rol)

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <DefaultHeader usuario={usuario.nombre} />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={filterSidebar} router={router} />
            {/* aqui podremos filtrar las rutas del sidebar, en el componente sidebar colocamos el rol del usuario
            y lo filtramos antes de enviarlo al componente sidebar */}
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} router={router} />
          <Container fluid>
            <Suspense fallback={loading()}>
              <Switch>
                {filterRoutes.map((route, idx) => {
                  return (route.component /* && (route.rol >= info.rol) */) ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })}
                <Redirect to="/grameen/inicio" />
              </Switch>
            </Suspense>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
