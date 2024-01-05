import React from "react";
import AdminMenu from "../../Components/Layout/Menu/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Context/auth";
import "../CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout
      title="Dashboard - Admin Cara"
      description="Product Cara"
      author="shobhit pandey"
    >
      <div className="admin-container">
        <div className="left">
          <AdminMenu />
        </div>
        <div className="right">
          <h1>{auth?.user?.name}</h1>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
