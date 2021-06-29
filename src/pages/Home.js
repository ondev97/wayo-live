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

export default function Home() {
  const dispatch = useDispatch();
  const accountDetails = useSelector((state) => state.accountDetails);

  const [isModel, setisModel] = useState(false);

  useEffect(() => {
    dispatch(activeAccount());
    dispatch(loadStDetails());
    window.scrollTo(0, 0);
  }, [dispatch]);

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
        {isModel ? (
          //model login session
          <SessionModel closeModel={closeModel} setisModel={setisModel} />
        ) : (
          ""
        )}
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
              {!accountDetails.key ? <CoverForm setisModel={setisModel} /> : ""}
            </div>
          </div>
          <div className="upcoming-event">
            <h2>
              <span>UPCOMING</span> <br />
              EVENT
            </h2>
            <div className="upcoming-row">
              <div className="col">
                <p>
                  2021-07-02 <br />
                  16.00
                </p>
              </div>
              <div className="col">
                <p>WAYO Jeewithe Concert</p>
                <p>Jeewithe Private Screening</p>
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
