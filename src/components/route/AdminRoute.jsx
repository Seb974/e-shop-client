import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';
import Roles from '../../config/Roles';

const AdminRoute = ({ path, component }) => {
    const { isAuthenticated, currentUser } = useContext(AuthContext);
    return isAuthenticated && Roles.hasPrivileges(currentUser) ? <Route path={ path } component={ component } /> : <Redirect to="/404" />
}
 
export default AdminRoute;