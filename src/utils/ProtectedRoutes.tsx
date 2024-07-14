import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../stores/userInformationStore";
const ProtectedRoutes: React.FC = () => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" />
}
export default ProtectedRoutes;