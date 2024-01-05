import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import p1 from "../../Components/Assests/people/1.png";
import p2 from "../../Components/Assests/people/2.png";
import p3 from "../../Components/Assests/people/3.png";
import "../CSS/Register.css";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, NewPassword, answer }
      );
      if (res && res.data.success) {
        toast.success("Succesfully reset your password");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!");
    }
  };
  return (
    <Layout
      title="Forgot Password"
      description="Forgot Password Cara"
      author="shobhit pandey"
    >
      <section id="form-details">
        <form onSubmit={handleSubmit}>
          <span>Forgot password?</span>
          <h2>Reset Now</h2>

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
            value={NewPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            placeholder="password"
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
          <button className="normal">Reset Password</button>
          <div className="label">
            <Link className="Link" to="/login">
              LogIn
            </Link>
            <Link className="Link" to="/login">
              Register
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

export default ForgotPassword;
