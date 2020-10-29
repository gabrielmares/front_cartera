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
  // console.log(usuario)
  let { info, setInfo } = useContext(usuarioContext);

  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  if (info === null) {
    setInfo(usuario)
  }

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
            <AppSidebarNav navConfig={navigation} router={router} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} router={router} />
          <Container fluid>
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
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
