import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function UpdateEventHead({
  formValue,
  setformValue,
  hadelChabgeFormValues,
  hideError,
  hide,
  formErrors,
}) {
  const eventRef = useRef();
  const [evDropDown, setevDropDown] = useState(false);
  const [ismodel, setismodel] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [eventValues, seteventValues] = useState([]);

  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const activeEventDropDown = () => {
    setevDropDown(!evDropDown);
  };

  useEffect(() => {}, [formValue]);

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
                <img src="" alt="band" />
              </div>
              <input
                type="text"
                id="option_view_button"
                placeholder="Select A Band"
                disabled
                value="WAYO"
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
                defaultChecked={true}
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
                // onClick={hadelChabgeFormValues}
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
