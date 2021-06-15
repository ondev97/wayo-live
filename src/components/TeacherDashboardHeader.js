import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/dashboardHeader.css";
import AcDetails from "../utils/hooks/AcDetails";
import logo1 from "../img/Logo_1.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function TeacherDashboardHeader() {
  const [sidebar, setsidebar] = useState(true);

  const [teachProfilepic, profileDetails] = AcDetails();

  const showSidebar = () => setsidebar(!sidebar);

  return (
    <div>
      <div className="logo">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          {" "}
          <img src={logo1} alt="image" />{" "}
        </Link>
      </div>
      <div className="profile_menu">
        <div className="pro_pic">
          <LazyLoadImage src={`${teachProfilepic}`} alt="" effect="blur" />
        </div>
        <div className="details">
          <h2>{`${profileDetails.name} ${profileDetails.lname}`}</h2>
          <h3>Instructor</h3>
        </div>
      </div>
      <div className="main_section">
        <div className="list">
          <ul>
            {/*<Link to="/teacherdashboard/teachermaindashboard/"><li><i className="fas fa-home"></i> My Dashboard</li></Link>*/}
            <Link to={"/"}>
              <li>
                <i className="fas fa-home"></i>Home
              </li>
            </Link>
            <Link to="/teacherdashboard/managecourse/">
              <li>
                <i className="fas fa-graduation-cap"></i>Manage Subject
              </li>
            </Link>
            <Link to="/teacherdashboard/createsubject/">
              <li>
                <i className="fas fa-school"></i>Create Subject
              </li>
            </Link>
            <Link to="/teacherdashboard/profilesettings/">
              <li>
                <i className="far fa-user-circle"></i>My Profile
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
