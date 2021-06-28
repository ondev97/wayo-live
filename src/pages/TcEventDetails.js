import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../assets/css/student/evntDetails.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function TcEventDetails() {
  const { id } = useParams();
  const [eventDetail, seteventDetail] = useState({});
  const [difference, setdifference] = useState("");
  const history = useHistory();
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
        history.push("/band/allevents");
      });
    }
  };

  useEffect(() => {
    let start_time = eventDetail.event_start;
    let end_time = eventDetail.event_end;
    if (start_time && end_time) {
      let start = start_time.split(":");
      let end = end_time.split(":");
      var startDate = new Date(0, 0, 0, start[0], start[1], 0);
      var endDate = new Date(0, 0, 0, end[0], end[1], 0);
      var diff = endDate.getTime() - startDate.getTime();
      var hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      var minutes = Math.floor(diff / 1000 / 60);
      let difference =
        (hours <= 9 ? "0" : "") +
        hours +
        ":" +
        (minutes <= 9 ? "0" : "") +
        minutes;
      setdifference(difference);
    }
  }, [eventDetail]);

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
              </div>
              <div className="event_column">
                <div className="event_dis_col">
                  <h1>
                    {eventDetail.event_name ? eventDetail.event_name : ""}
                  </h1>
                  <h1>
                    {eventDetail.description ? eventDetail.description : ""}
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
              </div>
              <div className="event_column tcside">
                <Link to={`/band/event/${id}`}>
                  <button>MANAGE EVENT</button>
                </Link>
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
                  <LazyLoadImage
                    src={eventDetail.event_cover ? eventDetail.event_cover : ""}
                    alt="band"
                    effect="blur"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
              <div className="event_dis_col">
                <div className="event_dis_section">
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
                      <span>: {difference ? difference : ""}</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT FEE</h2>
                    <h2>
                      <span>
                        :{" "}
                        {eventDetail.event_price
                          ? eventDetail.event_price > 0
                            ? "LKR " + eventDetail.event_price
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
