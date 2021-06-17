import React from "react";
import { Link, useParams } from "react-router-dom";
import wayo from "../../img/wayo.jpg";
import "../../assets/css/student/evntDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  return (
    <>
      <div className="ful_manage_course">
        <div className="st_top_manage_body">
          <div className="st_mange_cos_body">
            <div className="pagetop">
              <h1>{"ALL BANDS > ALL EVENTS > EVENT NAME"}</h1>
            </div>
          </div>
          <div className="event_header">
            <div className="event_row">
              <div className="event_column">
                <div className="event_head">
                  <h2>25 JUNE 2021</h2>
                  <h2>06.30 PM</h2>
                  <h3 className="label">EVENT LABEL</h3>
                </div>
              </div>
              <div className="event_column">
                <div className="event_dis_col">
                  <h1>"Jeewithe" Live Stream for infor Sri Lanka</h1>
                  <h1>Event Description</h1>
                  <h1>Event Type</h1>
                  <h1>Event CATEGORY</h1>
                </div>
              </div>
              <div className="event_column">
                <Link to={`#`}>
                  <button>EVENT FEE</button>
                </Link>
                <Link to={`/studentdashboard/stmodules/${id}`}>
                  <button>JOIN EVENT</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="event_details">
            <h2>EVENT DETAILS</h2>
            <div className="event_description">
              <div className="event_pic_col">
                <div className="event_pic_sec">
                  <img src={wayo} alt="band" />
                </div>
              </div>
              <div className="event_dis_col">
                <div className="event_dis_section">
                  <div className="event_dis_row">
                    <h2>BAND</h2>
                    <h2>
                      <span>: BAND</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT NAME</h2>
                    <h2>
                      <span>: EVENT NAME</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT Description</h2>
                    <h2>
                      <span>: EVENT Description</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT LABEL</h2>
                    <h2>
                      <span>: EVENT LABEL</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT TYPE</h2>
                    <h2>
                      <span>: EVENT TYPE</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT CATEGORY</h2>
                    <h2>
                      <span>: EVENT CATEGORY</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT DATE</h2>
                    <h2>
                      <span>: EVENT DATE</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT START TIME</h2>
                    <h2>
                      <span>: EVENT START TIME</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT END TIME</h2>
                    <h2>
                      <span>: EVENT END TIME</span>
                    </h2>
                  </div>

                  <div className="event_dis_row">
                    <h2>EVENT DURATION</h2>
                    <h2>
                      <span>: EVENT DURATION</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT FEE</h2>
                    <h2>
                      <span>: EVENT FEE</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
