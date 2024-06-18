import React, { useState } from "react";
import "./AddProduct.css";
import { Select, Input, Col, Row, Image, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const changeSelectCategory = (value: string) => {
  console.log(`selected ${value}`);
};
const { TextArea } = Input;
const AddProduct: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Input Name</p>
        <input type="text" name="name" />
      </div>
      <Row className="row-setup">
        <Col span={7}>
          <div className="addproduct-itemfield">
            <p>Input Odo</p>
            <input type="text" name="name" />
          </div>
        </Col>
        <Col span={7}>
          <div className="addproduct-itemfield">
            <p>Input Model</p>
            <input type="text" name="name" />
          </div>
        </Col>
        <Col span={7}>
          <div className="addproduct-itemfield">
            <p>Input Brand</p>
            <input type="text" name="name" />
          </div>
        </Col>
      </Row>

      <div className="addproduct-itemfield">
        <p>Input Color</p>
        <input type="text" name="name" />
      </div>

      <div className="addproduct-itemfield">
        <p>Input Option</p>
        <TextArea rows={2} />
      </div>
      <div className="addproduct-itemfield">
        <p>Input Description</p>
        <TextArea rows={2} />
      </div>
      <Row>
        <Col span={12}>
          <div className="addproduct-itemfield">
            <p>Input Category</p>
            <Select
              className="add-product-selector"
              defaultValue="sport-bike"
              style={{ width: "100%" }}
              onChange={changeSelectCategory}
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
            <input type="text" name="name" />
          </div>
        </Col>
      </Row>
      {/* Logic upload image o day */}
      <div className="addproduct-itemfield">
        <p>Upload Image</p>
        <Upload
          action="http://localhost:4000/upload"
          multiple
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          accept=".png,.jpg,.jpeg"
          beforeUpload={(file) => {
            console.log({file});
            return file;
          }}
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
    </div>
  );
};
export default AddProduct;
