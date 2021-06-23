import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import wayo from ".././img/wayo.jpg";

export default function ModelsCourseDescri({ id, moduleData }) {
  return (
    <div className="colCourseView">
      {/*mobile lists */}
      <div className="mobile_list">
        <div className="hammenulist">
          <button>
            <i className="fas fa-bars"></i>
          </button>
          <div className="listmob">
            <ul>
              <Link to={`/band/ticket/genticket/${id}`}>
                <li>
                  <i className="fas fa-caret-right"></i> Generate Tickets
                </li>
              </Link>
              <Link to={`/band/ticket/viewticket/${id}`}>
                <li>
                  <i className="fas fa-caret-right"></i> View Tickets
                </li>
              </Link>
              <Link to={`/band/addaudience/${id}`}>
                <li>
                  <i className="fas fa-caret-right"></i> Add Audience
                </li>
              </Link>
              <Link to={`/band/viewaudience/${id}`}>
                <li>
                  <i className="fas fa-caret-right"></i> View Audience
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="course_desc_head tc_course_desc_head">
        <div className="menulist">
          <ul>
            <Link to={`/band/ticket/genticket/${id}/`}>
              <li>
                <i className="fas fa-caret-right"></i> Generate Tickets
              </li>
            </Link>
            <Link to={`/band/ticket/viewticket/${id}/`}>
              <li>
                <i className="fas fa-caret-right"></i> View Tickets
              </li>
            </Link>
            <Link to={`/band/addaudience/${id}`}>
              <li>
                <i className="fas fa-caret-right"></i> Add Audience
              </li>
            </Link>
            <Link to={`/band/viewaudience/${id}`}>
              <li>
                <i className="fas fa-caret-right"></i> View Audience
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="course_desc_body tc_course_desc_body">
        <div className="card_of_course">
          <div className="course_pic">
            <LazyLoadImage
              src={moduleData.event_cover}
              alt="band logo"
              effect="blur"
            />
            <div className="cos_options"></div>
          </div>
          {/* <div className="course_detail">
            <h2>{courseDetails.course_name}</h2>
            {courseDetails.course_description !== "null" ? (
              <div className="course_short_desc">
                <h3>Course Description</h3>
                <p>{courseDetails.course_description}</p>
              </div>
            ) : (
              ""
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}
