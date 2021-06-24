import React, { useEffect, useState } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import "../../assets/css/student/evntDetails.css";
import { useSelector } from "react-redux";
import Axios from "axios";
import { AnimatePresence } from "framer-motion";
import KeyModel from "../../components/student/KeyModel";

export default function EventDetails() {
  const { id } = useParams();
  const usDetails = useSelector((state) => state.accountDetails);
  const [eventDetails, setEventDetails] = useState({});
  const [ismodel, setismodel] = useState(false);
  const [eventMode, setEventMode] = useState({});
  const [redirect, setredirect] = useState(false);
  const [style, setstyle] = useState({ color: "red", visibility: "hidden" });
  const [content, setcontent] = useState("");
  const [band, setBand] = useState({});

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/viewevent/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            setEventDetails(res.data);
            setEventMode(res.data.event_mode);
            setBand(res.data.band);
          }
        })
        .catch((err) => {});
    }
  }, [usDetails]);

  const openModel = () => {
    if (!ismodel) {
      setismodel(true);
      setcontent("");
      setstyle({ color: "red", visibility: "hidden" });
    } else {
      setismodel(false);
    }
  };

  if (redirect) {
    return <Redirect to={`/audiencedashboard/event/${id}`} />;
  }
  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        {ismodel ? (
          <KeyModel
            setismodel={setismodel}
            id={id}
            setredirect={setredirect}
            ismodel={ismodel}
            usDetails={usDetails}
            style={style}
            content={content}
            setcontent={setcontent}
            setstyle={setstyle}
          />
        ) : (
          ""
        )}
      </AnimatePresence>
      <div className="ful_manage_course">
        <div className="st_top_manage_body">
          <div className="st_mange_cos_body">
            <div className="pagetop">
              <h1
                style={{ color: "white" }}
              >{`ALL BANDS > ALL EVENTS > ${eventDetails.event_name}`}</h1>
            </div>
          </div>
          <div className="event_header">
            <div className="event_row">
              <div className="event_column">
                <div className="event_head">
                  <h2>{eventDetails.event_date}</h2>
                  <h2>{eventDetails.event_start}</h2>
                  <h3 className="label">{eventDetails.event_label}</h3>
                </div>
              </div>
              <div className="event_column">
                <div className="event_dis_col">
                  <h1>{eventDetails.event_name}</h1>
                  <h1>{eventDetails.description}</h1>
                  <h1>{eventDetails.event_type}</h1>
                  <h1>
                    {eventDetails.event_mode
                      ? eventDetails.event_mode.event_mode_name
                      : ""}
                  </h1>
                </div>
              </div>
              <div className="event_column">
                <Link to={`#`}>
                  <button>RS: {eventDetails.event_price}</button>
                </Link>
                {eventDetails.is_enrolled ? (
                  <Link to={`/audiencedashboard/envet/${id}`}>
                    <button>JOIN EVENT</button>
                  </Link>
                ) : (
                  <button onClick={openModel}>ENTER TICKET ID</button>
                )}
              </div>
            </div>
          </div>
          <div className="event_details">
            <h2>EVENT DETAILS</h2>
            <div className="event_description">
              <div className="event_pic_col">
                <div className="event_pic_sec">
                  <img src={eventDetails.event_cover} alt="band" />
                </div>
              </div>
              <div className="event_dis_col">
                <div className="event_dis_section">
                  <div className="event_dis_row">
                    <h2>BAND</h2>
                    <h2>
                      <span>
                        :{" "}
                        {eventDetails.band
                          ? eventDetails.band.user.first_name +
                            " " +
                            eventDetails.band.user.last_name
                          : ""}
                      </span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT NAME</h2>
                    <h2>
                      <span>: {eventDetails.event_name}</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT DESCRIPTION</h2>
                    <h2>
                      <span>: {eventDetails.description}</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT LABEL</h2>
                    <h2>
                      <span>: {eventDetails.event_label}</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT TYPE</h2>
                    <h2>
                      <span>: {eventDetails.event_type}</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT CATEGORY</h2>
                    <h2>
                      <span>: {eventMode.event_mode_name}</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT DATE</h2>
                    <h2>
                      <span>: {eventDetails.event_date}</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT START TIME</h2>
                    <h2>
                      <span>: {eventDetails.event_start}</span>
                    </h2>
                  </div>
                  <div className="event_dis_row">
                    <h2>EVENT END TIME</h2>
                    <h2>
                      <span>: {eventDetails.event_end}</span>
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
                      <span>: RS: {eventDetails.event_price}</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
