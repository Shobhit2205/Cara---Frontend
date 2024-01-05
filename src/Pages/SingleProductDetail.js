import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import "./CSS/SingleProductDetail.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import SingleProduct from "../Components/SingleProduct/SingleProduct";
import NewsLetter from "../Components/Layout/NewsLetter/NewsLetter";
import { useCart } from "../Context/cart";

const SingleProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [similar, setSimilar] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      setId(data.product._id);
      setName(data.product.name);
      setPrice(data.product.price);
      setMaxQuantity(data?.product?.quantity);
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting product");
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-products/${pid}/${cid}`
      );
      setSimilar(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting related product");
    }
  };

  const AddItemToCart = (id, name, price, maxQuantity, quantity) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item.id === id);

      if (index !== -1) {
        if (
          parseInt(mycart[index].quantity) + parseInt(quantity) >
          maxQuantity
        ) {
          toast.error("Not added to cart, Reduce quantity!");
          return;
        } else {
          mycart[index].quantity =
            parseInt(mycart[index].quantity) + parseInt(quantity);
        }
      } else {
        mycart.push({ id, name, price, maxQuantity, quantity: quantity });
      }

      setCart([...mycart]);
      localStorage.setItem("cart", JSON.stringify([...mycart]));
      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Item not added to cart");
    }
  };
  return (
    <Layout
      title="Product - Cara"
      description="Product Cara"
      author="shobhit pandey"
    >
      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${params.id}`}
            width="100%"
            id="mainimg"
            alt=""
          />
        </div>
        <div className="single-pro-details">
          <h6>{product?.category?.name}</h6>
          <h4>{product?.name}</h4>
          <h2>Rs. {product?.price}</h2>

          <input
            type="number"
            defaultValue={1}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className="normal"
            onClick={() => {
              AddItemToCart(id, name, price, maxQuantity, quantity);
            }}
          >
            Add to Cart
          </button>
          <h4>Product Details</h4>
          <span>{product?.description}</span>
        </div>
      </section>

      {similar.length > 0 && (
        <section id="similar-products" className="section-p1">
          <h2>Featured Products</h2>

          <div className="pro-container">
            {similar.map((p) => (
              <SingleProduct key={p._id} id={p._id} slug={p.slug} />
            ))}
          </div>
        </section>
      )}
      <NewsLetter />
    </Layout>
  );
};

export default SingleProductDetail;
