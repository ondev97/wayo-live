import Axios from "axios";
import React, { useEffect, useState } from "react";
import { store } from "react-notifications-component";

function SessionModel({ closeModel, setisModel }) {
  const [valueForm, setvalueForm] = useState({ userName: "" });
  const [error, seterror] = useState({ userName: "" });
  const [hide, sethide] = useState({ userName: false });
  const [submitting, setsubmitting] = useState(false);

  const setValue = (e) => {
    const { name } = e.target;
    let value = e.target.value.toUpperCase();
    setvalueForm({ ...valueForm, [name]: value });
  };

  const submitSession = (e) => {
    e.preventDefault();
    //validate username
    if (!valueForm.userName.trim()) {
      seterror({ ...error, userName: "Please Enter UserName" });
    } else {
      seterror({});
    }
    setsubmitting(true);
    sethide({ userName: false });
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submitting) {
      submit();
    }
  }, [error]);

  const hideError = (e) => {
    Object.entries(error).map(([keys, val]) => {
      if (keys === e.target.name && val !== "") {
        sethide({ ...hide, [e.target.name]: true });
      }
    });
  };

  function submit() {
    Axios.get(
      `${process.env.REACT_APP_LMS_MAIN_URL}/auth/deletetoken/${valueForm.userName}/`
    )
      .then(() => {
        setisModel(false);
        store.addNotification({
          title: "Login Session Deleted",
          message: process.env.REACT_APP_LMS_ALERT_NAME,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true,
          },
          width: 600,
        });
      })
      .catch((err) => {
        if (err.response.status === 500) {
          seterror({ ...error, userName: "Username Is Invalid" });
        }
      });
  }

  return (
    <div>
      <div className="loginmodel_outer" onClick={closeModel}>
        <div className="loginmodel">
          <h1>Clear Login Session</h1>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure
          </h3>
          <p>
            <label>Username</label>
            <input
              type="text"
              name="userName"
              onChange={setValue}
              value={valueForm.userName}
              onFocus={hideError}
            />
            {error.userName && (
              <span className={`tip ${hide.userName ? "hidetip" : ""}`}>
                {error.userName}
              </span>
            )}
          </p>
          <button onClick={submitSession}>Clear Login Session</button>
        </div>
      </div>
    </div>
  );
}

export default SessionModel;
