import React, { useEffect } from "react";
import Layout from "../Components/Layout/Layout";

const Policy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout
      title="Policy - Cara"
      description="Policy Cara"
      author="shobhit pandey"
    >
      <h1 style={{ marginTop: "10vh" }}>Policy</h1>
    </Layout>
  );
};

export default Policy;
