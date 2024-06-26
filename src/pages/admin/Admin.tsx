import React from 'react';
import './Admin.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import AddProduct from '../../components/add_product/AddProduct';
import UpdateProduct from '../../components/update_product/UpdateProduct';
import AddBlog from '../../components/add_blog/AddBlog';
import ListProduct from '../../components/list_product/ListProduct';
const Admin: React.FC = () => {
    return(
        <div className="admin">
            <Sidebar />
            <Routes>
                <Route path='/add-product' element={< AddProduct/>}/>
                <Route path='/update-product/:id' element={< UpdateProduct/>}/>
                <Route path='/list-product' element={< ListProduct/>}/>
                <Route path='/add-blog' element={< AddBlog/>}/>
            </Routes>
        </div>
    );
}
export default Admin