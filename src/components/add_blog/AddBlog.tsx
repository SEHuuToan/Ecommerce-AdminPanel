import React, { useState } from "react"
import './AddBlog.css'
import { Input, Upload, Image, Button, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from "antd";
import LoadingSpin from '../spin/LoadingSpin';
import { PlusOutlined } from '@ant-design/icons';
// import useBlogStore from '../../stores/blogStore';
import axios from "axios";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const { TextArea } = Input;
interface Blog {
    title: string;
    header: string;
    body1: string;
    body2: string;
    body3: string;
    footer: string;
    image: [];
    status: boolean;
}
const AddBlog: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [blog, setBlog] = useState<Blog>({
        title: "",
        header: "",
        body1: "",
        body2: "",
        body3: "",
        footer: "",
        image: [],
        status: true,
    });
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
    );
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setBlog((prevProduct) => ({ ...prevProduct, [name]: value }));
    };
    const createBlog = async () => {
        setLoading(true)
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("images", file.originFileObj as File);
        });
        formData.append("blog", JSON.stringify(blog))
        try {
            const result = await axios.post("http://192.168.2.224:4000/api/add-blog", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (result.data.success) {
                message.success("Tạo blog thành công!");
            } else {
                message.error("Tạo blog thất bại!");
            }
            // setOpenModal(false);
        } catch (error) {
            console.error("Failed to create blog", error);
            // setOpenModal(false);
        }
        setLoading(false);
    }
    return (
        <div className="add-blog">
            <LoadingSpin spinning={loading}>
            <h3>Add Blog</h3>
            <div className="add-blog-content">
                <div className="blog-title">
                    <p>Title</p>
                    <TextArea
                        rows={1}
                        name="title"
                        value={blog.title}
                        onChange={handleInputChange}

                    />
                </div>
                <div className="blog-header">
                    <p>Header</p>
                    <TextArea
                        rows={2}
                        name="header"
                        value={blog.header}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="blog-body">
                    <p>Body</p>
                    <TextArea
                        rows={4}
                        name="body1"
                        value={blog.body1}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="blog-body">
                    <p>Body</p>
                    <TextArea
                        rows={4}
                        name="body2"
                        value={blog.body2}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="blog-body">
                    <p>Body</p>
                    <TextArea
                        rows={4}
                        name="body3"
                        value={blog.body3}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="blog-footer">
                    <p>Footer</p>
                    <TextArea
                        rows={2}
                        name="footer"
                        value={blog.footer}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Image</p>
                    <Upload
                        multiple
                        maxCount={3}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        accept=".png,.jpg,.jpeg"
                        beforeUpload={() => false} // ngăn không tự động tải lên
                    >
                        {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{ display: "none" }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(""),
                            }}
                            src={previewImage}
                        />
                    )}
                </div>
                <div className="action-button">
                    <Button>Cancel</Button>
                    <Button type="primary" onClick={createBlog}>
                        Save
                    </Button>
                </div>
            </div>
            </LoadingSpin>
        </div>
    );
}
export default AddBlog;