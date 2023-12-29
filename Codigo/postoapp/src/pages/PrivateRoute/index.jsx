import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import ListarProdutos from '../ListarProdutos';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const navigate = useNavigate();
  const value = localStorage.getItem('status');
  const tipoUsuario = localStorage.getItem('perfil');


  if (value !== 'logado') {
    return <Navigate to="/" />;
  }

  if (tipoUsuario === 'GERENTE' && Element.name === 'ListarUsuarios') {
    return <ListarProdutos />;
  }

  if (tipoUsuario === 'USUARIO' && Element.name !== 'ListarProdutos') {
    return <ListarProdutos />;
  }

  return <Element {...rest} />;
};

export default PrivateRoute;
