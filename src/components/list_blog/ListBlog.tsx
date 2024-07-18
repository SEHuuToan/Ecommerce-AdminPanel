import React, { useState, useEffect } from "react";
import "./ListBlog.css";
import { Button, Modal, message } from "antd";
import TableData from "./tableData";
import { axiosGetBlog, axiosDeleteBlog } from "../../utils/axiosUtils";
import AddBlog from "../add_blog/AddBlog";
import UpdateBlog from "../update_blog/UpdateBlog";
import LoadingSpin from "../spin/LoadingSpin";
import useBlogStore from "../../stores/blogStore";
// import axios from "axios";
interface Blog {
  _id: string;
  title: string;
  header: string;
  body1: string;
  body2: string;
  body3: string;
  image: string[];
  footer: string;
  status: boolean;
}
const ListBlog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [allblogs, setAllBlogs] = useState<Blog[]>([]);
  const { openAddModal, openUpdateModal, setOpenAddModal, setOpenUpdateModal, resetInputField } = useBlogStore();
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const getAllBlog = async () => {
    try {
      const res = await axiosGetBlog("all-blog");
      const data: Blog[] = res.data;
      setAllBlogs(data);
    } catch (error) {
      console.error("Failed to get product", error);
    }
  };
  const handleOpenAddModal = () => {
    resetInputField();
    setOpenAddModal(true);
  }
  const handleOpenUpdateModal = (id: string) => {
    setSelectedBlogId(id);
    setOpenUpdateModal(true); // Mở modal cập nhật
  };
  useEffect(() => {
    getAllBlog();
  }, []);

  const deleteBlog = async (id: string) => {
    setLoading(true)
    try {
      const res = await axiosDeleteBlog(`blog/${id}`);
      if (res.data.success) {
        setAllBlogs((prevProducts) =>
          prevProducts.filter((allblogs) => allblogs._id !== id)
        );
        message.success("Xóablog thành công!");
      } else {
        message.error("Failed to delete blog");
      }
    } catch (error) {
      message.error("Failed to delete blog");
    }
    setLoading(false)
    getAllBlog();
  };
  const handleModalClose = () => {
    getAllBlog();
  };
  return (
    <>
      <div className="blog-container">
        <LoadingSpin spinning={loading}>
          <div className="blog-content">
            <h3>List of Blog</h3>
            <div>
              <Button type="primary" onClick={handleOpenAddModal}>
                Create Blog
              </Button>
            </div>
            <div className="blog-table-data">
              <TableData
                data={allblogs}
                handleDelete={deleteBlog}
                handleUpdate={handleOpenUpdateModal}
              />
            </div>
          </div>
        </LoadingSpin>
      </div>
      <div className="component-add-blog">
        <Modal
          open={openAddModal}
          maskClosable={false}
          closable={false}
          onCancel={handleModalClose}
          footer={null}
          width={"60%"}
          style={{top:20, bottom: 20}}
        >
          <AddBlog onModalClose={handleModalClose}/>
        </Modal>
        <Modal
          open={openUpdateModal}
          maskClosable={false}
          closable={false}
          onCancel={handleModalClose}
          footer={null}
          width={"60%"}
          style={{top:20, bottom: 20}}
        >
          <UpdateBlog id={selectedBlogId} onModalClose={handleModalClose}/>
        </Modal>
      </div>
    </>
  );
};
export default ListBlog;
