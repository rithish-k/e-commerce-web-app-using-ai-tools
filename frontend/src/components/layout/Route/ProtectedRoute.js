import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom';

const ProtectedRoute = ({component: Component,...rest}) => {
    const{loading,isAuthenticated,user}=useSelector((state)=>state.user);
      if (loading) return null; 
      return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute