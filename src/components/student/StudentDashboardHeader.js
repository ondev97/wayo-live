import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserStatus from "../../utils/hooks/UserStatus";
import logo1 from "../../img/Logo_1.png";

export default function StudentDashBoardHeader() {
  const { initialState } = useSelector((state) => state.StudentDetails);
  const { log, hadelLogOut } = UserStatus(); //custom hook

  if (!log) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="logo">
        <Link to={"#"} style={{ textDecoration: "none", height: "30px" }}>
          {" "}
          <img src={logo1} alt="logo" />{" "}
        </Link>
      </div>
      <div className="profile_menu">
        <div className="pro_pic">
          <LazyLoadImage
            src={`${initialState && `${initialState.user_image}`}`}
            alt=""
            effect="blur"
          />
        </div>
        <div className="details">
          <h2>
            {initialState && initialState.user.first_name}{" "}
            {initialState && initialState.user.last_name}
          </h2>
        </div>
      </div>
      <div className="main_section">
        <div className="list">
          <ul>
            <Link to="/audiencedashboard/maindashboard/">
              <li>ALL EVENTS</li>
            </Link>
            <Link to="/audiencedashboard/userguide/">
              <li>USER GUIDE</li>
            </Link>
            <Link to="/audiencedashboard/contact/">
              <li>CONTACT US</li>
            </Link>
            <Link to="/audiencedashboard/myprofile/">
              <li>MY PROFILE</li>
            </Link>
            <li onClick={hadelLogOut} style={{ border: "none" }}>
              LOGOUT
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
