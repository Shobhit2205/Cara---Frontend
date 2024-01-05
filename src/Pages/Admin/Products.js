import Layout from "../../Components/Layout/Layout";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/Menu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../CSS/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title="Dashboard - Products">
      <div className="product-container">
        <div className="left">
          <AdminMenu />
        </div>
        <div className="right">
          <h1>Products</h1>
          <div id="product1" className="pro-container">
            {products?.map((p) => (
              <div className="pro" key={p._id}>
                <Link
                  className="Prod-link"
                  to={`/dashboard/admin/product/update-product/${p.slug}/${p._id}`}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt="product_image"
                  />
                  <div className="des">
                    <span>{p.category.name}</span>
                    <h5>{p.name}</h5>
                    <div className="price">
                      <h4>Rs. {p.price}</h4>
                      <h3>{p.mrp}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
