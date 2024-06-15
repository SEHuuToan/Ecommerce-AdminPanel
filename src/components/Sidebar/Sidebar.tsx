import React from 'react';
import './Sidebar.css'
import {Link} from 'react-router-dom';
import {AppstoreAddOutlined} from '@ant-design/icons';

const Sidebar: React.FC = () => {
    return(
        <div className="sidebar">
            <Link to={'/add-product'} style={{textDecoration: 'none'}}>
                <div className="sidebar-item">
                    <AppstoreAddOutlined />
                    <p>Add Product</p>
                </div>
            </Link>
        </div>
    );
}
export default Sidebar; 