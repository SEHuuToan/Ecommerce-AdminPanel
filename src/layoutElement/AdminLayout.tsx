import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar_left/Sidebar";
import './AdminLayout.css'
const AdminLayout: React.FC = () => {
    return(
        <>
            <div className="admin-page">
                <Navbar />
                <div className="admin-container">
                    <Sidebar />
                    <Outlet />
                </div>
            </div>
        </>
    );
}
export default AdminLayout