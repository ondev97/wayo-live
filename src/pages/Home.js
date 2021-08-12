import React, { useEffect, useState } from "react";
import videoCover from "../img/production.mp4";
import "../assets/css/home.css";
import "../assets/css/mediaFiles/homemedia.css";
import { useDispatch, useSelector } from "react-redux";
import { activeAccount } from "../actions";
import { loadStDetails } from "../actions/stDetailsAction";
import CoverForm from "../components/CoverForm";
import { Link } from "react-router-dom";
import SessionModel from "../components/SessionModel";
import OtpModel from "../components/OtpModel";
import UserDeteailsCol from "../components/UserDeteailsCol";
import Axios from "axios";

export default function Home() {
  const dispatch = useDispatch();
  const accountDetails = useSelector((state) => state.accountDetails);

  const [isModel, setisModel] = useState(false);
  const [isOTP, setisOTP] = useState(false);
  const [usForm, setusForm] = useState(false);
  const [otpDetails, setotpDetails] = useState({});
  const [evetDetails, setevetDetails] = useState({});

  useEffect(() => {
    dispatch(activeAccount());
    dispatch(loadStDetails());
    window.scrollTo(0, 0);
    //get latest event
    latestEvent();
  }, [dispatch]);

  function latestEvent() {
    Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/show/latestevent/`)
      .then((res) => setevetDetails(res))
      .catch((err) => console.log(err));
  }

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  const closeModel = (e) => {
    if (e.target.className.includes("loginmodel_outer")) {
      setisModel(false);
    }
    if (e.target.className.includes("close_model")) {
      setisModel(false);
    }
  };

  return (
    <>
      <div className="uppercover">
        {usForm ? (
          <UserDeteailsCol otpDetails={otpDetails} setusForm={setusForm} />
        ) : (
          ""
        )}
        {isModel ? (
          //model login session
          <SessionModel closeModel={closeModel} setisModel={setisModel} />
        ) : (
          ""
        )}
        {isOTP ? <OtpModel otpDetails={otpDetails} setisOTP={setisOTP} /> : ""}
        <div className="cover-cont">
          <div className="wrp">
            <div className="cover-col">
              <div className="cover-col-cont">
                <h1>WAYO.LIVE</h1>
                <h3>
                  AN EXPERIENCE <br /> BEYOND MUSIC
                </h3>
              </div>
            </div>
            <div className="cover-col">
              {!accountDetails.key ? (
                <CoverForm
                  setisModel={setisModel}
                  setisOTP={setisOTP}
                  setotpDetails={setotpDetails}
                  setusForm={setusForm}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="upcoming-event">
            <h2>
              <span>UPCOMING</span> <br />
              EVENT
            </h2>
            <div className="upcoming-row">
              <div className="col">
                {evetDetails.data ? (
                  <>
                    <p>
                      {evetDetails.data.event_date} <br />
                      {tConvert(evetDetails.data.event_start)}
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="col">
                {evetDetails.data ? (
                  <>
                    <p>{evetDetails.data.event_type}</p>
                    <p>{evetDetails.data.event_content}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="simple_footer">
            <h3>
              COPYRIGHT © WAYO LIVE | PROUDLY POWERED BY
              <span>
                {
                  <Link to="//helamid.com" target="_blank">
                    &nbsp;HELAMID
                  </Link>
                }
              </span>
            </h3>
          </div>
        </div>
        <div className="cov_img">
          <video autoPlay loop muted>
            <source src={videoCover} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}
