import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({element: Element, ...rest}) => {

    var value = localStorage.getItem('status');

    if(value !== 'logado'){
    return <Navigate to="/"/> 
    }

    return <Element {...rest} />
}

export default PrivateRoute