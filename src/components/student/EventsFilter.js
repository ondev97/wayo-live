import React, { useRef, useState } from "react";
import wayo from "../../img/wayo.jpg";
import line from "../../img/line.jpg";
import "../../assets/css/student/eventsFilter.css";

function EventsFilter() {
  const inputRef = useRef();
  const eventRef = useRef();
  const [acDropDown, setacDropDown] = useState(false);
  const [evDropDown, setevDropDown] = useState(false);
  const [image, setimage] = useState("#");

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
                  <li
                    data-label="Wayo1"
                    data-img={wayo}
                    className="activeSelect"
                    onClick={setActive}
                  >
                    <img src={wayo} alt="wayo" /> <span>Wayo1</span>
                  </li>
                  <li data-label="Wayo2" data-img={line} onClick={setActive}>
                    <img src={line} alt="wayo" /> <span>Wayo2</span>
                  </li>
                  <li data-label="Wayo3" data-img={wayo} onClick={setActive}>
                    <img src={wayo} alt="wayo" /> <span>Wayo2</span>
                  </li>
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
                  <li
                    data-label="Event1"
                    className="activeSelect"
                    onClick={setEvActive}
                  >
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
