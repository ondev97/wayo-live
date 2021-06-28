import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function EventModel({
  removeOuter,
  setcloseModel,
  setismodel,
  ismodel,
  setisEdit,
  isEdit,
  editValue,
  seteditValue,
}) {
  const [eventDetails, seteventDetails] = useState({ eventName: "" });
  const [error, seterror] = useState({ eventName: "" });
  const [isSubmitting, setisSubmitting] = useState(false);

  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const setValues = (e) => {
    seteventDetails({ [e.target.name]: e.target.value });
  };

  const submitEvent = (e) => {
    e.preventDefault();
    setisSubmitting(false);

    if (!eventDetails.eventName.trim()) {
      seterror({ ...error, eventName: "Please Enter Event Name" });
    } else if (eventDetails.eventName.length > 20) {
      seterror({
        ...error,
        eventName: "Event Must Be Less Than 20 Characters",
      });
    } else {
      seterror({});
    }
    setisSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmitting) {
      submit();
    }
  }, [error]);

  useEffect(() => {
    if (editValue.value) {
      seteventDetails({ eventName: editValue.value });
    }
  }, []);

  function submit() {
    if (!isEdit) {
      Axios.post(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/createeventmode/`,
        { event_mode_name: eventDetails.eventName },
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then(() => {
          setcloseModel(false);
          setismodel(!ismodel);
          seteditValue({ id: "", value: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.put(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/updateeventmode/${editValue.id}/`,
        { event_mode_name: eventDetails.eventName },
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then(() => {
          setcloseModel(false);
          setismodel(!ismodel);
          setisEdit(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <div className="model_outer" onClick={removeOuter}>
        <div className="model_form">
          {error.eventName ? (
            <div className="error_model">
              <h1>{error.eventName}</h1>
            </div>
          ) : (
            ""
          )}
          <form onSubmit={submitEvent}>
            <p>
              <label>Enter Event Name</label>
              <input
                type="text"
                name="eventName"
                value={eventDetails.eventName}
                onChange={setValues}
              />
            </p>
            {isEdit ? (
              <button type="submit">EDIT EVENT</button>
            ) : (
              <button type="submit">ADD EVENT</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default EventModel;
