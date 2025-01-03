import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import useAuthStore from "../stores/userInformationStore";

const ProtectedRoutes: React.FC = () => {
    const { isAuthenticated, login } = useAuthStore();  
    const token = Cookies.get('accessToken');
    const handleDecodeToken = () => {
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Giải mã token
                if (decodedToken) {
                    const userId = decodedToken.id; // Lấy username từ decodedToken
                    login(userId, token); // Đăng nhập với username và token
                } else {
                    console.error("Invalid token format");
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }
    useEffect(() => {
        handleDecodeToken();
    }, [])
    if (isAuthenticated === true || token != null) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }



}
export default ProtectedRoutes;