import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import { Select, message } from "antd";
import { axiosGet, axiosDelete } from "../../utils/axiosUtils";
import TableData from "./tableData";
import axios from "axios";
import LoadingSpin from '../spin/LoadingSpin';

interface Product {
  _id: string,
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
      const res = await axiosGet("sport-bike");
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
      const res = await axiosGet("adventure");
      const data: Product[] = res.data;
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to get all product", error);
    }
  };
  const getProductClassic = async () => {
    try {
      const res = await axiosGet("classic");
      const data: Product[] = res.data;
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to get all product", error);
    }
  };
  const deleteProduct = async (id: string) => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const productRes = await axiosGet(`${id}`);
        console.log('Product response:', productRes.data);
        if (!productRes.data || !productRes.data._id) {
          console.error("Product not found");
          message.error("Product not found");
          return;
        }
        const product = productRes.data;
        // Xóa các hình ảnh của sản phẩm
        for (const img of product.image) {
          const filename = img.split("/").pop();
          try {
            const res = await axios.delete(`http://localhost:4000/api/products/images/${filename}`);
            if (!res.data.success) {
              console.error(`Failed to delete image: ${filename}`);
            }
          } catch (error) {
            console.error(`Failed to delete image: ${filename}`, error);
          }
        }
        //Xóa sản phẩm sau khi đã xóa toàn bộ image có liên quan tới sản phẩm
        const res = await axiosDelete(`${id}`)
        if (res.data.success) {
          setAllProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
          message.success("Product deleted successfully");
        } else {
          message.error("Failed to delete product");
        }
      } catch (error) {
        message.error("Failed to delete product");
      }
      setLoading(false);
    }, 800);

  };
  const updateProduct = async () => {
    try {
      console.log('update product');
    } catch (error) {
      console.error("Delete Fail", error);
    }
  }

  const handleChangeCategory = (value: string) => {
    if (value === 'all') {
      getAllProduct();
    } else if (value === 'sport-bike') {
      getProductSport();
    } else if (value === 'naked-bike') {
      getProductNaked();
    } else if (value === 'adventure') {
      getProductAdventure();
    } else {
      getProductClassic();
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <>
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
                { value: "adventure", label: "Get Adventure products" },
                { value: "classic", label: "Get Classic products" },
              ]}
            />
          </div>
        </div>
        <div className="loading-spin">
          <LoadingSpin spinning={loading}>
            <TableData data={allproducts} handleDelete={deleteProduct} handleUpdate={updateProduct} />
          </LoadingSpin>
        </div>
      </div>
    </>
  );
};
export default ListProduct;
