import React, { useState, useEffect } from "react";
import './ListBlog.css';
import { Button, Modal, message } from "antd";
import TableData from "./tableData";
import { axiosGetBlog, axiosDeleteBlog } from "../../utils/axiosUtils";
import AddBlog from "../add_blog/AddBlog";
import useBlogStore from "../../stores/blogStore";
import axios from "axios";
interface Blog {
    _id: string,
    title: string,
    header: string,
    body1: string,
    body2: string,
    body3: string,
    image: string[],
    footer: string,
    status: boolean,
}
const ListBlog: React.FC = () => {
    const [allblogs, setAllBlogs] = useState<Blog[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const {
        closeModal,
        setCloseModal
    } = useBlogStore();
    const handOpenModal = () => {
        setOpenModal(true);
    }
    const handCloseModal = () => {
        setOpenModal(false);
    }

    const getAllBlog = async () => {
        try {
            const res = await axiosGetBlog("all-blog");
            const data: Blog[] = res.data;
            setAllBlogs(data);
        } catch (error) {
            console.error("Failed to get product", error);
        }
    };
    const handSubmitModal = async () => {
        setCloseModal(false)
    }
    useEffect(() => {
        getAllBlog();
    }, []);

    const deleteBlog = async (id: string) => {
        try {
            const res = await axiosDeleteBlog(`blog/${id}`)
            if (res.data.success) {
                setAllBlogs((prevProducts) => prevProducts.filter((allblogs) => allblogs._id !== id));
                message.success("Xóablog thành công!");
            } else {
                message.error("Failed to delete blog");
            }
        } catch (error) {
            message.error("Failed to delete blog");
        }
    }
    const updateBlog = async () => {
        try {
            console.log('update blog');
        } catch (error) {
            console.error("Delete Fail", error);
        }
    }
    return (
        <>
            <div className="blog-container">
                <div className="blog-content">
                    <h3>List of Blog</h3>
                    <div >
                        <Button type="primary" onClick={handOpenModal}>Create Blog</Button>
                    </div>
                    <div className="blog-table-data">
                        <TableData data={allblogs} handleDelete={deleteBlog} handleUpdate={updateBlog} />
                    </div>
                </div>
            </div>
            <div className="component-add-blog">
                <Modal
                    open={openModal}
                    onOk={handSubmitModal}
                    onCancel={handCloseModal}
                    maskClosable={false}
                    footer={null}
                    width={'50%'}
                >
                    <AddBlog />
                </Modal>
            </div>
        </>
    );
}
export default ListBlog;