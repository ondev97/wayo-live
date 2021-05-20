import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/footer.css";
import "../assets/css/mediaFiles/footermedia.css";
import ftimg from "../img/Logo_1.png";

export default function Footer() {
  let location = useLocation();
  if (location.pathname === "/") {
    return "";
  }
  return (
    <div className="footer_main">
      <div className="footer_mid">
        <div className="footer_column">
          <div className="lg">
            <img src={ftimg} alt="footer" />
          </div>
          <div className="ab">
            <p>
              ශ්‍රී ලාංකීය දු දරුවන්ගේ අධ්‍යාපනය වෙනුවෙන් නිරතුරුවම කැපවුන
              ජාතිකපාසල හරහා ඔබගේ විෂයට අදාල ලංකාවේ ප්‍රවීන ගුරුවරුන් සමග
              සම්බන්ද වෙමින් නිවසේ සිට සුරක්ෂිතව අධ්‍යාපන කටයුතු සිදු කරන්න.
            </p>
          </div>
        </div>
        <div className="footer_column">
          <h2>Follow Us</h2>
          <ul className="scial">
            <li>
              <i className="fab fa-facebook-square"></i>
            </li>
            <li>
              <i className="fab fa-twitter-square"></i>
            </li>
            <li>
              <i className="fab fa-linkedin"></i>
            </li>
          </ul>
        </div>
        <div className="footer_column">
          <h2>Explore</h2>
          <ul className="links">
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li> */}
            <li>
              <Link to="#">Guidelines</Link>
            </li>
            <li>
              <Link to="#">Our Features</Link>
            </li>
            <li>
              <Link to="/allteachers">Teachers</Link>
            </li>
            <li>
              <Link to="/allsubjects">Subjects</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="small_footer">
        <h3>
          COPYRIGHT © HDOLSET | PROUDLY POWERED BY
          <span>
            {
              <Link to="//helamid.com" target="_blank">
                &nbsp;HELAMID
              </Link>
            }
          </span>
        </h3>
      </div>
    </div>
  );
}
