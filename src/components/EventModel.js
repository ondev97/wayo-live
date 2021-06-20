import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function EventModel({ removeOuter, setcloseModel }) {
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

  function submit() {
    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/show/createeventmode/`,
      { event_mode_name: eventDetails.eventName },
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    )
      .then((res) => {
        setcloseModel(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="model_outer" onClick={removeOuter}>
        <div className="model_form">
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
            <button type="submit">ADD EVENT</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EventModel;
