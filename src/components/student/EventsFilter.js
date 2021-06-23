import React, {useEffect, useRef, useState} from "react";
import wayo from "../../img/wayo.jpg";
import line from "../../img/line.jpg";
import "../../assets/css/student/eventsFilter.css";
import Axios from "axios";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import MyCourseCard from "./MyCourseCard";
import ProfileLoader from "../ProfileLoader";

const bandsList = (band, setActive) => {
  return (
      <>
        <li data-label={band.user.username} data-img={band.band_image} onClick={setActive}>
          <img src={band.band_image} alt="wayo" /> <span>{band.user.username}</span>
        </li>
      </>
  );
}
const eventModsList = (eventMode, setEvActive) => {
  return (
      <>
        <li data-label={eventMode.event_mode_name} onClick={setEvActive}>
          <span>{eventMode.event_mode_name}</span>
        </li>
      </>
  );
}

function EventsFilter({ id, bands }) {
  const inputRef = useRef();
  const eventRef = useRef();
  const usDetails = useSelector((state) => state.accountDetails);
  const [acDropDown, setacDropDown] = useState(false);
  const [evDropDown, setevDropDown] = useState(false);
  const [image, setimage] = useState("#");
  const [ eventModes, setEventModes] = useState([]);
  const [ idOfBand, setIdOfBand] = useState(id);

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(
          `${process.env.REACT_APP_LMS_MAIN_URL}/show/myeventmodes/${idOfBand}`,
          {
            headers: { Authorization: "Token " + usDetails.key },
          }
      )
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              setEventModes(res.data);
            }
          })
          .catch((err) => {

          });
    }
  }, [usDetails]);

  const activeDropDown = () => {
    setacDropDown(!acDropDown);
  };

  const activeEventDropDown = () => {
    setevDropDown(!evDropDown);
  };

  const setActive = (e) => {
    let childNodes = e.target.parentElement.childNodes;
    Array.from(childNodes).map((child) => {
      if (child.classList.contains("activeSelect")) {
        child.classList.remove("activeSelect");
      }
    });
    e.target.classList.add("activeSelect");
    inputRef.current.value = e.target.dataset.label;
    setimage(e.target.dataset.img);
    setacDropDown(false);
  };

  //event drop
  const setEvActive = (e) => {
    let childNodes = e.target.parentElement.childNodes;
    Array.from(childNodes).map((child) => {
      if (child.classList.contains("activeSelect")) {
        child.classList.remove("activeSelect");
      }
    });
    e.target.classList.add("activeSelect");
    eventRef.current.value = e.target.dataset.label;
    setevDropDown(false);
  };

  return (
    <>
      <div className="filter_section">
        <div className="filter_column">
          <h2>SELECT BAND</h2>
          <div className="custom_select_box" id="custom_select_box">
            <div
              id="select_button"
              className="outer_select_box"
              onClick={activeDropDown}
            >
              <div className="img_section">
                {image !== "#" && <img src={image} alt="" />}
              </div>
              <input
                type="text"
                id="option_view_button"
                placeholder="Select A Band"
                disabled
                ref={inputRef}
              />
              <div className="chevrons" onClick={activeDropDown}>
                <i className="fas fa-sort-down"></i>
              </div>
            </div>
            <ul>
              {acDropDown ? (
                <>
                  {
                    bands.length !== 0
                      ? bands.map((band, index) => bandsList(band, setActive))
                      : ''
                  }
                  {/*<li data-label="Wayo1" data-img={wayo} onClick={setActive}>*/}
                  {/*  <img src={wayo} alt="wayo" /> <span>Wayo1</span>*/}
                  {/*</li>*/}
                  {/*<li data-label="Wayo2" data-img={line} onClick={setActive}>*/}
                  {/*  <img src={line} alt="wayo" /> <span>Wayo2</span>*/}
                  {/*</li>*/}
                  {/*<li data-label="Wayo3" data-img={wayo} onClick={setActive}>*/}
                  {/*  <img src={wayo} alt="wayo" /> <span>Wayo2</span>*/}
                  {/*</li>*/}
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
        <div className="filter_column">
          <h2>SELECT BAND</h2>
          <form>
            <p>
              <input type="checkbox" id="live" name="record" />
              <label htmlFor="live">Live Streaming</label>
            </p>
            <p>
              <input type="checkbox" id="liveR" name="record" />
              <label htmlFor="liveR">Live Recorded</label>
            </p>
          </form>
        </div>
        <div className="filter_column">
          <h2>SELECT EVENT CATEGORY</h2>
          <div className="custom_select_box" id="custom_select_box">
            <div
              id="select_button"
              className="outer_select_box"
              onClick={activeEventDropDown}
            >
              <input
                type="text"
                id="option_view_button"
                placeholder="Select A Event"
                disabled
                ref={eventRef}
              />
              <div className="chevrons" onClick={activeEventDropDown}>
                <i className="fas fa-sort-down"></i>
              </div>
            </div>
            <ul>
              {evDropDown ? (
                <>
                  {
                    eventModes.length !== 0
                        ? eventModes.map((eMode, index) => bandsList(eMode, setEvActive))
                        : ''
                  }
                  <li data-label="Event1" className="activeSelect" onClick={setEvActive}>
                    <span>Event1</span>
                  </li>
                  <li data-label="Event2" onClick={setEvActive}>
                    <span>Event2</span>
                  </li>
                  <li data-label="Event3" onClick={setEvActive}>
                    <span>Event3</span>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsFilter;
