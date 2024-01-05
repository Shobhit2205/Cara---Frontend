import React, { useEffect } from "react";
import Banner from "../Components/Layout/Banner/Banner";
import Feature from "../Components/Layout/Features/Feature";
import Hero from "../Components/Layout/Hero/Hero";
import Layout from "../Components/Layout/Layout";
import NewsLetter from "../Components/Layout/NewsLetter/NewsLetter";
import ProductContainer from "../Components/ProductContainer/ProductContainer";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout title="Home - Cara" description="Home Cara" author="shobhit pandey">
      <Hero />
      <Feature />
      <ProductContainer />
      <NewsLetter />
      <Banner />
    </Layout>
  );
};

export default HomePage;
