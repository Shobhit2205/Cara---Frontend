import React, { useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import SingleProduct from "../Components/SingleProduct/SingleProduct";
import { useSearch } from "../Context/search";

const SearchPage = () => {
  const [values] = useSearch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout
      title="Search Result - Cara"
      description="Search Cara"
      author="shobhit pandey"
    >
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>{`${values.results.length} Product Found`}</h6>
          <div className="pro-container">
            {values.results.map((p) => (
              <SingleProduct key={p._id} id={p._id} slug={p.slug} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
