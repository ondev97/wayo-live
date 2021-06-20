import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../assets/css/dashboardHeader.css";
import AcDetails from "../utils/hooks/AcDetails";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UserStatus from "../utils/hooks/UserStatus";
import wayo from "../img/wayo.jpg";
import logo1 from "../img/Logo_1.png";

export default function TeacherDashboardHeader() {
  const [teachProfilepic, profileDetails] = AcDetails();
  const { log, hadelLogOut } = UserStatus(); //custom hook

  if (!log) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="logo">
        <Link to={"/"} style={{ textDecoration: "none", height: "30px" }}>
          {" "}
          <img src={logo1} alt="logo" />{" "}
        </Link>
      </div>
      <div className="profile_menu">
        <div className="pro_pic">
          <LazyLoadImage src={wayo} alt="" effect="blur" />
        </div>
        <div className="details">
          <h2>WAYO</h2>
        </div>
      </div>
      <div className="main_section">
        <div className="list">
          <ul>
            {/*<Link to="/teacherdashboard/teachermaindashboard/"><li><i className="fas fa-home"></i> My Dashboard</li></Link>*/}
            <Link to={"/"}>
              <li>HOME</li>
            </Link>
            <Link to="/band/managecourse/">
              <li>MY EVENTS</li>
            </Link>
            <Link to="/band/createevent/">
              <li>CREATE EVENT</li>
            </Link>
            <Link to="/band/profilesettings/">
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
