import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/Menu/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useParams, useNavigate } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );

      if (data?.success) {
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setMrp(data.product.mrp);
        setQuantity(data.product.quantity);
        setCategory(data.product.category._id);
        setShipping(data.product.shipping);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting single product!");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const getPhoto = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-photo/${params.id}`,
        { responseType: "blob" }
      );
      setPhoto(res.data);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in grtting image");
    }
  };

  useEffect(() => {
    getPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in geting Categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("mrp", mrp);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("shipping", shipping);
      productData.append("category", category);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${params.id}`,
        productData
      );

      if (data?.success) {
        toast.success("Successfully Updated new product");
        navigate("/dashboard/admin/all-products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong in updating product");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${params.id}`
      );
      navigate("/dashboard/admin/all-products");
      toast.success("product deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting product");
    }
  };

  return (
    <Layout title="Dashboard - Update Products">
      <div className="admin-container">
        <div className="left">
          <AdminMenu />
        </div>
        <div className="right">
          <h1>Update Product</h1>
          <div className="create-product">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div>
              <label className="btn btn-outline-secondary w-100">
                Upload new Photo
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={(window.URL || window.webkitURL).createObjectURL(
                      photo
                    )}
                    alt="Product_photo"
                    height={"200px"}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${params.id}`}
                    alt="Product_photo"
                    height={"200px"}
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Product name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="Description of product"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={mrp}
                placeholder="MRP"
                className="form-control"
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setShipping(value)}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="normal" onClick={handleUpdate}>
                Update Product
              </button>
              <button className="normal mx-3" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
