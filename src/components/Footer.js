import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/footer.css";
import "../assets/css/mediaFiles/footermedia.css";
import ftimg from "../img/Logo_1.png";

export default function Footer() {
  const { pathname } = useLocation();
  const mainRoute = [
    "/",
    "/about",
    "/allsubjects",
    "/signup",
    "/passwordreset",
    "/guidelines",
    "/features",
    "/password-reset-confirm",
  ];
  const secRoute = ["/upcomingevents", "/contact"];

  if (mainRoute.includes(pathname)) {
    return "";
  }
  return (
    <div className="footer_main">
      {secRoute.includes(pathname) ? (
        <div className="footer_mid">
          <div className="footer_column">
            <div className="lg">
              <img src={ftimg} alt="footer" />
            </div>
            <div className="ab">
              <p>AN EXPERIENCE BEYOND MUSIC</p>
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
              <li>
                <Link to="/upcomingevents">UPCOMING EVENTS</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className="small_footer"
        style={
          !secRoute.includes(pathname)
            ? { borderTop: "none" }
            : { borderTop: "1px solid #d5d5d5" }
        }
      >
        <h3>
          COPYRIGHT © WAYO | PROUDLY POWERED BY
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
