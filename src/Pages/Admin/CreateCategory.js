import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/Menu/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import "../CSS/CreateCategory.css";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Create New category
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        getAllCategory();
        setName("");
        toast.success(`Created ${data.category.name} category successfully`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in creating category");
    }
  };

  // Update category
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selectedCategory._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(data?.message);
        getAllCategory();
        setVisible(false);
        setSelectedCategory(null);
        setUpdatedName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in updating category");
    }
  };

  // Delete category
  const handleDeleteSubmit = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in updating category");
    }
  };

  // Get all categories
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
  return (
    <Layout title="Dashboard - Create Category">
      <div className="user-container">
        <div className="left">
          <AdminMenu />
        </div>
        <div className="right">
          <h1>Manage category</h1>
          <div id="form-details">
            <h2>Create New Category</h2>
            <form>
              <input
                type="text"
                placeholder="category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="normal" onClick={handleCreateSubmit}>
                Create
              </button>
            </form>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c, i) => (
                  <>
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button
                          className="normal edit"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelectedCategory(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="normal edit"
                          onClick={() => {
                            handleDeleteSubmit(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <div id="form-details">
              <form>
                <input
                  type="text"
                  placeholder="category name"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <button className="normal" onClick={handleUpdateSubmit}>
                  Update
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
