import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import { Select } from "antd";
import { axiosGet } from "../../utils/axiosUtils";
import TableData from "./tableData";


interface Product {
  id: string,
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
  const [allproducts, setAllProducts] = useState<Product[]>([]);


  const getAllProduct = async () => {
    try {
      const res = await axiosGet("all-product");
      const data: Product[] = res.data;
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to get all product", error);
    }
  };
  const getProductSport = async () => {
    try {
      const res = await axiosGet("product/sport-bike");
      const data: Product[] = res.data;
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to get all product", error);
    }
  };
  const getProductNaked = async () => {
    try {
      const res = await axiosGet("product/naked-bike");
      const data: Product[] = res.data;
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to get all product", error);
    }
  };
  const getProductAdventure = async () => {
    try {
      const res = await axiosGet("product/adventure");
      const data: Product[] = res.data;
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to get all product", error);
    }
  };
  const getProductClassic = async () => {
    try {
      const res = await axiosGet("product/classic");
      const data: Product[] = res.data;
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to get all product", error);
    }
  };
  const deleteProduct = async () => {
    try {
      const res = await axiosGet("product/classic");
      const data: Product[] = res.data;
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to get all product", error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  const handleChangeCategory = (value: string) => {
    if(value === 'all'){
        getAllProduct();
    }else if(value === 'sport-bike'){
        getProductSport();
    }else if(value === 'naked-bike'){
      getProductNaked();
    }else if(value === 'adventure'){
      getProductAdventure();
    }else {
      getProductClassic();
    }
  };
  return (
    <div className="list-product">
      <div className="listproduct-top">
        <h3>All Product List</h3>
        <div className="select-filterproducts">
          Filter
          <Select
            defaultValue="all"
            style={{ width: "100%" }}
            onChange={handleChangeCategory}
            options={[
              { value: "all", label: "Get all products" },
              { value: "sport-bike", label: "Get Sport-bike products" },
              { value: "naked-bike", label: "Get Naked-bike products" },
              { value: "adventure", label: "Get Adventure products"},
              { value: "classic", label: "Get Classic products"},
            ]}
          />
        </div>
      </div>
      <div className="listproduct-allproduct">
          <TableData data={allproducts} handleDelete={deleteProduct}/>
      </div>
    </div>
  );
};
export default ListProduct;
