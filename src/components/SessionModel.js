import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { store } from "react-notifications-component";

function SessionModel({ closeModel, setisModel }) {
  const passwordRef = useRef();
  const [loading, setloading] = useState(false);
  const [valueForm, setvalueForm] = useState({ userName: "", password: "" });
  const [error, seterror] = useState({ userName: "", password: "", com: "" });
  const [otp, setotp] = useState(false);
  const [hide, sethide] = useState({
    userName: false,
    password: false,
    com: false,
  });
  const [submitting, setsubmitting] = useState(false);

  const setValue = (e) => {
    const { name, value } = e.target;
    if (e.target.id === "un") {
      setvalueForm({ ...valueForm, [name]: value.trim() });
    } else {
      setvalueForm({ ...valueForm, [name]: value });
    }
  };

  const submitSession = (e) => {
    e.preventDefault();
    let err = {};
    //validate username
    if (!valueForm.userName.trim()) {
      err.userName = "Please Enter UserName";
    } else if (
      valueForm.userName.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
    ) {
      err.userName = "User Name Must Not Be Contain Special Characters";
    }
    seterror(err);

    setsubmitting(true);
    sethide({ userName: false, com: false });
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
    Axios.get(
      `${
        process.env.REACT_APP_LMS_MAIN_URL
      }/auth/resetsession/${valueForm.userName.toUpperCase()}/`
    )
      .then(() => {
        setloading(false);
        setotp(true);
        store.addNotification({
          title: "Verification Code Sent Successfully",
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

  function submitOtp(e) {
    e.preventDefault();
    setloading(true);
    if (valueForm.password.trim()) {
      Axios.post(
        `${
          process.env.REACT_APP_LMS_MAIN_URL
        }/auth/resetsession/${valueForm.userName.toUpperCase()}/`,
        {
          otp: valueForm.password,
        }
      )
        .then(() => {
          setloading(false);
          setisModel(false);
          store.addNotification({
            title: "Login Session Has Been Deleted",
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
        .catch(() => {
          seterror({ ...error, com: "OTP is Invalid" });
          setloading(false);
        });
    } else {
      seterror({ ...error, password: "OTP is Required" });
    }
  }

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
            {!otp
              ? "Enter the username that you've used in your registration to unlock the user account"
              : "Enter Received OTP Number to Clear Login Session"}
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
              id="un"
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
          {otp ? (
            <p>
              <label>OTP</label>
              <input
                type="text"
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
          ) : (
            ""
          )}
          <button type="submit" onClick={!otp ? submitSession : submitOtp}>
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
