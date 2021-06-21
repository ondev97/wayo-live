import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/header.css";
import "../assets/css/mediaFiles/headermedia.css";
import { AnimatePresence, motion } from "framer-motion";
import ProfileDetails from "../utils/hooks/ProfileDetails";
import logo from "../img/Logo_1.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import wayo from "../img/wayo.jpg";

export default function Header({ acDetails }) {
  const [isham, setisham] = useState(false);
  const profileDetails = ProfileDetails(acDetails);
  let location = window.location.pathname;

  const mobnavani = {
    visible: {
      opacity: 1,
      transition: { duration: 0.75, ease: "easeOut" },
    },
    hidden: {
      opacity: 0,
      transition: { duration: 1, ease: "easeIn" },
    },
  };
  const mainRoute = [
    "/",
    "/about",
    "/contact",
    "/allteachers",
    "/allsubjects",
    "/signup",
    "/passwordreset",
    "/guidelines",
    "/features",
  ];
  const hambutton = () => {
    setisham(!isham);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    if (isham) {
      setisham(!isham);
    }
  }, [pathname]);

  const headerProPic = () => {
    if (acDetails.key) {
      if (acDetails.is_band) {
        return (
          <div className="pro_pic">
            <div className="ac_details_header">
              <h3 style={{ textTransform: "uppercase" }}>WAYOLIVE</h3>
            </div>
            <Link to="band/managecourse">
              <div className="img">
                <LazyLoadImage src={wayo} alt="" effect="blur" />
              </div>
            </Link>
          </div>
        );
      } else {
        return (
          <div className="pro_pic">
            <div className="ac_details_header">
              <h3 style={{ textTransform: "uppercase" }}>
                {profileDetails.userName}
              </h3>
            </div>
            <Link to="audiencedashboard/maindashboard">
              <div className="img">
                <LazyLoadImage
                  src={`${profileDetails.pic}`}
                  alt=""
                  effect="blur"
                />
              </div>
            </Link>
          </div>
        );
      }
    } else {
      return (
        <div className="buttons">
          <Link to="/signup">
            <button>Register</button>
          </Link>
          {/* <Link to="/stsignup">
                        <button>REGISTER</button>
                    </Link> */}
        </div>
      );
    }
  };

  if (mainRoute.includes(location)) {
    return (
      <div className="header-nav">
        <nav>
          <div className="column">
            <div className="hlogo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="column">
            <div className="navigation">
              <ul>
                <li>
                  <Link to="/">HOME</Link>
                </li>
                <li>
                  <Link to="#">USER GUIDE</Link>
                </li>
                <li>
                  <Link to="#">CONTACT US</Link>
                </li>
                <li>
                  <Link to="#">UPCOMING EVENTS</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="column">{headerProPic()}</div>
          <div className="ham">
            <button className="hambeggermenu" onClick={hambutton}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>
        <AnimatePresence exitBeforeEnter>
          {isham ? (
            <motion.div
              className="hammenu"
              variants={mobnavani}
              animate="visible"
              initial="hidden"
              exit="hidden"
            >
              <div className="menham">
                <ul>
                  <Link to="/">
                    <li>HOME</li>
                  </Link>
                  <Link to="#">
                    <li>USER GUIDE</li>
                  </Link>
                  <Link to="#">
                    <li>CONTACT US</li>
                  </Link>
                  <Link to="#">
                    <li>UPCOMING EVENTS</li>
                  </Link>
                </ul>
                <div className="butham">{headerProPic()}</div>
              </div>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    );
  } else {
    return "";
  }
}
