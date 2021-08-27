import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/header.css";
import "../assets/css/mediaFiles/headermedia.css";
import { AnimatePresence, motion } from "framer-motion";
import ProfileDetails from "../utils/hooks/ProfileDetails";
import logo from "../img/Logo_1.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
    "/upcomingevents",
    "/allsubjects",
    "/signup",
    "/passwordreset",
    "/guidelines",
    "/features",
    "/password-reset-confirm",
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
              <h3 style={{ textTransform: "uppercase" }}>
                {profileDetails.userName}
              </h3>
            </div>
            <Link to="band/allevents">
              <div className="img">
                <LazyLoadImage
                  src={`${profileDetails.pic}`}
                  alt="badn_profile"
                  effect="blur"
                />
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
                  alt="audience_profile"
                  effect="blur"
                />
              </div>
            </Link>
          </div>
        );
      }
    } else {
      if (location !== "/signup") {
        return (
          <div className="buttons">
            <Link to="/signup">
              <button>Register</button>
            </Link>
          </div>
        );
      }
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
                {/* <li>
                  <Link to="#">ABOUT US</Link>
                </li> */}
                <li>
                  <Link to="/upcomingevents">UPCOMING EVENTS</Link>
                </li>
                <li>
                  <Link to="/contact">CONTACT US</Link>
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
                  {/* <Link to="#">
                    <li>ABOUT US</li>
                  </Link> */}
                  <Link to="/upcomingevents">
                    <li>UPCOMING EVENTS</li>
                  </Link>
                  <Link to="/contact">
                    <li>CONTACT US</li>
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
  } else if (location.indexOf("/password-reset-confirm") > -1) {
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
                {/* <li>
                  <Link to="#">ABOUT US</Link>
                </li> */}
                <li>
                  <Link to="/contact">CONTACT US</Link>
                </li>
                <li>
                  <Link to="/upcomingevents">UPCOMING EVENTS</Link>
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
                  {/* <Link to="#">
                    <li>ABOUT US</li>
                  </Link> */}
                  <Link to="/contact">
                    <li>CONTACT US</li>
                  </Link>
                  <Link to="/upcomingevents">
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
