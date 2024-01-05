import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./Components/Layout/Routes/Private";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminRoute from "./Components/Layout/Routes/AdminRoute";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Orders from "./Pages/Admin/Orders";
import UserProfile from "./Pages/Dashboard/UserProfile";
import OrderUser from "./Pages/Dashboard/OrderUser";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import SearchPage from "./Pages/SearchPage";
import SingleProductDetail from "./Pages/SingleProductDetail";
import CategoryProduct from "./Pages/CategoryProduct";
import CartPage from "./Pages/CartPage";

function App(props) {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/categories/:slug" element={<CategoryProduct />} />
        <Route path="/product/:slug/:id" element={<SingleProductDetail />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<OrderUser />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/all-products" element={<Products />} />
          <Route path="admin/categories" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route
            path="admin/product/update-product/:slug/:id"
            element={<UpdateProduct />}
          />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<Orders />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
