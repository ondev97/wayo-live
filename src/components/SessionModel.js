import Axios from "axios";
import React, { useEffect, useState } from "react";
import { store } from "react-notifications-component";

function SessionModel({ closeModel, setisModel }) {
  const [valueForm, setvalueForm] = useState({ userName: "", password: "" });
  const [error, seterror] = useState({ userName: "", password: "" });
  const [hide, sethide] = useState({ userName: false, password: false });
  const [submitting, setsubmitting] = useState(false);

  const setValue = (e) => {
    const { name, value } = e.target;
    setvalueForm({ ...valueForm, [name]: value });
  };

  const submitSession = (e) => {
    e.preventDefault();
    let err = {};
    //validate username
    if (!valueForm.userName.trim()) {
      err.userName = "Please Enter UserName";
    }
    if (!valueForm.password.trim()) {
      err.password = "Please Enter Password";
    }
    seterror(err);

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
    Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/auth/deletetoken/`, {
      username: valueForm.userName.toUpperCase(),
      password: valueForm.password,
    })
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
        if (err.response.status === 404) {
          seterror({ ...error, userName: err.response.data.msg });
        }
      });
  }

  return (
    <div>
      <div className="loginmodel_outer" onClick={closeModel}>
        <div className="loginmodel">
          <h1>Clear Login Session</h1>
          <h3>
            Enter the username that you've used in your registration to unlock
            the user account
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
          <p>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={setValue}
              value={valueForm.password}
              onFocus={hideError}
            />
            {error.password && (
              <span className={`tip ${hide.password ? "hidetip" : ""}`}>
                {error.password}
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
