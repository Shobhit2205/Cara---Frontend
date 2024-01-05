import React, { useEffect } from "react";
import Layout from "../Components/Layout/Layout";
// import Marquee from "react-marquee-slider";
import { Link } from "react-router-dom";
import "./CSS/About.css";
import a6 from "../Components/Assests/about/a6.jpg";
import video from "../Components/Assests/about/1.mp4";
import Feature from "../Components/Layout/Features/Feature";
import NewsLetter from "../Components/Layout/NewsLetter/NewsLetter";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout
      title="About us - Ecommerce App"
      description="About Ecommerce app"
      author="shobhit pandey"
    >
      <div>
        <section id="page-header" className="about-header">
          <h2>#KnowUs</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </section>
        <section id="about-head" className="section-p1">
          <img src={a6} alt="" />
          <div>
            <h2>Who We Are?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quis
              mollitia quaerat eos. Aliquam aspernatur provident magnam animi
              voluptatibus deserunt, et quam dolorem culpa, quos illo! Omnis ea
              sequi modi dolore illo distinctio aut maiores quis deserunt
              impedit optio quia explicabo ratione dolores, necessitatibus nemo
              voluptatum delectus officiis excepturi nesciunt.
            </p>
            <abbr title>
              Create stunning images with as much or as little control as you
              like thanks to a choice of Basic and Creative modes
            </abbr>
            <br />
            <br />
          </div>
        </section>
        <section id="about-app" className="section-p1">
          <h1>
            Download Our <Link to="/">App</Link> App
          </h1>
          <div className="video">
            <video autoPlay muted loop src={video} />
          </div>
        </section>
        <Feature />
        <NewsLetter />
      </div>
    </Layout>
  );
};

export default About;
