import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './containers/Private'
import UsersContext from './provider/contextUsers'


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));


const App = (props) => {

  return (
    <UsersContext>
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/" name="Login Page" component={Login} />
            <Route>
              <PrivateRoute path="/grameen/inicio" name="Home" component={DefaultLayout} />
            </Route>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </UsersContext>
  );
}

export default App;
