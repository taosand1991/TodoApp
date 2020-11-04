import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import authContext from "./AuthContext";

function ProtectedRoute({component: Component, render, ...rest}) {
    const {user} = React.useContext(authContext);
    return (
        <Route {...rest}
               render={props => {
                   if (user) return <Redirect to='/todos'/>;
                   return Component ? <Component {...props}/> : render(props)
               }}/>
    );
}

export default ProtectedRoute;