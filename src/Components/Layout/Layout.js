import React from "react";
import Footer from "./Footer/Footer.js";
import Header from "./Header/Header.js";
import Helmet from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App",
  description: "Mern stack Project",
  keywords: "Mern, mongoDb, Reactjs, Expressjs, Nodejs, Ecommerce app",
  author: "shobhit pandey",
};

export default Layout;
