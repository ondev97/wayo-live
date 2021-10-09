import Axios from "axios";
import { useEffect, useState } from "react";
import { store } from "react-notifications-component";
import "../assets/css/userDetailsModel.css";
import validation from "./ValidateProfileSettings";

function UserDeteailsCol({ otpDetails, setusForm }) {
  const [values, setvalues] = useState({
    firstName: "",
    lastName: "",
    userName: otpDetails.username || "",
    phoneNumber: "",
    email: "",
    pw: "",
  });
  const [errors, seterrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    pw: "",
  });
  const [hide, sethide] = useState({
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    phoneNumber: false,
    pw: "",
  });
  const [isSibmitting, setisSibmitting] = useState(false);
  const [conformModel, setconformModel] = useState(false);

  //set values to states
  const hadelChange = (e) => {
    const { name, value } = e.target;
    if (e.target.id === "un") {
      setvalues({
        ...values,
        [name]: value.trim(),
      });
    } else {
      setvalues({
        ...values,
        [name]: value,
      });
    }
  };

  const hideError = (e) => {
    Object.entries(errors).map(([keys, val]) => {
      if (keys === e.target.name && val !== "") {
        sethide({ ...hide, [e.target.name]: true });
      }
    });
  };

  //hadel form submit
  const hadelSubmitForm = (e) => {
    e.preventDefault();
    //hadlling errors
    seterrors(validation(values));
    sethide({
      firstName: false,
      lastName: false,
      userName: false,
      email: false,
      phoneNumber: false,
      phonenumber: false,
      des: false,
      pw: false,
    });
    setisSibmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSibmitting) {
      submit();
    }
  }, [errors]);

  function submit() {
    setconformModel(true);
  }

  function submitConfirm() {
    setconformModel(false);
    let all_data = new FormData();

    all_data.append("first_name", values.firstName);
    all_data.append("last_name", values.lastName);
    all_data.append("username", values.userName.toUpperCase());
    all_data.append("phone_no", values.phoneNumber);
    all_data.append("email", values.email);
    all_data.append("password", values.pw);
    all_data.append("is_band", false);

    Axios.put(
      `${process.env.REACT_APP_LMS_MAIN_URL}/auth/updateuser/${otpDetails.user_id}/`,
      all_data
    )
      .then(() => {
        store.addNotification({
          title: "Profile Updated Successfully",
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
        setusForm(false);
      })
      .catch((err) => {
        if (err.response.data.detail) {
          seterrors({ ...errors, pw: err.response.data.detail });
        }
        if (err.response.data.username) {
          seterrors({ ...errors, userName: err.response.data.username });
        }
        if (err.response.data.email) {
          seterrors({ ...errors, email: err.response.data.email });
        }
        if (err.response.data.phone_no) {
          seterrors({ ...errors, phoneNumber: err.response.data.phone_no });
        }
        if (err.response.data.message) {
          seterrors({ ...errors, pw: err.response.data.message });
        }
      });
  }

  const closeModel = (e) => {
    if (e.target.className.includes("outer_user_form")) {
      setusForm(false);
    }
  };

  const closeConfirmModel = (e) => {
    if (e.target.className.includes("conformmodel_outer")) {
      setconformModel(false);
    }
  };

  return (
    <div className="outer_user_form">
      {/* conformation model */}
      {conformModel ? (
        <div className="conformmodel_outer" onClick={closeConfirmModel}>
          <div className="conformmodel">
            <h3>
              If you are a local user you will receive the OTP to your mobile.
              In case of being a foreign user OTP will be received to the
              provided email.
            </h3>
            <div className="but">
              <button onClick={submitConfirm}>Yes</button>
              <button onClick={() => setconformModel(false)}>No</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="form_bg">
        {/* close button */}
        {/* <div className="close">
          <button className="close_model" onClick={() => setusForm(false)}>
            <i className="fas fa-times-circle"></i>
          </button>
        </div> */}
        <h1>BECOME A WAYAN</h1>
        <h3>
          To get started, please insert the below details and register in WAYO
          LIVE.
        </h3>
        <form onSubmit={hadelSubmitForm}>
          <div className="sect">
            <p>
              <label htmlFor="fn">First Name</label>
              <input
                type="text"
                name="firstName"
                id="fn"
                value={values.firstName}
                onChange={hadelChange}
                className={errors.firstName ? "error" : ""}
                onFocus={hideError}
              />
              {errors.firstName && (
                <span className={`tip ${hide.firstName ? "hidetip" : ""}`}>
                  {errors.firstName}
                </span>
              )}
            </p>
            <p>
              <label htmlFor="ln">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="ln"
                value={values.lastName}
                onChange={hadelChange}
                className={errors.lastName ? "error" : ""}
                onFocus={hideError}
              />
              {errors.lastName && (
                <span className={`tip ${hide.lastName ? "hidetip" : ""}`}>
                  {errors.lastName}
                </span>
              )}
            </p>
          </div>
          <div className="sect sect2">
            <p>
              <label htmlFor="un">Username</label>
              <input
                type="text"
                name="userName"
                id="un"
                min="6"
                value={values.userName || ""}
                onChange={hadelChange}
                className={errors.userName ? "error" : ""}
                onFocus={hideError}
                style={{ textTransform: "uppercase" }}
                disabled
              />
              {errors.userName && (
                <span className={`tip ${hide.userName ? "hidetip" : ""}`}>
                  {errors.userName}
                </span>
              )}
            </p>
            <p>
              <label htmlFor="em">Phone Number</label>
              <div className="small">Keep The Mobile Phone With You</div>
              <input
                type="text"
                name="phoneNumber"
                id="pn"
                value={values.pn}
                onChange={hadelChange}
                className={errors.phoneNumber ? "error" : ""}
                onFocus={hideError}
                placeholder="94713456789"
              />
              {errors.phoneNumber && (
                <span className={`tip ${hide.phoneNumber ? "hidetip" : ""}`}>
                  {errors.phoneNumber}
                </span>
              )}
            </p>
          </div>
          <div className="sect">
            <p>
              <label htmlFor="em">Email</label>
              <input
                type="text"
                name="email"
                id="em"
                value={values.email}
                onChange={hadelChange}
                className={errors.email ? "error" : ""}
                onFocus={hideError}
              />
              {errors.email && (
                <span className={`tip ${hide.email ? "hidetip" : ""}`}>
                  {errors.email}
                </span>
              )}
            </p>
            <p>
              <label htmlFor="pw">Password</label>
              <input
                type="Password"
                name="pw"
                id="pw"
                value={values.pw}
                onChange={hadelChange}
                className={errors.pw ? "error" : ""}
                onFocus={hideError}
              />
              {errors.pw && (
                <span className={`tip ${hide.pw ? "hidetip" : ""}`}>
                  {errors.pw}
                </span>
              )}
            </p>
          </div>
          <div className="text">
            <h5>Note</h5>
            If your mobile phone number is 0714563390 <br />
            Type like this 94714563390
          </div>
          {/* <div className="showpw">
            <p>
              <input
                type="checkbox"
                name="showPw"
                id="showpw"
                onChange={(e) => showPassword(e)}
              />
              <label htmlFor="showpw">Show Password</label>
            </p>
          </div> */}
          <div className="but">
            <button>Complete Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDeteailsCol;
