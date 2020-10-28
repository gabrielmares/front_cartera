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
            <PrivateRoute exact path="/grameen/inicio" name="Home" component={DefaultLayout} />
            <PrivateRoute exact path="/grameen/renovaciones" component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </UsersContext>
  );
}

export default App;
