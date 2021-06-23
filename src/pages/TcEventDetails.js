import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo2 from "../img/Logo_2.jpeg";
import "../assets/css/student/evntDetails.css";
import Axios from "axios";
import { useSelector } from "react-redux";

export default function TcEventDetails() {
  const { id } = useParams();
  const [eventDetail, seteventDetail] = useState({});
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  useEffect(() => {
    if (usDetails.key) {
      Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/show/viewevent/${id}/`, {
        headers: { Authorization: "Token " + usDetails.key },
      })
        .then((res) => {
          seteventDetail(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [usDetails]);

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
  console.log(eventDetail);
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
                <Link to={`/band/event/${id}`}>
                  <div className="event_head">
                    <h2>
                      {eventDetail.event_date ? eventDetail.event_date : ""}
                    </h2>
                    <h2>
                      {eventDetail.event_start ? eventDetail.event_start : ""}
                    </h2>
                    <h3 className="label">
                      {eventDetail.event_label ? eventDetail.event_label : ""}
                    </h3>
                  </div>
                </Link>
              </div>
              <div className="event_column">
                <Link to={`/band/event/${id}/`}>
                  <div className="event_dis_col">
                    <h1>
                      {eventDetail.event_name ? eventDetail.event_name : ""}
                    </h1>
                    <h1>
                      {eventDetail.event_content
                        ? eventDetail.event_content
                        : ""}
                    </h1>
                    <h1>
                      {eventDetail.event_type ? eventDetail.event_type : ""}
                    </h1>
                    <h1>
                      {eventDetail.event_mode
                        ? eventDetail.event_mode.event_mode_name
                        : ""}
                    </h1>
                  </div>
                </Link>
              </div>
              <div className="event_column tcside">
                <Link to={`/band/updateevent/${id}`}>
                  <button>EDIT EVENT</button>
                </Link>
                <button onClick={clk}>DELETE EVENT</button>
              </div>
            </div>
          </div>
          <div className="event_details">
            <h2>EVENT DETAILS</h2>
            <div className="event_description">
              <div className="event_pic_col">
                <div className="event_pic_sec">
                  <img
                    src={eventDetail.event_cover ? eventDetail.event_cover : ""}
                    alt="band"
                  />
                </div>
              </div>
              <div className="event_dis_col">
                <div className="event_dis_section">
                  <div className="event_dis_row">
                    <h2>BAND</h2>
                    <h2>
                      <span>: Band</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT NAME</h2>
                    <h2>
                      <span>
                        : {eventDetail.event_name ? eventDetail.event_name : ""}
                      </span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT DESCRIPTION</h2>
                    <h2>
                      <span>
                        :{" "}
                        {eventDetail.description ? eventDetail.description : ""}
                      </span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT LABEL</h2>
                    <h2>
                      <span>
                        :{" "}
                        {eventDetail.event_label ? eventDetail.event_label : ""}
                      </span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT TYPE</h2>
                    <h2>
                      <span>
                        : {eventDetail.event_type ? eventDetail.event_type : ""}
                      </span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT CATEGORY</h2>
                    <h2>
                      <span>
                        :{" "}
                        {eventDetail.event_mode
                          ? eventDetail.event_mode.event_mode_name
                          : ""}
                      </span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT DATE</h2>
                    <h2>
                      <span>
                        : {eventDetail.event_date ? eventDetail.event_date : ""}
                      </span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT START TIME</h2>
                    <h2>
                      <span>
                        :{" "}
                        {eventDetail.event_start ? eventDetail.event_start : ""}
                      </span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT END TIME</h2>
                    <h2>
                      <span>
                        : {eventDetail.event_end ? eventDetail.event_end : ""}
                      </span>
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
                      <span>
                        :{" "}
                        {eventDetail.event_price
                          ? eventDetail.event_price > 0
                            ? eventDetail.event_price
                            : "Free"
                          : "Free"}
                      </span>
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
