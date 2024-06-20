import React, { useState } from "react";
import "./AddProduct.css";
import { Select, Input, Col, Row, Image, Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
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
interface Product {
  name: string;
  odo: string;
  color: string;
  model: string;
  brand: string;
  option: string;
  description: string;
  category: string;
  image: [];
  price: number;
}
const AddProduct: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [product, setProduct] = useState<Product>({
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
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const createProduct = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("product", file.originFileObj as File);
    });

    try {
      const uploadImage = await axios.post(
        "http://localhost:4000/upload",
        formData
      );
      const imageUrls = uploadImage.data.imageUrls;
      const productData = {
        ...product,
        image: JSON.parse(JSON.stringify(imageUrls)),
      };
      const createProduct = await axios.post(
        "http://localhost:4000/add-product",
        productData
      );
      if (createProduct.data.success) {
        message.success("Tạo sản phẩm thành công!");
      } else {
        message.error("Tạo sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên hoặc tạo sản phẩm:", error);
      message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Input Name</p>
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
            <p>Input Odo</p>
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
            <p>Input Model</p>
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
            <p>Input Brand</p>
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
        <p>Input Color</p>
        <input
          type="text"
          name="color"
          value={product.color}
          onChange={handleInputChange}
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Input Option</p>
        <TextArea
          rows={2}
          name="option"
          value={product.option}
          onChange={handleInputChange}
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Input Description</p>
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
            <p>Input Category</p>
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
            <p>Input Price</p>
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
        <p>Upload Image</p>
        <Upload
          multiple
          maxCount={12}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
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
        <Button type="primary" onClick={createProduct}>
          Save
        </Button>
      </div>
    </div>
  );
};
export default AddProduct;
