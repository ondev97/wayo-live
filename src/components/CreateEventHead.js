import React, { useRef, useState, useEffect } from "react";
import wayo from "../img/wayo.jpg";
import "../assets/css/eventhead.css";
import EventModel from "./EventModel";
import { useSelector } from "react-redux";
import Axios from "axios";

function CreateEventHead() {
  const eventRef = useRef();
  const [closeModel, setcloseModel] = useState(false);
  const [evDropDown, setevDropDown] = useState(false);
  const [ismodel, setismodel] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [editValue, seteditValue] = useState({ id: "", value: "" });
  const [eventValues, seteventValues] = useState([]);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  useEffect(() => {
    if (usDetails.key) {
      getEvent();
    }
  }, [usDetails, ismodel]);

  const getEvent = () => {
    Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/show/listeventmode/`, {
      headers: { Authorization: "Token " + usDetails.key },
    })
      .then((res) => {
        seteventValues([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeOuter = (e) => {
    if (e.target.className.includes("model_outer")) {
      setcloseModel(false);
      setisEdit(false);
      seteditValue({ id: "", value: "" });
    }
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
      setevDropDown(false);
    }
  };

  //delete mode
  const deleteMod = (data) => {
    Axios.delete(
      `${process.env.REACT_APP_LMS_MAIN_URL}/show/deleteeventmode/${data}/`,
      {
        headers: { Authorization: "TOken " + usDetails.key },
      }
    )
      .then(() => {
        setismodel(!ismodel);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //edit model
  const editModel = (id, value) => {
    setisEdit(true);
    setcloseModel(true);
    seteditValue({ id: id, value: value });
  };

  return (
    <>
      <div className="event_grid_sec">
        {closeModel ? (
          <EventModel
            removeOuter={removeOuter}
            setcloseModel={setcloseModel}
            setismodel={setismodel}
            ismodel={ismodel}
            setisEdit={setisEdit}
            isEdit={isEdit}
            editValue={editValue}
            seteditValue={seteditValue}
          />
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
            {evDropDown ? (
              <ul>
                <li
                  className="activeSelect"
                  onClick={() => setcloseModel(true)}
                >
                  <span>
                    <i className="fas fa-plus-circle"></i>Create Event
                  </span>
                </li>
                {eventValues.map((data, index) => (
                  <li
                    onClick={setEvActive}
                    data-label={data.event_mode_name}
                    key={index}
                    className="list_data"
                  >
                    <span>{data.event_mode_name}</span>
                    <button
                      onClick={() => editModel(data.id, data.event_mode_name)}
                    >
                      <i className="far fa-edit"></i>
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteMod(data.id)}
                    >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </li>
                ))}
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

export default CreateEventHead;
