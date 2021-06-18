import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/dashboardHeader.css";
import AcDetails from "../utils/hooks/AcDetails";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function TeacherDashboardHeader() {
  const [teachProfilepic, profileDetails] = AcDetails();

  return (
    <div>
      <div className="profile_menu">
        <div className="pro_pic">
          <LazyLoadImage src={`${teachProfilepic}`} alt="" effect="blur" />
        </div>
        <div className="details">
          <h2>{`${profileDetails.name} ${profileDetails.lname}`}</h2>
        </div>
      </div>
      <div className="main_section">
        <div className="list">
          <ul>
            {/*<Link to="/teacherdashboard/teachermaindashboard/"><li><i className="fas fa-home"></i> My Dashboard</li></Link>*/}
            <Link to={"/"}>
              <li>HOME</li>
            </Link>
            <Link to="/teacherdashboard/managecourse/">
              <li>MY EVENTS</li>
            </Link>
            <Link to="/teacherdashboard/createsubject/">
              <li>CREATE EVENT</li>
            </Link>
            <Link to="/teacherdashboard/profilesettings/">
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
