import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import AddProduct from './components/add_product/AddProduct';
import UpdateProduct from './components/update_product/UpdateProduct';
import AddBlog from './components/add_blog/AddBlog';
import ListProduct from './components/list_product/ListProduct';
import Sidebar from './components/sidebar/Sidebar';
import Home from "./pages/Home";

const App: React.FC = () => {
 
  return (
    <>
      <div className="admin">
        <BrowserRouter>
          {<Navbar />}
          <div className="content-container">
            {<Sidebar />}
            <div className="main-content">
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/sign-up' element={<SignUp />} />

                {<Route path='/' element={<Home />} />}
                {<Route path='/add-product' element={<AddProduct />} />}
                {<Route path='/update-product/:id' element={<UpdateProduct />} />}
                {<Route path='/list-product' element={<ListProduct />} />}
                {<Route path='/add-blog' element={<AddBlog />} />}
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App