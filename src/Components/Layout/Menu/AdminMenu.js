import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const AdminMenu = () => {
  return (
    <div className="admin-menu">
      <div className="menu">
        <Link className="menu-link" to="/dashboard/admin/users">
          Users
        </Link>
      </div>
      <div className="menu">
        <Link className="menu-link" to="/dashboard/admin/orders">
          Orders
        </Link>
      </div>
      <div className="menu">
        <Link className="menu-link" to="/dashboard/admin/categories">
          Categories
        </Link>
      </div>
      <div className="menu">
        <Link className="menu-link" to="/dashboard/admin/create-product">
          Create Product
        </Link>
      </div>
      <div className="menu">
        <Link className="menu-link" to="/dashboard/admin/all-products">
          All products
        </Link>
      </div>
    </div>
  );
};

export default AdminMenu;
