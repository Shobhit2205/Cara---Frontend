import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import "./CSS/Contact.css";
import p1 from "../Components/Assests/people/1.png";
import p2 from "../Components/Assests/people/2.png";
import p3 from "../Components/Assests/people/3.png";
import NewsLetter from "../Components/Layout/NewsLetter/NewsLetter";
import toast from "react-hot-toast";
import axios from "axios";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/contact/message`,
        { name, email, subject, message }
      );

      if (data?.success) {
        toast.success(data?.message);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in sending message");
    }
  };
  return (
    <Layout
      title="Contact us - Cara"
      description="Contact Cara"
      author="shobhit pandey"
    >
      <div>
        <section id="page-header" className="about-header">
          <h2>#Let's_Talk</h2>
          <p>LEAVE A MESSAGE We love to hear from you</p>
        </section>
        <section id="contact-details" className="section-p1">
          <div className="details">
            <span>GET IN TOUCH</span>
            <h2>Visit one of our agency location or contact us today</h2>
            <h3>Head Offfice</h3>
            <div>
              <li>
                <i className="fa fa-map" />
                <p>New Delhi - India</p>
              </li>
              <li>
                <i className="fa fa-envelope" />
                <p>shobhitpandey2205@gmail.com</p>
              </li>
              <li>
                <i className="fa fa-phone" />
                <p>+91 8287711504</p>
              </li>
              <li>
                <i className="fa fa-clock-o" />
                <p>Monday to Saturday: 9.00am to 16.00pm</p>
              </li>
            </div>
          </div>
          <div className="map">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448181.16374062485!2d76.81306192555238!3d28.64727993580379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1653905599640!5m2!1sen!2sin"
              width={600}
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
        <section id="form-details">
          <form action>
            <span>LEAVE A MESSAGE</span>
            <h2>We love to hear from you</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              cols={30}
              rows={10}
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button className="normal" onClick={(e) => sendMessage(e)}>
              Submit
            </button>
          </form>
          <div className="people">
            <div>
              <img src={p1} alt="" />
              <p>
                <span>William Smith</span> Senior Marketing Manager <br />
                Phone: +000 123 000 77 88 <br />
                Email: contact@example.com
              </p>
            </div>
            <div>
              <img src={p2} alt="" />
              <p>
                <span>Emma Stone</span> Senior Marketing Manager <br />
                Phone: +000 123 000 77 88 <br />
                Email: contact@example.com
              </p>
            </div>
            <div>
              <img src={p3} alt="" />
              <p>
                <span>John Doe</span> Senior Marketing Manager <br />
                Phone: +000 123 000 77 88 <br />
                Email: contact@example.com
              </p>
            </div>
          </div>
        </section>
      </div>
      <NewsLetter />
    </Layout>
  );
};

export default Contact;
