import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./SingleProduct.css";
import { useCart } from "../../Context/cart";

const SingleProduct = (props) => {
  useEffect(() => {
    if (!props.loading) window.scrollTo(0, 0);
  }, [props.loading]);
  const [cart, setCart] = useCart();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [slug, setSlug] = useState("");
  const [maxQuantity, setMaxQuantity] = useState();

  const AddItemToCart = async (id, name, price, maxQuantity) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item.id === id);

      if (index !== -1) {
        mycart[index].quantity += 1;
      } else {
        mycart.push({ id, name, price, maxQuantity, quantity: 1 });
      }

      setCart([...mycart]);
      localStorage.setItem("cart", JSON.stringify([...mycart]));

      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Item not added to cart");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${props.slug}`
      );
      if (data?.success) {
        setName(data.product.name);
        setPrice(data.product.price);
        setMrp(data.product.mrp);
        setCategory(data.product.category.name);
        setId(data.product._id);
        setMaxQuantity(data.product.quantity);
        setSlug(data.product.slug);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting single product!");
    }
  };

  return (
    <div className="pro">
      <Link to={`/product/${slug}/${id}`} className="product1">
        <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${props.id}`}
          alt=""
        />
        <div className="des">
          <span>{category}</span>
          <h5>{name}</h5>
          <div className="price">
            <h4>Rs. {price}</h4>
            <h3>{mrp}</h3>
          </div>
        </div>
      </Link>
      <Link
        className="Add-to-cart"
        onClick={(e) => {
          e.preventDefault();
          AddItemToCart(id, name, price, maxQuantity);
        }}
      >
        <i className="fa fa-shopping-cart cart" />
      </Link>
    </div>
  );
};

export default SingleProduct;
