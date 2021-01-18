import React,{ useState, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";



const ProtectedRoute = ({auth, reLink, render, ...rest}) => {
    return(
        auth ?
    <Route {...rest} exact render={render} />
    :
    <Redirect to={reLink||"/login"} />
    )
}



export default ProtectedRoute;