import React, { useEffect } from "react";
import videoCover from "../img/production.mp4";
import "../assets/css/home.css";
import "../assets/css/mediaFiles/homemedia.css";
import { useDispatch } from "react-redux";
import { activeAccount } from "../actions";
import { loadStDetails } from "../actions/stDetailsAction";
import CoverForm from "../components/CoverForm";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeAccount());
    dispatch(loadStDetails());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <>
      <div className="uppercover">
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
              <CoverForm />
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
                  JUNE 25 <br />
                  2021 06.30 PM
                </p>
              </div>
              <div className="col">
                <p>Event Description</p>
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
