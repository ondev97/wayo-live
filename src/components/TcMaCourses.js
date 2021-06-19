import Axios from "axios";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function TcMaCourses({
  id,
  subject_name,
  subject_cover,
  author,
  created_at,
  short_description,
  class_type,
  subject_type,
}) {
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const clk = () => {
    let choose = window.confirm("Are You Sure?");

    if (choose) {
      Axios.delete(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/deletesubject/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      ).then(() => {
        window.location.reload(false);
      });
    }
  };

  return (
    <div className="course_card">
      <Link to={`/teacherdashboard/viewcourse/${id}`}>
        <div className="cscard_head">
          <h1>EVENT DATE</h1>
          <h1>EVENT START TIME</h1>
          <h2 className="label">EVENT LABEL</h2>
        </div>
        <div className="cscard_body">
          <div className="cscard_mid">
            <h2>EVENT NAME</h2>
            <h3>EVENT DESCRIPTION</h3>
            <h4>EVENT TYPE</h4>
            <h5>EVENT CATEGORY</h5>
          </div>
        </div>
        <div className="cscard_bottom">
          <button>EDIT EVENT</button>
          <button>DELETE EVENT</button>
        </div>
      </Link>
    </div>
  );
}
