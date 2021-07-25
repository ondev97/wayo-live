import Axios from "axios";
import React, { useEffect, useState } from "react";
import { store } from "react-notifications-component";
import "../assets/css/otpModel.css";

function OtpModel({ otpDetails, setisOTP }) {
  const [otpValue, setotpValue] = useState({ otp: "" });
  const [otpError, setotpError] = useState({ otp: "" });
  const [isotpError, setisotpError] = useState({ otp: false });
  const [isSubmit, setisSubmit] = useState(false);
  const [reset, setreset] = useState(false);
  const [counter, setCounter] = useState(120);

  const SetValue = (e) => {
    const { name, value } = e.target;
    setotpValue({ ...otpValue, [name]: value });
  };

  useEffect(() => {
    if (otpDetails) {
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
      Axios.post(
        `${process.env.REACT_APP_LMS_MAIN_URL}/auth/activate_user/${otpDetails.phone_no}/`,
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
      setotpError({ otp: "Something Went Wrong" });
    }
  }

  return (
    <div>
      <div className="otp_model_outer">
        <div className="otp_model">
          <h1>Please Enter The One Time Password To Verify Account</h1>
          <h2>A Code Has Been Sent To *******962</h2>
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
