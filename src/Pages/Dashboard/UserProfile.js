import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/Menu/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import "../CSS/UserProfile.css";

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();
  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, password, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setPassword(password);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout
      title="Dashboard - Profile"
      description="User Profile Cara"
      author="shobhit pandey"
    >
      <div className="userProfile-container">
        <div className="left">
          <UserMenu />
        </div>
        <div className="right">
          <section id="update-form">
            <form onSubmit={handleSubmit}>
              <span>Get Crazy Deals</span>
              <h2>Update Profile</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="E-mail"
                required
                disabled
              />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
              />
              <input
                type="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="Phone No."
                required
              />
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Address"
                required
              />
              <button className="normal">Update Profile</button>
            </form>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
