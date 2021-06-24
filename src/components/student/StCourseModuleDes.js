import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import ReactTimeAgo from "react-time-ago";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function StCourseModuleDes() {
  const usDetails = useSelector((state) => state.accountDetails);
  const [courseData, setcourseData] = useState({});
  const { id } = useParams();

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/audienceintheevent/${id}/`,
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

  console.log(courseData);

  return (
    <div className="live_audience">
      <div className="live_audience_head">
        <h1>LIVE AUDIENCE</h1>
        <h1>{courseData ? courseData.length : ""}</h1>
      </div>
      <div className="live_audience_body">
        {courseData.length > 0
          ? courseData.map((data) => (
              <div className="audience_row" key={data.id}>
                <div className="audience_pro_pic">
                  <img src={data.user_image} />
                </div>
                <div className="audience_names">
                  <h1>{data.user.first_name}</h1>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
