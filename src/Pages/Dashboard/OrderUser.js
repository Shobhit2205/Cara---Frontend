import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/Menu/UserMenu";
import { useAuth } from "../../Context/auth";
import "../CSS/AdminDashboard.css";

const OrderUser = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const user = auth?.user;
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`,
        { user }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Orders");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);
  return (
    <Layout
      title="Dashboard- orders"
      description="Orders Cara"
      author="shobhit pandey"
    >
      <div className="admin-container">
        <div className="left">
          <UserMenu />
        </div>
        <div className="right">
          <h1>Orders</h1>
          <section id="cart" className="section-p1">
            <table width="100%">
              <thead>
                <tr>
                  <td>S. no</td>
                  <td>IMAGE</td>
                  <td>PRODUCT</td>
                  <td>PRICE</td>
                  <td>QUANTITY</td>
                  <td>Status</td>
                  <td>Payment</td>
                </tr>
              </thead>
              <tbody>
                {orders?.map((p, i) =>
                  p?.products?.map((o, j) => (
                    <tr key={i * orders.length + j}>
                      <td>{i * orders.length + j + 1}</td>
                      <td>
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${o?.id}`}
                          alt=""
                        />
                      </td>
                      <td>{o?.name}</td>
                      <td>
                        {o?.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                      <td>{o?.quantity}</td>
                      <td>{p?.status}</td>
                      <td>{p?.payment?.success ? "Success" : "Failed"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default OrderUser;
