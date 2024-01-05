import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/Menu/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import { Select } from "antd";

const { Option } = Select;

const Orders = () => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  // const [changeStatus, setChangeStatus] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [btn, setBtn] = useState(false);

  const getOrders = async () => {
    try {
      // const user = auth?.user;
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Orders");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getuser = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/getUserDetails/${id}`
      );
      console.log(data);
      setName(data?.name);
      setEmail(data?.email);
      setPhone(data?.phone);
      setAddress(data?.address);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting user Details");
    }
  };

  const deleteOrder = async (e, id, status) => {
    e.preventDefault();
    try {
      if (status !== "Delivered" && status !== "Canceled") {
        toast.error("Can not delete order until Delivered or Canceled!");
        return;
      }
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-order/${id}`
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in deleting product");
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );

      getOrders();
    } catch (error) {
      console.log(error);
      toast.error("Error in changing status");
    }
  };
  return (
    <Layout title="Dashboard - Orders">
      <div className="admin-container">
        <div className="left">
          <AdminMenu />
        </div>
        <div className="right">
          <h1>Orders</h1>
          {/* {console.log(buyers)} */}
          {orders?.map((o, i) => {
            return (
              <div id="cart" className="section-p1">
                <button
                  className="normal mb-3"
                  onClick={() => {
                    getuser(o.buyer._id);
                    setBtn(!btn);
                  }}
                >
                  See buyer
                </button>
                <button
                  className="normal mx-2"
                  // disabled={status !== "Delivered" || status !== "canceled"}
                  onClick={(e) => deleteOrder(e, o?._id, o?.status)}
                >
                  Delete Order
                </button>
                <div className={`mb-3 ${btn ? "d-block" : "d-none"}`}>
                  <h3>Buyer Details</h3>
                  <p>Name : {name}</p>
                  <p>Email: {email}</p>
                  <p>Phone: {phone}</p>
                  <p>Address: {address}</p>
                </div>
                <table width="100%">
                  <thead>
                    <tr>
                      <td>{i + 1}</td>
                      <td>Image</td>
                      <td>Product</td>
                      <td>Price</td>
                      <td>Quantity</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o?._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>Payment</td>
                    </tr>
                  </thead>
                  <tbody>
                    {o?.products?.map((p, j) => (
                      <tr key={j}>
                        <td>{j + 1}</td>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?.id}`}
                            alt=""
                          />
                        </td>
                        <td>{p?.name}</td>
                        <td>
                          {p?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                        <td>{p?.quantity}</td>
                        <td>{o?.status}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
