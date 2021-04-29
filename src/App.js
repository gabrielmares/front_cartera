import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './containers/Private'
import UsersContext from './Context/contextUsers'


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));

const Fail = React.lazy(() => import('./views/Pages/Page404/Page404'))

const App = (props) => {
 
  return (

    <BrowserRouter>
      <UsersContext>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/" name="Login Page" component={Login} />
            <Route>
              <PrivateRoute path="/inicio" name="Home" component={DefaultLayout} />
              <Route exact path='/error' name='404' component={Fail} />
            </Route>

          </Switch>
        </React.Suspense>
      </UsersContext>
    </BrowserRouter>
  );
}

export default App;
