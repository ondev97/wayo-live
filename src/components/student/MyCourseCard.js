import React from "react";
import { Link } from "react-router-dom";

export default function MyCourseCard({
  course_name,
  enrollkey,
  courseid,
  is_freeze,
  payment,
}) {
  return (
    <Link to={is_freeze ? `#` : `/studentdashboard/envetdetails/${courseid}`}>
      <div
        className={
          is_freeze ? `st_grid_card_manage freezeCard` : `st_grid_card_manage`
        }
      >
        <div className="st_grid_card_mg_head">
          <h3>25 JUNE 2021</h3>
          <h3>06.30 PM</h3>
          <h3 className="label">EVENT LABEL</h3>
        </div>
        {/* <div className="st_cos_manage_num">
          <h3>{no < 10 ? `0${no + 1}` : no}</h3>
        </div> */}
        {/*<div className="st_cos_options_mna">*/}
        {/*    <h3><i className="fas fa-chevron-circle-up"></i></h3>*/}
        {/*    <div className="st_options_manage">*/}
        {/*        <ul>*/}
        {/*            <Link to={`#`}>*/}
        {/*                <li><i className="fas fa-exclamation"></i>Unenrolled Me</li>*/}
        {/*            </Link>*/}
        {/*        </ul>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className="st_grid_card_mg_body">
          <h3>EVENT NAME</h3>
          <h3>EVENT DESCRIPTION</h3>
          <h3>EVENT TYPE</h3>
          <h3>EVENT CATEGORY</h3>
          {/* {payment ? (
            <h4>Enrelled via online payment</h4>
          ) : enrollkey ? (
            <h4>Enrolled Key : {enrollkey}</h4>
          ) : (
            ""
          )} */}
          {is_freeze ? <p className="freezep">Course freezed</p> : ""}
          {/* <div className="cs_st_tail">
            <h4 align={"right"}>
              <ReactTimeAgo date={Date.parse(created_at)} locale="en-US" />
            </h4>
          </div> */}
        </div>
        <div className="st_grid_card_mg_tail">
          <button>EVENT FEE</button>
          <button>JOIN EVENT</button>
        </div>
      </div>
    </Link>
  );
}
