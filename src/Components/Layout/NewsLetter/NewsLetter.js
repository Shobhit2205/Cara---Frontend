import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const newsLetterSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/contact/newsLetter`,
        { email }
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to subscribe!");
    }
  };

  return (
    <div>
      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Sign Up For Newsletter</h4>
          <p>
            Get E-mail updates about our latest shop and{" "}
            <span>special offers.</span>
          </p>
          <div className="form">
            <input
              type="text"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="normal" onClick={(e) => newsLetterSignup(e)}>
              Sign Up
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsLetter;
