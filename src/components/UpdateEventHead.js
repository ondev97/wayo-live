import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EventModel from "./EventModel";
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
  const [editValue, seteditValue] = useState({ id: "", value: "" });
  const { teachProfilepic, profileDetails } = AcDetails();
  const [closeModel, setcloseModel] = useState(false);

  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  useEffect(() => {
    if (usDetails.key) {
      if (profileDetails.id) {
        getEvent(profileDetails.id);
      }
    }
  }, [usDetails, ismodel, profileDetails]);

  const removeOuter = (e) => {
    if (e.target.className.includes("model_outer")) {
      setcloseModel(false);
      setisEdit(false);
      seteditValue({ id: "", value: "" });
    }
  };

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

  const getEvent = (id) => {
    if (id) {
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
      setformValue({ ...formValue, event_category: e.target.dataset.id });
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
                <li
                  className="activeSelect"
                  onClick={() => setcloseModel(true)}
                >
                  <span>
                    <i className="fas fa-plus-circle"></i>Create Event
                  </span>
                </li>
                {eventValues.map((data) => (
                  <li
                    onClick={setEvActive}
                    data-label={data.event_mode_name}
                    data-id={data.id}
                    key={data.id}
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
