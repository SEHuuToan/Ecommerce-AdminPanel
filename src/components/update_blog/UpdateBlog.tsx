import React, { useState } from "react"
import './UpdateBlog.css'
import { Input, Upload, Image, } from 'antd';
import type { GetProp, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import useBlogStore from '../../stores/blogStore';
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const { TextArea } = Input;

const AddBlog: React.FC = () => {
    const {
        title,
        header,
        body1,
        body2,
        body3,
        footer,
        image,
        setTitle,
        setHeader,
        setBody1,
        setBody2,
        setBody3,
        setImage,
        setFooter,
    } = useBlogStore();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

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
        setImage(image);
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'header':
                setHeader(value);
                break;
            case 'body1':
                setBody1(value);
                break;
            case 'body2':
                setBody2(value);
                break;
            case 'body3':
                setBody3(value);
                break;
            case 'footer':
                setFooter(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="add-blog">
            <h3>Add Blog</h3>
            <div className="add-blog-content">
                <div className="blog-title">
                    <p>Title</p>
                    <TextArea
                        rows={1}
                        name="title"
                        value={title}
                        onChange={handleInputChange}

                    />
                </div>
                <div className="blog-header">
                    <p>Header</p>
                    <TextArea
                        rows={1}
                        name="header"
                        value={header}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="blog-body">
                    <p>Body</p>
                    <TextArea
                        rows={4}
                        name="body1"
                        value={body1}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="blog-body">
                    <p>Body</p>
                    <TextArea
                        rows={4}
                        name="body2"
                        value={body2}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="blog-body">
                    <p>Body</p>
                    <TextArea
                        rows={4}
                        name="body3"
                        value={body3}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="blog-footer">
                    <p>Footer</p>
                    <TextArea
                        rows={2}
                        name="footer"
                        value={footer}
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
            </div>
        </div>
    );
}
export default AddBlog;