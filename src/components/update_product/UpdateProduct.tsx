import React, { useState, useEffect } from "react";
import "./UpdateProduct.css";
import { Select, Input, Col, Row, Image, Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import axios from "axios";
import { axiosGet } from "../../utils/axiosUtils";
import { useParams } from "react-router-dom";
import LoadingSpin from '../spin/LoadingSpin';
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const { TextArea } = Input;
interface Product {
  _id: string;
  name: string;
  odo: string;
  color: string;
  model: string;
  brand: string;
  option: string;
  description: string;
  category: string;
  image: string[];
  price: number;
}
const UpdateProduct: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [product, setProduct] = useState<Product>({
    _id: "",
    name: "",
    odo: "",
    color: "",
    model: "",
    brand: "",
    option: "",
    description: "",
    category: "sport-bike",
    image: [],
    price: 0,
  });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const handleCategoryChange = (value: string) => {
    setProduct((prevProduct) => ({ ...prevProduct, category: value }));
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  //Logic delete image when update
  const handleRemoveImage = async (file: UploadFile) => {
    setLoading(true);
    if (file.url) {
      try {
        const filename = file.url.split("/").pop();
        const res = await axios.delete(
          `http://192.168.1.7:4000/api/products/images/${id}/${filename}`
        );
        if (res.data.success) {
          setFileList((prevFileList) =>
            prevFileList.filter((item) => item.uid !== file.uid)
          );
          setProduct((prevProduct) => ({
            ...prevProduct,
            image: prevProduct.image.filter((img) => img !== file.url),
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
  const handleGetDataProduct = async () => {
    try {
      const res = await axiosGet(`${id}`);
      const { image } = res.data;
      setProduct(res.data);
      setFileList(
        image.map((img: { url: string, public_id: string }, index: number) => ({
          uid: index,
          url: img.url, // Sử dụng img.url làm URL hình ảnh
          status: "done",
          public_id: img.public_id // Thêm public_id vào danh sách file
        }))
      );
    } catch (error) {
      message.error("Can't found this product");
    }
  };
  const saveProduct = async () => {
    setLoading(true)
    const formData = new FormData();
    const newFiles = fileList.filter((file) => !file.url);
    // Thêm các file mới vào formData
    newFiles.forEach((file) => {
      formData.append("images", file.originFileObj as File);
    });
    formData.append("product", JSON.stringify(product));
    try {
      const updateProduct = await axios.put(`http://192.168.1.7:4000/api/products/update-product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (updateProduct.data.success) {
        handleGetDataProduct();
        message.success("Cập nhật sản phẩm thành công!");
      } else {
        message.error("Cập nhật sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi. Vui lòng thử lại.", error);
      message.warning("Bạn không thay đổi bất kì giá trị nào!");
    }
    setLoading(false);
  };
  //reload after click save change
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );
  useEffect(() => {
    handleGetDataProduct();
  }, [id]);
  return (

    <div className="add-product">
      <LoadingSpin spinning={loading}>
        <div className="addproduct-itemfield">
          <p>Name</p>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <Row className="row-setup">
          <Col span={7}>
            <div className="addproduct-itemfield">
              <p>Odo</p>
              <input
                type="text"
                name="odo"
                value={product.odo}
                onChange={handleInputChange}
              />
            </div>
          </Col>
          <Col span={7}>
            <div className="addproduct-itemfield">
              <p>Model</p>
              <input
                type="text"
                name="model"
                value={product.model}
                onChange={handleInputChange}
              />
            </div>
          </Col>
          <Col span={7}>
            <div className="addproduct-itemfield">
              <p>Brand</p>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
              />
            </div>
          </Col>
        </Row>
        <div className="addproduct-itemfield">
          <p>Color</p>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleInputChange}
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Option</p>
          <TextArea
            rows={2}
            name="option"
            value={product.option}
            onChange={handleInputChange}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Description</p>
          <TextArea
            rows={2}
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <Row>
          <Col span={12}>
            <div className="addproduct-itemfield">
              <p>Category</p>
              <Select
                className="add-product-selector"
                defaultValue="sport-bike"
                style={{ width: "100%" }}
                value={product.category}
                onChange={handleCategoryChange}
                options={[
                  { value: "sport-bike", label: "Sport Bike" },
                  { value: "naked-bike", label: "Naked Bike" },
                  { value: "adventure", label: "Adventure" },
                  { value: "classic", label: "Classic / Cafe Racer" },
                ]}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
          </Col>
        </Row>
        {/* Logic upload image o day */}
        <div className="addproduct-itemfield">
          <p>Image</p>
          <Upload
            multiple
            maxCount={12}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={handleRemoveImage}
            accept=".png,.jpg,.jpeg"
            beforeUpload={() => false} // ngăn không tự động tải lên
          >
            {fileList.length >= 12 ? null : uploadButton}
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
          <Button onClick={handleGetDataProduct}>Cancel</Button>
          <Button type="primary" onClick={saveProduct}>
            Save
          </Button>
        </div>
      </LoadingSpin>
    </div>
  );
};

export default UpdateProduct;
