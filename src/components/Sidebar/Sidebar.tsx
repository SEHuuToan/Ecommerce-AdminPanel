import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import addNewIcon from '../../assets/other_img/add-item.png';
import listItemIcon from '../../assets/other_img/list_item.png';
import addBlog from '../../assets/other_img/add_blog.png';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <Link to={"/add-product"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={addNewIcon} style={{width: '24px', height: '24px'}} alt="add-icon" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/list-product"} style={{ textDecoration: "none" }}>
        <div className="sidebar-list-item">
          <img src={listItemIcon} style={{width: '24px', height: '24px'}} alt="list-item"/>
          <p>List Product</p>
        </div>
      </Link>
      <Link to={"/add-blog"} style={{ textDecoration: "none" }}>
        <div className="sidebar-blog">
          <img src={addBlog} style={{width: '24px', height: '24px'}} alt="add_blog"/>
          <p>Add Blog</p>
        </div>
      </Link>
    </div>
  );
};
export default Sidebar;
