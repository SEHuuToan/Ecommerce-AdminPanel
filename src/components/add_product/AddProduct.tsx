import React, { useState } from "react";
import "./AddProduct.css";
import { Select, Input, Col, Row, Image, Upload, Button, message, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import LoadingSpin from "../spin/LoadingSpin";
import { axiosPostProduct } from "../../utils/axiosUtils";
import { z } from "zod";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const { TextArea } = Input;
// interface Product {
//   name: string;
//   odo: string;
//   color: string;
//   model: string;
//   brand: string;
//   option: string;
//   description: string;
//   category: string;
//   image: [];
//   price: number;
// }

const categories = [
  "sport-bike",
  "naked-bike",
  "adventure",
  "classic",
] as const;

const FormSchema = z.object({
  name: z.string({
    required_error: "Name do not blank",
  }),
  odo: z.coerce.number().min(1, "Wrong ODO input"),
  color: z.string({
    required_error: "Color do not blank",
  }),
  model: z.coerce
    .number()
    .min(1900, "Oldest Model is 2000")
    .max(new Date().getFullYear(), "Can not sell a non existed future bike."),
  brand: z.string({
    required_error: "Brand can not be blank",
  }),
  option: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Min prices is 1$"),
  category: z.enum(categories).default("sport-bike"),
  image: z.array(z.string().base64()),
});

type Product = z.infer<typeof FormSchema>;

const AddProduct: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [product, setProduct] = useState<Product>({
    name: "",
    odo: 1,
    color: "",
    model: 1900,
    brand: "",
    option: "",
    description: "",
    category: "sport-bike",
    image: [],
    price: 0,
  });

  const [fieldErrors, setErrors] = useState<{
    [key: string]: string[] | undefined;
  }>({});

  const validateFormData = (formData: Product) => {
    const { success, error } = FormSchema.safeParse(formData);

    if (success) {
      setErrors({});
    }

    // Check error
    if (error) {
      setErrors({ ...error.formErrors.fieldErrors });
    }
  };

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
    console.log({ ...product, [name]: value });
    validateFormData({ ...product, [name]: value });
  };
  const handleCategoryChange = (value: Product["category"]) => {
    setProduct((prevProduct) => ({ ...prevProduct, category: value }));
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  //Logic create product
  const createProduct = async () => {
    setLoading(true);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj as File);
    });
    // Append product data
    formData.append("product", JSON.stringify(product));
    try {
      const createProduct = await axiosPostProduct('create-product', formData);
      if (createProduct.data.success) {
        message.success("Tạo sản phẩm thành công!");
      } else {
        message.error("Tạo sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi. Vui lòng thử lại.", error);
      message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
    setLoading(false);
  };
  //reload after click save change
  const reload = () => {
    console.log("Reload....");
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
// 
  return (
    <div className="add-product">
      <LoadingSpin spinning={loading}>
        <div className="addproduct-itemfield">
          <Form.Item
            validateStatus={fieldErrors.name ? "error" : "success"}
              hasFeedback
              help={fieldErrors.name}
            >
            <p>Name</p>
            <Input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </Form.Item>
        </div>
        <Row className="row-setup">
          <Col span={7}>
            <div className="addproduct-itemfield">
            <Form.Item
              validateStatus={fieldErrors.odo ? "error" : ""}
              hasFeedback
              help={fieldErrors.odo}
              >
                <p>Odo</p>
                <Input
                  type="number"
                  name="odo"
                  value={product.odo}
                  onChange={handleInputChange}
                />
            </Form.Item>
            </div>
          </Col>
          <Col span={7}>
            <div>
            <Form.Item
              className="addproduct-itemfield"
              validateStatus={fieldErrors.model ? "error" : ""}
              hasFeedback
              help={fieldErrors.model}
              >
              <p>Model</p>
              <Input
                status={fieldErrors.model ? "error" : ""}
                type="number"
                name="model"
                value={product.model}
                onChange={handleInputChange}
              />
             </Form.Item>
            </div>
          </Col>
          <Col span={7}>
            <div className="addproduct-itemfield">
              <p>Brand</p>
              <Input
                status={fieldErrors.brand ? "error" : ""}
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
              />
              <p style={{ color: "red" }}>{fieldErrors.brand}</p>
            </div>
          </Col>
        </Row>
        <div className="addproduct-itemfield">
          <p>Color</p>
          <Input
            status={fieldErrors.model ? "error" : ""}
            type="text"
            name="color"
            value={product.color}
            onChange={handleInputChange}
          />
          <p style={{ color: "red" }}>{fieldErrors.color}</p>
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
              <Input
                status={fieldErrors.price ? "error" : ""}
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
              <p style={{ color: "red" }}>{fieldErrors.price}</p>
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
          <Button onClick={reload}>Cancel</Button>
          <Button type="primary" onClick={createProduct}>
            Save
          </Button>
        </div>
      </LoadingSpin>
    </div>
  );
};
export default AddProduct;
