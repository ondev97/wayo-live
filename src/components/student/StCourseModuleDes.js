import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import ReactTimeAgo from "react-time-ago";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function StCourseModuleDes() {
  const usDetails = useSelector((state) => state.accountDetails);
  const [courseData, setcourseData] = useState({
    created_at: "2020-12-29T22:59:02.384639+05:30",
  });
  const { id } = useParams();

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/viewcourse/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setcourseData(res.data);
        })
        .catch((err) => {});
    }
  }, [usDetails]);

  return (
    <div className="live_audience">
      <div className="live_audience_head">
        <h1>LIVE AUDIENCE</h1>
        <h1>250</h1>
      </div>
      <div className="live_audience_body">
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME </h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
        <div className="audience_row">
          <div className="audience_pro_pic"></div>
          <div className="audience_names">
            <h1>USER NAME</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
