import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRouter = () => {
  const currentUser = useContext(AuthContext)

    let location = useLocation();
    return  !currentUser ? <Navigate to="/login" state={{from: location}} replace />
                         : <Outlet />
  }
 
export default PrivateRouter