import Axios from "axios";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function TcMaCourses({
  id,
  event_name,
  event_date,
  event_label,
  event_mode,
  short_description,
  event_start,
  event_type,
  is_freeze,
}) {
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const clk = () => {
    let choose = window.confirm("Are You Sure?");

    if (choose) {
      Axios.delete(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/deleteevent/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      ).then(() => {
        window.location.reload(false);
      });
    }
  };

  return (
    <div className={is_freeze ? "freeze course_card" : "course_card"}>
      <Link to={`/band/viewevent/${id}`}>
        <div className="cscard_head">
          <h1>{event_date || ""}</h1>
          <h1>{event_start || ""}</h1>
          <h2 className="label">{event_label || ""}</h2>
        </div>
      </Link>
      <Link to={`/band/viewevent/${id}`}>
        <div className="cscard_body">
          <div className="cscard_mid">
            <h2>{event_name || ""}</h2>
            <h3>{short_description || ""}</h3>
            <h4>{event_type || ""}</h4>
            <h5>{event_mode ? event_mode.event_mode_name : ""}</h5>
          </div>
        </div>
      </Link>
      <div className="cscard_bottom">
        <Link to={`/band/viewevent/${id}`}>
          <button>VIEW EVENT</button>
        </Link>
      </div>
    </div>
  );
}
