import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddProduct from "./components/add_product/AddProduct";
import UpdateProduct from "./components/update_product/UpdateProduct";
import AddBlog from "./components/add_blog/AddBlog";
import ListProduct from "./components/list_product/ListProduct";
import Home from "./pages/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";
// import useAuthStore from './stores/userInformationStore';
import CommonLayout from "./layoutElement/CommonLayout";
import AdminLayout from "./layoutElement/AdminLayout";
const App: React.FC = () => {
  // const {isAuthenticated} = useAuthStore();
  return (
    <>
      <div className="admin">
        <BrowserRouter>
          {/* {<Navbar />}
          <div className="content-container">
            {<Sidebar />}
            <div className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route element={<ProtectedRoutes />}>
                  {<Route path="/" element={<Home />} />}
                  {<Route path="/add-product" element={<AddProduct />} />}
                  {
                    <Route
                      path="/update-product/:id"
                      element={<UpdateProduct />}
                    />
                  }
                  {<Route path="/list-product" element={<ListProduct />} />}
                  {<Route path="/add-blog" element={<AddBlog />} />}
                </Route>
              </Routes>
            </div>
          </div> */}
          <Routes>
            <Route element={<CommonLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route element={<AdminLayout />}>
              <Route element={<ProtectedRoutes />}>
                {<Route path="/" element={<Home />} />}
                {<Route path="/add-product" element={<AddProduct />} />}
                {
                  <Route
                    path="/update-product/:id"
                    element={<UpdateProduct />}
                  />
                }
                {<Route path="/list-product" element={<ListProduct />} />}
                {<Route path="/add-blog" element={<AddBlog />} />}
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
