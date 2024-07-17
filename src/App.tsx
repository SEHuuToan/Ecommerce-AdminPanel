import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddProduct from "./components/add_product/AddProduct";
import UpdateProduct from "./components/update_product/UpdateProduct";
import AddBlog from "./components/add_blog/AddBlog";
import UpdateBlog from "./components/update_blog/UpdateBlog";
import ListBlog from "./components/list_blog/ListBlog";
import ListProduct from "./components/list_product/ListProduct";
import Home from "./pages/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";
// import useAuthStore from './stores/userInformationStore';
import CommonLayout from "./layoutElement/CommonLayout";
import AdminLayout from "./layoutElement/AdminLayout";
import ErrorPage from "./pages/ErrorPage";
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
                {<Route path="/list-blog" element={<ListBlog />} />}
                {<Route path="/update-blog/:id" element={<UpdateBlog />} />}

              </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
