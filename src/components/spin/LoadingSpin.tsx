import React, { ReactNode } from 'react';
import { Spin } from 'antd';
import './LoadingSpin.css'
interface LoadingSpinProps {
    spinning: boolean;
    children: ReactNode;
}

const LoadingSpin: React.FC<LoadingSpinProps> = ({ spinning, children }) => {
    return (
        <div className="loadingspin">
            <Spin size="large" spinning={spinning}>
                {children}
            </Spin>
        </div>

    );
}

export default LoadingSpin;