import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="user-menu">
      <div className="menu">
        <Link className="menu-link" to="/dashboard/user/profile">
          Profile
        </Link>
      </div>
      <div className="menu">
        <Link className="menu-link" to="/dashboard/user/orders">
          Orders
        </Link>
      </div>
    </div>
  );
};

export default UserMenu;
