import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/student/eventsFilter.css";
import Axios from "axios";
import { useSelector } from "react-redux";

const BandsList = ({ band, setActive }) => {
  return (
    <>
      <li
        data-label={band.user.username}
        data-img={band.band_image}
        data-id={band.id}
        onClick={setActive}
      >
        <img src={band.band_image} alt="wayo" />{" "}
        <span>{band.user.username}</span>
      </li>
    </>
  );
};
const EventModsList = ({ eventMode, setEvActive }) => {
  return (
    <>
      <li data-label={eventMode.event_mode_name} onClick={setEvActive}>
        <span>{eventMode.event_mode_name}</span>
      </li>
    </>
  );
};

function EventsFilter({ id, bands, filter, setfilter }) {
  const inputRef = useRef();
  const eventRef = useRef();
  const usDetails = useSelector((state) => state.accountDetails);
  const [acDropDown, setacDropDown] = useState(false);
  const [evDropDown, setevDropDown] = useState(false);
  const [image, setimage] = useState("#");
  const [eventModes, setEventModes] = useState([]);
  const inValue1 = useRef();
  const inValue2 = useRef();

  useEffect(() => {
    eventRef.current.value = "All Events";
  }, []);

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/myeventmodes/${filter.band}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          if (res.data) {
            setEventModes(res.data);
          }
        })
        .catch((err) => {});
    }
  }, [usDetails, filter]);

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
    setfilter({ ...filter, band: e.target.dataset.id });
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
    if (e.target.dataset.label === "All Events") {
      setfilter({ ...filter, category: "" });
    } else {
      setfilter({ ...filter, category: e.target.dataset.label });
    }
    setevDropDown(false);
  };

  /*event type*/
  const eventType = (e) => {
    if (inValue1.current.checked && inValue2.current.checked) {
      setfilter({ ...filter, eventType: "" });
    } else {
      if (inValue1.current.checked) {
        setfilter({ ...filter, eventType: "Live Streaming" });
      }
      if (inValue2.current.checked) {
        setfilter({ ...filter, eventType: "Live Recorded" });
      }
      if (!inValue1.current.checked && !inValue2.current.checked) {
        setfilter({ ...filter, eventType: "" });
      }
    }
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
                  {bands.length !== 0
                    ? bands.map((band, index) => (
                        <BandsList
                          key={index}
                          band={band}
                          setActive={setActive}
                        />
                      ))
                    : ""}
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
        <div className="filter_column">
          <h2>SELECT EVENT TYPE</h2>
          <form>
            <p>
              <input
                type="checkbox"
                id="live"
                name="record"
                value="Live Streaming"
                onChange={eventType}
                ref={inValue1}
              />
              <label htmlFor="live">Live Streaming</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="liveR"
                name="record"
                value="Live Recorded"
                onChange={eventType}
                ref={inValue2}
              />
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
                  {eventModes.length !== 0
                    ? eventModes.map((eMode, index) => (
                        <EventModsList
                          key={index}
                          eventMode={eMode}
                          setEvActive={setEvActive}
                        />
                      ))
                    : ""}
                  <li data-label="All Events" onClick={setEvActive}>
                    <span>All Events</span>
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
