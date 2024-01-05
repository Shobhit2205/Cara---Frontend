import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/Menu/UserMenu";
import { useAuth } from "../../Context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout
      title="Dashboard - Cara"
      description="Dashboard Cara"
      author="shobhit pandey"
    >
      <div className="admin-container">
        <div className="left">
          <UserMenu />
        </div>
        <div className="right">
          <h1>Dashboard</h1>
          <h3>Name : {auth?.user?.name}</h3>
          <h3>Email : {auth?.user?.email}</h3>
          <h3>Phone : {auth?.user?.phone}</h3>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
