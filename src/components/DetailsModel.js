import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../assets/css/detailsModel.css";

function DetailsModel() {
  const [visible, setvisible] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const [values, setvalues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, seterrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [hide, sethide] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });

  useEffect(() => {
    let popStatus = localStorage.getItem("popStatus");
    if (!popStatus) {
      setvisible(true);
    }
  }, []);

  const valueSet = (e) => {
    const { value, name } = e.target;
    setvalues({ ...values, [name]: value });
  };

  let error = {};
  const submit = (e) => {
    e.preventDefault();

    // validate
    if (!values.firstName.trim()) {
      error.firstName = "First Name Is Required";
    }
    if (values.firstName.length > 8) {
      error.firstName = "First Name Must Be Less Than 8 Characters";
    }
    if (!values.lastName.trim()) {
      error.lastName = "Last Name Is Required";
    }
    if (values.lastName.length > 8) {
      error.lastName = "Last Name Must Be Less Than 8 Characters";
    }
    if (!values.email.trim()) {
      error.email = "Email Is Required";
    }
    if (!values.phoneNumber.trim()) {
      error.phoneNumber = "Phone Number Is Required";
    }
    if (values.phoneNumber.length > 15) {
      error.phoneNumber = "Phone Number Must Be Less Than 15 Characters";
    }
    seterrors(error);
    setisSubmitting(true);

    sethide({
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
    });
  };

  const hideError = (e) => {
    Object.entries(errors).map(([keys, val]) => {
      if (keys === e.target.name && val !== "") {
        sethide({ ...hide, [e.target.name]: true });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [errors]);

  function submitForm() {
    console.log(usDetails);
    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/show/collectdata/`,
      {
        username: usDetails.id,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone_number: values.phoneNumber,
      },
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    )
      .then(() => {
        localStorage.setItem("popStatus", true);
        setvisible(false);
        //showing alert
        store.addNotification({
          title: "Successfully Submitted",
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
        console.log(err);
      });
  }

  /*model disable */
  const disable = (e) => {
    if (e.target.className.includes("detail-outer")) {
      localStorage.setItem("popStatus", true);
      setvisible(false);
    }
    if (e.target.className.includes("close")) {
      localStorage.setItem("popStatus", true);
      setvisible(false);
    }
  };

  return (
    <>
      {visible ? (
        <div className="detail-outer" onClick={disable}>
          <div className="details-model">
            <div className="close">
              <button className="close" onClick={disable}>
                <i className="fas fa-times-circle"></i>
              </button>
            </div>
            <form onSubmit={submit}>
              <div className="sec">
                <p>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={valueSet}
                    onFocus={hideError}
                  />
                  {errors.firstName && (
                    <span className={`tip ${hide.firstName ? "hidetip" : ""}`}>
                      {errors.firstName}
                    </span>
                  )}
                </p>
                <p>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={valueSet}
                    onFocus={hideError}
                  />
                  {errors.lastName && (
                    <span className={`tip ${hide.lastName ? "hidetip" : ""}`}>
                      {errors.lastName}
                    </span>
                  )}
                </p>
              </div>
              <div className="sec">
                <p>
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    onChange={valueSet}
                    onFocus={hideError}
                  />
                  {errors.email && (
                    <span className={`tip ${hide.email ? "hidetip" : ""}`}>
                      {errors.email}
                    </span>
                  )}
                </p>
                <p>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    onChange={valueSet}
                    onFocus={hideError}
                  />
                  {errors.phoneNumber && (
                    <span
                      className={`tip ${hide.phoneNumber ? "hidetip" : ""}`}
                    >
                      {errors.phoneNumber}
                    </span>
                  )}
                </p>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default DetailsModel;
