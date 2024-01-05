import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../Assests/logo.png";
import { useAuth } from "../../../Context/auth";
import toast from "react-hot-toast";
import Search from "../../Search/SearchInput.js";
import useCategory from "../../../Hooks/useCategory";
import { Badge } from "antd";
import { useCart } from "../../../Context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const [btn, setBtn] = useState(false);

  const handleLogOut = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout successfully!");
  };
  return (
    <div>
      <section id="header">
        <Link to="/">
          <img src={logo} className="logo" alt="" />
        </Link>
        <Search />
        <div>
          <ul id="navbar" className={`nav ${btn ? "open" : "close"}`}>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                to="/categories"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link
                      className="dropdown-item"
                      to={`/categories/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth.user ? (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <Link
                  // className="nav-link dropdown-toggle"
                  // href="#"
                  // role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link onClick={handleLogOut} to="/login">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li id="lg-bag">
              <Badge
                className={`badge ${btn ? "d-none" : ""}`}
                count={cart.length}
                showZero
              >
                <Link to="/cart">
                  <i className="fa fa-shopping-cart" />
                </Link>
              </Badge>
            </li>
            <Link to="/" id="close" onClick={() => setBtn(!btn)}>
              <i className="fa fa-times" />`
            </Link>
          </ul>
        </div>
        <div id="mobile" className={`${btn ? "d-none" : ""}`}>
          <Badge className="badge" count={cart.length} showZero>
            <Link to="/cart">
              <i className="fa fa-shopping-cart" />
            </Link>
          </Badge>
          <Link id="bar" onClick={() => setBtn(!btn)}>
            <i className="fa fa-bars" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Header;
