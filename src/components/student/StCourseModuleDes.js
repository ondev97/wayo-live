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
    <div className="colCourseView">
      <div className="course_desc_head">
        <div className="course_pic">
          <LazyLoadImage
            effect="blur"
            width="100%"
            height="100%"
            style={{ opacity: "1" }}
            src={`${courseData.course_cover}`}
            alt=""
          />
          {/*<div className="cos_options">*/}
          {/*    <button><i className="fas fa-exclamation"></i><span>Unenroll Me</span></button>*/}
          {/*</div>*/}
        </div>
        <h2>{courseData.course_name}</h2>
        <h3>
          <ReactTimeAgo
            date={Date.parse(courseData.created_at)}
            locale="en-US"
          />
        </h3>
      </div>
      <div className="course_desc_body">
        <div className="course_short_desc st_course_short_desc">
          <h3>Course Description</h3>
          <p>
            {courseData.course_description ||
            courseData.course_description !== "null"
              ? courseData.course_description
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
