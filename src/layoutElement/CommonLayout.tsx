import React from "react";
import { Outlet } from "react-router-dom";

const CommonLayout: React.FC = () => {
    return(
        <>
            <div className="common-layout">
                <Outlet />
            </div>
        </>
    )
}
export default CommonLayout