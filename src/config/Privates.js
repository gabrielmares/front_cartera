 import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Privates = ({ component: Component, ...props }) => {
    const demo = localStorage.getItem('Demo');
    return (
        <Route {...props} render={props => demo ? (
            <Redirect to="/login" />
        ) : (
                <Component {...props} />
            )}


        />

    );
}

export default Privates;