import React, { useEffect, useRef, useState } from "react";
import wayo from "../img/wayo.jpg";
import "../assets/css/student/eventsFilter.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import AcDetails from "../utils/hooks/AcDetails";
import { LazyLoadImage } from "react-lazy-load-image-component";

function EventsFilters({ filterEvent, setfilterEvent }) {
  const inputRef = useRef();
  const eventRef = useRef();
  const [acDropDown, setacDropDown] = useState(false);
  const [evDropDown, setevDropDown] = useState(false);
  const { profileDetails, teachProfilepic } = AcDetails();
  const [eventValues, seteventValues] = useState([]);
  const inValue1 = useRef();
  const inValue2 = useRef();

  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  useEffect(() => {
    eventRef.current.value = "All Events";
    if (usDetails.key) {
      if (profileDetails.id) {
        getEvent(profileDetails.id);
      }
    }
  }, [usDetails, profileDetails]);

  const activeDropDown = () => {
    setacDropDown(!acDropDown);
  };

  const activeEventDropDown = () => {
    setevDropDown(!evDropDown);
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
    if (e.target.dataset.label === "All") {
      setfilterEvent({ ...filterEvent, category: "" });
    } else {
      setfilterEvent({ ...filterEvent, category: e.target.dataset.label });
    }
    setevDropDown(false);
  };

  /*event type*/
  const eventType = () => {
    if (inValue1.current.checked && inValue2.current.checked) {
      setfilterEvent({ ...filterEvent, eventType: "" });
    } else {
      if (inValue1.current.checked) {
        setfilterEvent({ ...filterEvent, eventType: "Live Streaming" });
      }
      if (inValue2.current.checked) {
        setfilterEvent({ ...filterEvent, eventType: "Live Recorded" });
      }
      if (!inValue1.current.checked && !inValue2.current.checked) {
        setfilterEvent({ ...filterEvent, eventType: "" });
      }
    }
  };

  const getEvent = (id) => {
    Axios.get(
      `${process.env.REACT_APP_LMS_MAIN_URL}/show/myeventmodes/${id}/`,
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    )
      .then((res) => {
        seteventValues([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="filter_section">
        <div className="filter_column">
          <h2>YOUR BAND</h2>
          <div className="custom_select_box" id="custom_select_box">
            <div
              id="select_button"
              className="outer_select_box"
              onClick={activeDropDown}
            >
              <div className="img_section">
                {teachProfilepic !== "#" && (
                  <LazyLoadImage
                    src={teachProfilepic}
                    alt="band"
                    effect="blur"
                  />
                )}
              </div>
              <input
                type="text"
                id="option_view_button"
                placeholder="Select A Band"
                disabled
                ref={inputRef}
                value="WAYO"
              />
            </div>
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
                placeholder="Select A Category"
                disabled
                ref={eventRef}
              />
              <div className="chevrons" onClick={activeEventDropDown}>
                <i className="fas fa-sort-down"></i>
              </div>
            </div>
            {evDropDown ? (
              <ul>
                {eventValues.map((data) => (
                  <li
                    onClick={setEvActive}
                    data-label={data.event_mode_name}
                    data-id={data.id}
                    key={data.id}
                    className="list_data"
                  >
                    <span>{data.event_mode_name}</span>
                  </li>
                ))}
                <li data-label="All" onClick={setEvActive}>
                  <span>All Events</span>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsFilters;
