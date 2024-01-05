import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import "./CSS/CartPage.css";
import { useAuth } from "../Context/auth";
import { useCart } from "../Context/cart";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import slugify from "slugify";

const CartPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
      toast.error("Error in payment Gateway!");
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      let user = auth.user;
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { cart, nonce, user }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment is Successfull");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      // eslint-disable-next-line array-callback-return
      cart?.map((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting total price");
    }
  };

  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const increaseProductQuantity = (id) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item.id === id);
      mycart[index].quantity += 1;

      setCart([...mycart]);
      localStorage.setItem("cart", JSON.stringify([...mycart]));
    } catch (error) {
      console.log(error);
      toast.error("Not able to increase quantity");
    }
  };
  const decreaseProductQuantity = (id) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item.id === id);
      mycart[index].quantity -= 1;

      setCart([...mycart]);
      localStorage.setItem("cart", JSON.stringify([...mycart]));
    } catch (error) {
      console.log(error);
      toast.error("Not able to increase quantity");
    }
  };

  return (
    <Layout title="Cart - Cara" author="Shobhit Pandey">
      <div>
        <section id="page-header" className="about-header">
          <h2>{`Hello ${auth?.token && auth?.user?.name}`}</h2>
          <p>
            {cart?.length > 1
              ? `You have ${cart.length} products in your cart${
                  auth?.token ? "" : ", Login to checkOut"
                }`
              : "Your cart is empty!"}
          </p>
        </section>
        <section id="cart" className="section-p1">
          <table width="100%">
            <thead>
              <tr>
                <td>REMOVE</td>
                <td>IMAGE</td>
                <td>PRODUCT</td>
                <td>PRICE</td>
                <td>QUANTITY</td>
                <td>SUBTOTAL</td>
              </tr>
            </thead>
            <tbody>
              {cart?.map((p) => (
                <tr key={p?.id}>
                  <td>
                    <Link onClick={() => removeCartItem(p.id)}>
                      <i className="fa fa-times-circle" />
                    </Link>
                  </td>
                  <td>
                    <img
                      onClick={() => {
                        let slug = slugify(p.name);
                        navigate(`/product/${slug}/${p.id}`);
                      }}
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`}
                      alt=""
                    />
                  </td>
                  <td>{p?.name}</td>
                  <td>
                    {p?.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td>
                    <button
                      className="qty"
                      disabled={p.quantity <= 1}
                      onClick={() => {
                        decreaseProductQuantity(p?.id);
                      }}
                    >
                      -
                    </button>
                    <input type="number" value={p?.quantity} disabled />
                    <button
                      className="qty"
                      disabled={p?.quantity === p?.maxQuantity}
                      onClick={() => {
                        increaseProductQuantity(p?.id);
                      }}
                    >
                      +
                    </button>
                  </td>

                  <td>
                    {(p?.price * p?.quantity).toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section id="cart-add" className="section-p1">
          <div id="coupon">
            <h3>Apply Coupon</h3>
            <div>
              <input type="text" placeholder="Enter Your Coupon" />
              <button className="normal">Apply</button>
            </div>
          </div>
          <div id="subtotal">
            <h3>Cart Totals</h3>
            <table>
              <tbody>
                <tr>
                  <td>Card Subtotal</td>
                  <td>{totalPrice()}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>{totalPrice()}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <p>{auth?.user?.address}</p>
                <button
                  className="normal"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>

                <div className="my-2">
                  {!clientToken || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                          googlePay: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="normal"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing...." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="normal"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="normal"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Login to CheckOut
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CartPage;
