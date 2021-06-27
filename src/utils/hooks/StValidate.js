import Axios from "axios";
import { useEffect, useState } from "react";
import { store } from "react-notifications-component";

function StValidate(ValidateSignUp) {
  const [values, setvalues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phonenumber: "",
    pw: "",
    cpw: "",
  });
  //state for errors
  const [errors, seterrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phonenumber: "",
    pw: "",
    cpw: "",
  });
  const [isSubmetting, setisSubmetting] = useState(false);
  const [hide, sethide] = useState({
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    phonenumber: false,
    pw: false,
    cpw: false,
  });
  const [ac, setac] = useState(false);

  //pass these errors to form
  const hadelChanege = (e) => {
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

  const hadelSubmit = (e) => {
    e.preventDefault();
    //handel errors
    //function thar validate these errors
    seterrors(ValidateSignUp(values));
    setisSubmetting(true);

    sethide({
      firstName: false,
      lastName: false,
      userName: false,
      email: false,
      phonenumber: false,
      pw: false,
      cpw: false,
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
    if (Object.keys(errors).length === 0 && isSubmetting) {
      submit();
    }
  }, [errors]);
  function submit() {
    Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/auth/register/ `, {
      username: values.userName.toUpperCase(),
      email: values.email,
      password: values.cpw,
      is_band: false,
      first_name: values.firstName,
      last_name: values.lastName,
      phone_no: values.phonenumber,
    })
      .then((res) => {
        setac(true);
        //showing alert
        store.addNotification({
          title: "Successfully Registered",
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
        if (err.response) {
          let backErrors = err.response.data;
          if (backErrors) {
            Object.entries(backErrors).map(([keys, val]) => {
              if (keys === "username") {
                backErrors = { ...backErrors, userName: val };
                delete backErrors.username;
              }
              seterrors({ ...errors, ...backErrors });
            });
          }
        }
      });
  }

  return [hadelChanege, hadelSubmit, values, errors, hideError, hide, ac];
}

export default StValidate;
