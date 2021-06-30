import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { store } from "react-notifications-component";

function SessionModel({ closeModel, setisModel }) {
  const passwordRef = useRef();
  const [loading, setloading] = useState(false);
  const [valueForm, setvalueForm] = useState({ userName: "", password: "" });
  const [error, seterror] = useState({ userName: "", password: "", com: "" });
  const [hide, sethide] = useState({
    userName: false,
    password: false,
    com: false,
  });
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
    sethide({ userName: false, password: false, com: false });
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
    setloading(true);
    Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/auth/deletetoken/`, {
      username: valueForm.userName.toUpperCase(),
      password: valueForm.password,
    })
      .then(() => {
        setloading(false);
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
        setloading(false);
        setvalueForm({ ...valueForm, password: "" });
        if (err.response) {
          seterror({ ...error, com: err.response.data.msg });
        }
      });
  }

  //function for trigger show password field
  const showPassword = (e) => {
    let checked = e.target.checked;

    if (checked) {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  return (
    <div>
      <div className="loginmodel_outer" onClick={closeModel}>
        <div className="loginmodel">
          <div className="close">
            <button className="close_model" onClick={closeModel}>
              <i className="fas fa-times-circle"></i>
            </button>
          </div>
          <h1>Clear Login Session</h1>
          <h3>
            Enter the username and password that you've used in your
            registration to unlock the user account
          </h3>
          {error.com ? (
            <p style={{ color: "red", fontSize: "13px", marginBottom: "5px" }}>
              {error.com}
            </p>
          ) : (
            ""
          )}
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
              className="pw"
              onChange={setValue}
              value={valueForm.password}
              onFocus={hideError}
              ref={passwordRef}
            />
            {error.password && (
              <span className={`tip ${hide.password ? "hidetip" : ""}`}>
                {error.password}
              </span>
            )}
          </p>
          <div className="showpw">
            <p>
              <input
                type="checkbox"
                name="showPw"
                id="showpw"
                onChange={(e) => showPassword(e)}
              />
              <label htmlFor="showpw">Show Password</label>
            </p>
          </div>
          <button type="submit" onClick={submitSession}>
            {loading ? (
              <i className="fas fa-circle-notch rotate"></i>
            ) : (
              "Clear Login Session"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SessionModel;
