import React, { useState } from "react";
import p1 from "../../Components/Assests/people/1.png";
import p2 from "../../Components/Assests/people/2.png";
import p3 from "../../Components/Assests/people/3.png";
import Layout from "../../Components/Layout/Layout";
import "../CSS/Register.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout
      title="Register"
      description="Register Cara"
      author="shobhit pandey"
    >
      <section id="form-details">
        <form onSubmit={handleSubmit}>
          <span>New User Register</span>
          <h2>Sign Up</h2>
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
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            required
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
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            placeholder="Your Favourite Sport"
            required
          />
          <button className="normal">Sign up</button>
          <div className="label">
            <div>Already a user </div>
            <Link className="Link" to="/login">
              LogIn now
            </Link>
          </div>
        </form>
        <div className="people">
          <div>
            <img src={p1} alt="" />
            <p>
              <span>William Smith</span> Senior Marketing Manager <br />
              Phone: +000 123 000 77 88 <br />
              Email: contact@example.com
            </p>
          </div>
          <div>
            <img src={p2} alt="" />
            <p>
              <span>Emma Stone</span> Senior Marketing Manager <br />
              Phone: +000 123 000 77 88 <br />
              Email: contact@example.com
            </p>
          </div>
          <div>
            <img src={p3} alt="" />
            <p>
              <span>John Doe</span> Senior Marketing Manager <br />
              Phone: +000 123 000 77 88 <br />
              Email: contact@example.com
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
