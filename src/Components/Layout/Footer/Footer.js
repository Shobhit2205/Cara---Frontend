import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import app from "../../Assests/pay/app.jpg";
import play from "../../Assests/pay/play.jpg";
import pay from "../../Assests/pay/pay.png";
import logo from "../../Assests/logo.png";

const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <img className="logo" src={logo} alt="" />
        <h4>Contact</h4>
        <p>
          <strong>Address: </strong>ABC building, XYZ Road New Delhi
        </p>
        <p>
          <strong>Phone: </strong>011 2222 2222 / +91 1234 5678
        </p>
        <p>
          <strong>Hours: </strong>10:00 - 18:00, Mon - Sat
        </p>
        <div className="follow">
          <h4>Follow Us</h4>
          <div className="icon">
            <Link
              to="https://www.facebook.com/shobhit.pandey.315865"
              target="_blank"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </Link>
            <Link to="https://www.linkedin.com/in/shobhit2205/" target="_blank">
              <i className="fa-brands fa-linkedin"></i>
            </Link>
            <Link to="https://twitter.com/Shobhit_2205" target="_blank">
              <i className="fa-brands fa-x-twitter"></i>
            </Link>
            <Link to="https://www.instagram.com/shobhit_2205/" target="_blank">
              <i className="fa fa-instagram" />
            </Link>
          </div>
        </div>
      </div>
      <div className="col">
        <h4>About</h4>
        <Link to="/about">About us</Link>
        <Link to="/cart">Delivery Information</Link>
        <Link to="/policy">Privacy Policy</Link>
        <Link to="/policy">Terms &amp; Conditions</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="col">
        <h4>My Account</h4>
        <Link to="/cart">View Cart</Link>
        <Link to="/cart">My Wishlist</Link>
        <Link to="/dashboard/user/orders">Track My Order</Link>
        <Link to="/contact">Help</Link>
      </div>
      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img className="app" src={app} alt="" />
          <img className="app" src={play} alt="" />
        </div>
        <p>Secured Payment Gateways</p>
        <img src={pay} alt="" />
      </div>
      <div className="copyright">
        <p>© 2021 | Cara | All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
