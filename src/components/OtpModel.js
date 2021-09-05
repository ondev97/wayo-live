import Axios from "axios";
import React, { useEffect, useState } from "react";
import { store } from "react-notifications-component";
import { useHistory } from "react-router";
import "../assets/css/otpModel.css";

function OtpModel({ otpDetails, setisOTP }) {
  const [otpValue, setotpValue] = useState({ otp: "" });
  const [otpError, setotpError] = useState({ otp: "" });
  const [isotpError, setisotpError] = useState({ otp: false });
  const [isSubmit, setisSubmit] = useState(false);
  const [reset, setreset] = useState(false);
  const [counter, setCounter] = useState(120);
  const history = useHistory();

  const SetValue = (e) => {
    const { name, value } = e.target;
    setotpValue({ ...otpValue, [name]: value });
  };

  const closingModel = (e) => {
    if (e.target.className.includes("otp_model_outer")) {
      setisOTP(false);
    }
  };

  useEffect(() => {
    if (otpDetails) {
      let IntNumber = parseInt(otpDetails.phone_no.substring(0, 2));
      if (IntNumber !== 94) {
        Axios.get(
          `${process.env.REACT_APP_LMS_MAIN_URL}/auth/activate_user_by_email/${otpDetails.email}/`
        )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.response.data.message);
            if (err) {
              if (
                err.response.data.message === "Verification code was not sent"
              ) {
                store.addNotification({
                  title: "Verification code was not sent check your email",
                  message: process.env.REACT_APP_LMS_ALERT_NAME,
                  type: "danger",
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
              }
            }
          });
      } else {
        Axios.get(
          `${process.env.REACT_APP_LMS_MAIN_URL}/auth/activate_user/${otpDetails.phone_no}/`
        )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [otpDetails, reset]);

  const resend = () => {
    setreset(!reset);
    setCounter(120);
  };

  //add timing function
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter, reset]);

  const otpSubmit = (e) => {
    e.preventDefault();
    //validating
    let err = {};
    if (!otpValue.otp.trim()) {
      err = { otp: "Please Enter OTP" };
    }
    if (otpValue.otp.length > 6) {
      err = { otp: "Please Enter Valid OTP" };
    }
    setisSubmit(true);
    setisotpError({ otp: false });
    setotpError(err);
  };

  const hideError = (e) => {
    Object.entries(isotpError).map(([keys, val]) => {
      if (keys === e.target.name && val !== "") {
        setisotpError({ ...isotpError, [e.target.name]: true });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(otpError).length === 0 && isSubmit) {
      submit();
    }
  }, [otpError]);

  function submit() {
    if (otpDetails) {
      let IntNumber = parseInt(otpDetails.phone_no.substring(0, 2));
      if (IntNumber !== 94) {
        Axios.post(
          `${process.env.REACT_APP_LMS_MAIN_URL}/auth/activate_user_by_email/${otpDetails.email}/`,
          {
            otp: otpValue.otp,
          }
        )
          .then(() => {
            setisOTP(false);
            store.addNotification({
              title: "Account Verified Successfully",
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
            if (err.response.data.res) {
              setotpError({ otp: err.response.data.res });
            } else if (err.response.data.message) {
              setotpError({ otp: err.response.data.message });
            } else {
              setotpError({ otp: "Phone Number Invalid" });
            }
          });
      } else {
        Axios.post(
          `${process.env.REACT_APP_LMS_MAIN_URL}/auth/activate_user/${otpDetails.phone_no}/`,
          {
            otp: otpValue.otp,
          }
        )
          .then((res) => {
            setisOTP(false);
            logToAccount(res.data.token);
            store.addNotification({
              title: "Account Verified Successfully",
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
            if (err.response.data.res) {
              setotpError({ otp: err.response.data.res });
            } else if (err.response.data.message) {
              setotpError({ otp: err.response.data.message });
            } else {
              setotpError({ otp: "Phone Number Invalid" });
            }
          });
      }
    } else {
      setotpError({ otp: "Something Went Wrong" });
    }
  }

  const StartString = () => {
    if (otpDetails) {
      let arr = otpDetails.phone_no.split("");
      let newString = [];
      let length = arr.length;
      for (let i = 0; i < length; i++) {
        if (i < length - 3) {
          newString.push("*");
        } else {
          newString.push(arr[i]);
        }
      }
      return newString.join("");
    }
  };

  function logToAccount(data) {
    if (Object.keys(data).length !== 0) {
      localStorage.setItem("usValues", JSON.stringify({})); //remove values in local storage
      if (localStorage.getItem("usValues") === null) {
        localStorage.setItem("usValues", JSON.stringify(data)); //for save to local storage
      } else if (
        localStorage.getItem("usValues") !== null &&
        Object.keys(JSON.parse(localStorage.getItem("usValues"))).length === 0
      ) {
        localStorage.setItem("usValues", JSON.stringify(data)); //for save to local storage
      }
    }

    if (!data.user.is_band && data.user.is_verified) {
      history.push("/audiencedashboard/maindashboard");
    } else if (data.user.is_band && data.user.is_verified) {
      history.push("/band/allevents");
    }
  }

  return (
    <div>
      <div className="otp_model_outer" onClick={closingModel}>
        <div className="otp_model">
          <div className="close">
            <button className="close_model" onClick={() => setisOTP(false)}>
              <i className="fas fa-times-circle"></i>
            </button>
          </div>
          <h1>Please Enter The One Time Password To Verify Account</h1>
          <h2>
            A Code Has Been Sent To{" "}
            {parseInt(otpDetails.phone_no.substring(0, 2)) !== 94 ? (
              otpDetails.email
            ) : (
              <StartString />
            )}
          </h2>
          <div className="subm">
            <form onSubmit={otpSubmit}>
              <p>
                <input
                  type="text"
                  name="otp"
                  value={otpValue.otp}
                  onChange={SetValue}
                  onFocus={hideError}
                />
                {otpError.otp && (
                  <span className={`tip ${isotpError.otp ? "hidetip" : ""}`}>
                    {otpError.otp}
                  </span>
                )}
              </p>
              <div className="but">
                <button type="submit">Validate</button>
                <p>
                  Didn't Get The Code?{" "}
                  {counter <= 0 ? (
                    <span onClick={resend}>Resend It</span>
                  ) : (
                    counter + "s"
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpModel;
