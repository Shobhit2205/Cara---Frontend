import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import SingleProduct from "../Components/SingleProduct/SingleProduct";
import "./CSS/CategoryProduct.css";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };
  useEffect(() => {
    if (params?.slug) getProductByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);
  return (
    <Layout
      title={`${category?.name} - Cara`}
      description={`${category?.name} - Cara`}
      author="shobhit pandey"
    >
      <div id="category-products">
        <h1>{category?.name}</h1>
        <div className="category-container section-p1">
          {products.map((p) => (
            <SingleProduct key={p?._id} id={p?._id} slug={p?.slug} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
