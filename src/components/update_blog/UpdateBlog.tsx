import React, { useState, useEffect } from "react";
import "./UpdateBlog.css";
import { Input, Upload, Image, message, Button } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { axiosGetBlog, axiosUpdateBlog, axiosDeleteImageBlog } from "../../utils/axiosUtils";
import LoadingSpin from "../spin/LoadingSpin";
import useBlogStore from "../../stores/blogStore";
// import axios from "axios";
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
  _id: string;
  title: string;
  header: string;
  body1: string;
  body2: string;
  body3: string;
  footer: string;
  image: string[];
  status: boolean;
}
interface UpdateModalProps{
  id: string | null;
  onModalClose: () => void;
}
const UpdateBlog: React.FC<UpdateModalProps> = ({id, onModalClose}) => {
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const {setOpenUpdateModal} = useBlogStore();
  // const [blog, setBlog] = useState(blogData);
  const [blog, setBlog] = useState<Blog>({
    _id: "",
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
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };
  const handleRemoveImage = async (file: UploadFile) => {
    setLoading(true);
    if (file.url) {
      try {
        const filename = file.url.split("/").pop();
        // const res = await axios.delete(
        //   `http://192.168.1.8:4000/api/blog/${id}/${filename}`
        // );
        const res = await axiosDeleteImageBlog(`images/${id}/${filename}`);
        if (res.data.success) {
          setFileList((prevFileList) =>
            prevFileList.filter((item) => item.uid !== file.uid)
          );
          setBlog((prevBlog) => ({
            ...prevBlog,
            image: prevBlog.image.filter((img) => img !== file.url),
          }));
          message.success("Xoa anh thanh cong");
        } else {
          message.error("Failed to delete image");
        }
      } catch (error) {
        console.error("Failed to delete image:", error);
        message.error("Failed to delete image");
      }
    }
    setLoading(false);
  };
  const handleGetDataBlog = async () => {
    try {
      const res = await axiosGetBlog(`blog/${id}`);
      const { image } = res.data;
      setBlog(res.data);
      setFileList(
        image.map((img: { url: string; public_id: string }, index: number) => ({
          uid: index,
          url: img.url, // Sử dụng img.url làm URL hình ảnh
          status: "done",
          public_id: img.public_id, // Thêm public_id vào danh sách file
        }))
      );
    } catch (error) {
      message.error("Can't found this blog");
    }
  };
  const saveBlog = async () => {
    setLoading(true);
    const formData = new FormData();
    const newFiles = fileList.filter((file) => !file.url);
    // Thêm các file mới vào formData
    newFiles.forEach((file) => {
      formData.append("images", file.originFileObj as File);
    });
    formData.append("blog", JSON.stringify(blog));
    try {
      const updateProduct = await axiosUpdateBlog (`update-blog/${id}`, formData);
      if (updateProduct.data.success) {
        handleGetDataBlog();
        message.success("Cập nhật blog thành công!");
      } else {
        message.error("Cập nhật blog thất bại!");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi. Vui lòng thử lại.", error);
      message.warning("Bạn không thay đổi bất kì giá trị nào!");
    }
    setLoading(false);
    setOpenUpdateModal(false)
    onModalClose();
  };
  useEffect(() => {
    handleGetDataBlog();
  }, [id]);
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    onModalClose();
  }
  return (
    <div className="add-blog">
      <LoadingSpin spinning={loading}>
        <h3>Update Blog</h3>
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
              rows={1}
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
              onRemove={handleRemoveImage}
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
            <Button onClick={handleCloseUpdateModal}>Cancel</Button>
            <Button type="primary" onClick={saveBlog}>
              Save
            </Button>
          </div>
        </div>
      </LoadingSpin>
    </div>
  );
};
export default UpdateBlog;
