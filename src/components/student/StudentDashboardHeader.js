import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo1 from "../../img/Logo_1.png";

export default function StudentDashBoardHeader() {
  const { initialState } = useSelector((state) => state.StudentDetails);

  return (
    <div>
      <div className="logo">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          {" "}
          <img src={logo1} alt="logo" />{" "}
        </Link>
      </div>
      <div className="profile_menu">
        <div className="pro_pic">
          <LazyLoadImage
            src={`${initialState && `${initialState.profile_pic}`}`}
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
            <Link to={"/"}>
              <li>HOME</li>
            </Link>
            <Link to="/studentdashboard/maindashboard/">
              <li>ALL EVENTS</li>
            </Link>
            <Link to="#">
              <li>USER GUIDE</li>
            </Link>
            <Link to="/studentdashboard/contact/">
              <li>CONTACT US</li>
            </Link>
            <Link to="/studentdashboard/studentprofile/">
              <li>MY PROFILE</li>
            </Link>
            <Link to="#">
              <li>LOGOUT</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
