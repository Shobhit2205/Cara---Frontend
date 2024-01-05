import React, { useState } from "react";
import p1 from "../../Components/Assests/people/1.png";
import p2 from "../../Components/Assests/people/2.png";
import p3 from "../../Components/Assests/people/3.png";
import Layout from "../../Components/Layout/Layout";
import "../CSS/Register.css";
import toast from "react-hot-toast"
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../Context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        setAuth({...auth, 
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
    <Layout title="Register">
      <section id="form-details">
        <form onSubmit={handleSubmit}>
          <span>Explore Crazy Deals</span>
          <h2>LogIn</h2>
          
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
          <button className="normal">LogIn</button>
          <div className="label">
            <div>Forgot Password? </div>
            <Link className="Link" to="/forgot-password">Reset here</Link>
          </div>
          <div className="label">
            <div>Doesn't have a account?</div>
            <Link className="Link" to="/register">Create Now</Link>
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
  )
}

export default Login
