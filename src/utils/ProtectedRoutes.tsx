import React, {useEffect} from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../stores/userInformationStore";

const ProtectedRoutes: React.FC = () => {
    const { isAuthenticated, login } = useAuthStore();
    const token = localStorage.getItem("token");

    const handleDecodeToken = () => {
        if(token){
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Giải mã token
                if(decodedToken){
                    const username = decodedToken.username; // Lấy username từ decodedToken
                    login(username, token); // Đăng nhập với username và token
                }else{
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
    if(!token){
        return isAuthenticated ? <Outlet/> : <Navigate to="/login" />

    }
}
export default ProtectedRoutes;