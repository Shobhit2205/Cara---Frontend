import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/Menu/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../Context/auth";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/get-all-users`
      );
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong in getting all users");
    }
  };

  useEffect(() => {
    if (auth?.token) getAllUsers();
  }, [auth?.token]);
  return (
    <Layout title="Dashboard - Users">
      <div className="admin-container">
        <div className="left">
          <AdminMenu />
        </div>
        <div className="right">
          <h1>Users</h1>
          <section id="cart" className="section-p1">
            <table width="100%">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Address</td>
                  <td>Phone</td>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td style={{ whiteSpace: "pre-wrap" }}>{u.address}</td>
                    <td>{u.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
