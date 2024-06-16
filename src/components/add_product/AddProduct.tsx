import React from "react";
import "./AddProduct.css";
import { Select, Input, Col, Row } from "antd";

const changeSelectCategory = (value: string) => {
  console.log(`selected ${value}`);
};
const { TextArea } = Input;
const AddProduct: React.FC = () => {
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Input Name</p>
        <input type="text" name="name" placeholder="Text here" />
      </div>
      <Row className="row-setup">
        <Col span={7}>
          <div className="addproduct-itemfield">
            <p>Input Odo</p>
            <input type="text" name="name" placeholder="Text here" />
          </div>
        </Col>
        <Col span={7}>
          <div className="addproduct-itemfield">
            <p>Input Model</p>
            <input type="text" name="name" placeholder="Text here" />
          </div>
        </Col>
        <Col span={7}>
          <div className="addproduct-itemfield">
            <p>Input Brand</p>
            <input type="text" name="name" placeholder="Text here" />
          </div>
        </Col>
      </Row>

      <div className="addproduct-itemfield">
        <p>Input Color</p>
        <input type="text" name="name" placeholder="Text here" />
      </div>

      <div className="addproduct-itemfield">
        <p>Input Option</p>
        <TextArea rows={2} />
      </div>
      <div className="addproduct-itemfield">
        <p>Input Description</p>
        <TextArea rows={3} />
      </div>
      <Row>
        <Col span={12}>
          <div className="addproduct-itemfield">
            <p>Input Category</p>
            <Select
              className="add-product-selector"
              defaultValue="sport-bike"
              style={{ width: '100%' }}
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
            <input type="text" name="name" placeholder="Text here" />
          </div>
        </Col>
      </Row>
      {/* Logic upload image o day */}
      <div className="addproduct-itemfield">
        <p>Upload Image</p>
      </div>
    </div>
  );
};
export default AddProduct;
