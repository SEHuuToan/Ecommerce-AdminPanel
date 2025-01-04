import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import { Select, message } from "antd";
import { axiosGet, axiosDelete } from "../../utils/axiosUtils";
import TableData from "./tableData";
import LoadingSpin from "../spin/LoadingSpin";

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
  status: boolean;
}

const ListProduct: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [allproducts, setAllProducts] = useState<Product[]>([]);
  const [selectFilter, setSelectFilter] = useState("all-product");

  const getAllProduct = async () => {
    try {
      const res = await axiosGet(`${selectFilter}`);
      const data: Product[] = res.data;
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to get product!", error);
    }
  };
  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      const res = await axiosDelete(`${id}`);
      if (res.data.success) {
        setAllProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        message.success("Delete product successfull!");
      } else {
        message.error("Delete product fail!");
      }
    } catch {
      message.error("Failed to delete product!");
    }
    setLoading(false);
  };
  const updateProduct = async () => {
    try {
      console.log("update product");
    } catch (error) {
      console.error("Delete Fail", error);
    }
  };

  const handleChangeCategory = (value: string) => {
    setSelectFilter(value);
  };

  useEffect(() => {
    getAllProduct();
  }, [selectFilter]);
  return (
    <>
      <div className="list-product">
        <div className="listproduct-top">
          <h3>All Product List</h3>
          <div className="select-filterproducts">
            Filter
            <Select
              defaultValue="all-product"
              style={{ width: "100%" }}
              onChange={handleChangeCategory}
              options={[
                { value: "all-product", label: "Get all products" },
                { value: "sport-bike", label: "Get Sport-bike products" },
                { value: "naked-bike", label: "Get Naked-bike products" },
                { value: "adventure", label: "Get Adventure products" },
                { value: "classic", label: "Get Classic products" },
              ]}
            />
          </div>
        </div>
        <div className="loading-spin">
          <LoadingSpin spinning={loading}>
            <TableData
              data={allproducts}
              handleDelete={deleteProduct}
              handleUpdate={updateProduct}
            />
          </LoadingSpin>
        </div>
      </div>
    </>
  );
};
export default ListProduct;
