import React, { useRef, useState } from "react";
import wayo from "../img/wayo.jpg";
import "../assets/css/eventhead.css";
import EventModel from "./EventModel";

function CreateEventHead() {
  const eventRef = useRef();
  const [closeModel, setcloseModel] = useState(false);
  const [evDropDown, setevDropDown] = useState(false);

  const removeOuter = (e) => {
    if (e.target.className.includes("model_outer")) {
      setcloseModel(false);
    }
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
    setevDropDown(false);
  };

  return (
    <>
      <div className="event_grid_sec">
        {closeModel ? (
          <EventModel removeOuter={removeOuter} setcloseModel={setcloseModel} />
        ) : (
          ""
        )}

        <div className="event_column">
          <h1>YOUR BAND</h1>
          <div className="custom_select_box" id="custom_select_box">
            <div id="select_button" className="outer_select_box">
              <div className="img_section">
                <img src={wayo} alt="band" />
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
              <input type="radio" id="live" name="record" />
              <label htmlFor="live">Live Streaming</label>
            </p>
            <p>
              <input type="radio" id="liveR" name="record" />
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
                ref={eventRef}
                disabled
              />
              <div className="chevrons" onClick={activeEventDropDown}>
                <i className="fas fa-sort-down"></i>
              </div>
            </div>
            <ul>
              {evDropDown ? (
                <>
                  <li
                    className="activeSelect"
                    onClick={() => setcloseModel(true)}
                  >
                    <span>
                      <i className="fas fa-plus-circle"></i>Create Event
                    </span>
                  </li>
                  <li
                    data-label="Event1"
                    className="activeSelect"
                    onClick={setEvActive}
                  >
                    <span>Event1</span>
                    <button>
                      <i className="far fa-edit"></i>
                    </button>
                    <button>
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </li>
                  <li data-label="Event2" onClick={setEvActive}>
                    <span>Event2</span>
                    <button>
                      <i className="far fa-edit"></i>
                    </button>
                    <button>
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </li>
                  <li data-label="Event3" onClick={setEvActive}>
                    <span>Event3</span>
                    <button>
                      <i className="far fa-edit"></i>
                    </button>
                    <button>
                      <i className="far fa-trash-alt"></i>
                    </button>
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

export default CreateEventHead;
