import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AcDetails from "../utils/hooks/AcDetails";

function UpdateEventHead({
  formValue,
  setformValue,
  hadelChabgeFormValues,
  hideError,
  hide,
  formErrors,
}) {
  const eventRef = useRef();
  const eventType1 = useRef();
  const eventType2 = useRef();
  const [evDropDown, setevDropDown] = useState(false);
  const [ismodel, setismodel] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [eventValues, seteventValues] = useState([]);
  const { teachProfilepic, profileDetails } = AcDetails();

  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  useEffect(() => {
    if (usDetails.key) {
      getEvent();
    }
  }, [usDetails]);

  useEffect(() => {
    if (formValue.event_category_name.event_mode_name) {
      eventRef.current.value = formValue.event_category_name.event_mode_name;
    }
    if (formValue.event_type === "Live Streaming") {
      eventType1.current.checked = "true";
    } else if (formValue.event_type === "Live Recorded") {
      eventType2.current.checked = "true";
    }
  }, [formValue.event_category_name]);

  const getEvent = () => {
    Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/show/myeventmodes/`, {
      headers: { Authorization: "Token " + usDetails.key },
    })
      .then((res) => {
        seteventValues([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const activeEventDropDown = () => {
    setevDropDown(!evDropDown);
  };

  //event drop
  const setEvActive = (e) => {
    if (e.target.className.includes("list_data")) {
      let childNodes = e.target.parentElement.childNodes;
      Array.from(childNodes).map((child) => {
        if (child.classList.contains("activeSelect")) {
          child.classList.remove("activeSelect");
        }
      });
      e.target.classList.add("activeSelect");
      eventRef.current.value = e.target.dataset.label;
      setformValue({ ...formValue, event_category: e.target.dataset.id });
      setevDropDown(false);
    }
  };
  return (
    <>
      <div className="event_grid_sec">
        <div className="event_column">
          <h1>YOUR BAND</h1>
          <div className="custom_select_box" id="custom_select_box">
            <div id="select_button" className="outer_select_box">
              <div className="img_section">
                <img src={teachProfilepic} alt="band" />
              </div>
              <input
                type="text"
                id="option_view_button"
                placeholder="Select A Band"
                disabled
                value={profileDetails.userName || ""}
              />
            </div>
          </div>
        </div>
        <div className="event_column">
          <h1>SELECT EVENT TYPE</h1>
          <form>
            <p>
              <input
                type="radio"
                id="live"
                name="event_type"
                value="Live Streaming"
                ref={eventType1}
                onClick={hadelChabgeFormValues}
              />
              <label htmlFor="live">Live Streaming</label>
            </p>
            <p>
              <input
                type="radio"
                id="liveR"
                name="event_type"
                value="Live Recorded"
                ref={eventType2}
                onClick={hadelChabgeFormValues}
              />
              <label htmlFor="liveR">Live Recorded</label>
            </p>
          </form>
        </div>
        <div className="event_column">
          <h1>SELECT EVENT CATEGORY</h1>
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
                name="event_category"
                ref={eventRef}
                readOnly="readonly"
                onClick={hideError}
              />
              <div className="chevrons" onClick={() => activeEventDropDown}>
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
              </ul>
            ) : (
              ""
            )}
          </div>
          {formErrors.event_category && (
            <span className={`tip ${hide.event_category ? "hidetip" : ""}`}>
              {formErrors.event_category}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateEventHead;
