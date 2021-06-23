import React from "react";
import { Link } from "react-router-dom";

export default function MyCourseCard({
  course_name,
  enrollkey,
  courseid,
  is_freeze,
  payment,
   event
}) {
  return (
    <Link to={!event.is_freeze ? `#` : `/audiencedashboard/envetdetails/${event.id}`}>
      <div
        className={
          !event.is_freeze ? `st_grid_card_manage freezeCard` : `st_grid_card_manage`
        }
      >
        <div className="st_grid_card_mg_head">
          {/*<h3>25 JUNE 2021</h3>*/}
          <h3>{event.event_date}</h3>
          <h3>{event.event_start}</h3>
          <h3 className="label">{event.event_label}</h3>
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
          <h3>{event.event_name}</h3>
          <h3>{event.event_description}</h3>
          <h3>{event.event_type}</h3>
          <h3>{event.event_mode.event_mode_name}</h3>
          {/* {payment ? (
            <h4>Enrelled via online payment</h4>
          ) : enrollkey ? (
            <h4>Enrolled Key : {enrollkey}</h4>
          ) : (
            ""
          )} */}
          {event.is_freeze ? <p className="freezep">Event freezed</p> : ""}
          {/* <div className="cs_st_tail">
            <h4 align={"right"}>
              <ReactTimeAgo date={Date.parse(created_at)} locale="en-US" />
            </h4>
          </div> */}
        </div>
        <div className="st_grid_card_mg_tail">
          <button>{event.event_price}</button>
          <button>JOIN EVENT</button>
        </div>
      </div>
    </Link>
  );
}
