import React from "react";
import videoCover from "../img/production.mp4";
import "../assets/css/home.css";
import "../assets/css/mediaFiles/homemedia.css";

export default function Home() {
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
              <form>
                <h2>Audience Login</h2>
                <p>
                  <label>Username</label>
                  <input type="text" name="username" />
                </p>
                <p>
                  <label>Password</label>
                  <input type="password" name="password" />
                </p>
                <div className="but-sec">
                  <button>Login</button>
                  <h4>Forgot Password</h4>
                </div>
              </form>
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
        </div>
        <div className="cov_img">
          <video autoPlay loop muted>
            <source src={videoCover} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* event section */}
      <div className="event-section">
        <div className="event-main-container">
          <div className="event-section-column">
            <div className="event-row">
              <div className="sec">
                <div className="profile"></div>
              </div>
              <div className="sec">
                <h2>USER NAME</h2>
              </div>
            </div>
            <div className="event-list">
              <ul>
                <li>HOME</li>
                <li>USER GUIDE</li>
                <li>CONTACT US</li>
                <li>UPCOMING EVENTS</li>
                <li>MY PROFILE</li>
                <li>LOGOUT</li>
              </ul>
            </div>
          </div>
          <div className="event-section-column">
            <h2>Event Name</h2>
            <div className="video-sec">
              <video controls>
                <source src={videoCover} type="video/mp4" />
              </video>
            </div>
            <div className="detail-sec">
              <h2>EVENT DETAILS -</h2>
            </div>
          </div>
          <div className="event-section-column">
            <div className="live-row">
              <h1>LIVE AUDIENCE</h1>
              <h1>250</h1>
            </div>
            <div className="live-row">
              <div className="live-row-main">
                <div className="row-user">
                  <div className="user-cer"></div>
                  <h2>USER NAME</h2>
                </div>
                <div className="row-user">
                  <div className="user-cer"></div>
                  <h2>USER NAME</h2>
                </div>
                <div className="row-user">
                  <div className="user-cer"></div>
                  <h2>USER NAME</h2>
                </div>
                <div className="row-user">
                  <div className="user-cer"></div>
                  <h2>USER NAME</h2>
                </div>
                <div className="row-user">
                  <div className="user-cer"></div>
                  <h2>USER NAME</h2>
                </div>
                <div className="row-user">
                  <div className="user-cer"></div>
                  <h2>USER NAME</h2>
                </div>
                <div className="row-user">
                  <div className="user-cer"></div>
                  <h2>USER NAME</h2>
                </div>
                <div className="row-user">
                  <div className="user-cer"></div>
                  <h2>USER NAME</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
