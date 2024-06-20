import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import { Image, Button, Select } from "antd";
import { axiosGet } from "../../utils/axiosUtils";



interface Product {
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
      const res = await axiosGet("naked-bike");
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
        {allproducts.map((product, index) => {
          return (
            <div key={index} className="listproduct-format">
              <div className="productlist-image">
                {product.image.length > 0 && <Image src={product.image[0]} />}
              </div>
              <div className="productlist-detail">
                <div>Name: {product.name}</div>
                <div>Category: {product.category}</div>
                <div>Price: {product.price} $</div>
                <div>Status: {product.status ? "Active" : "Disable"}</div>
                {/* <div className="btn-deleteproduct">
                  <Button type="primary">Delete</Button>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ListProduct;
