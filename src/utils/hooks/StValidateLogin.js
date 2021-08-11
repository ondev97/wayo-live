import Axios from "axios";
import { useEffect, useState } from "react";
import ValidateLogin from "../../components/ValidateLogin";

function StValidateLogin(setisOTP, setusForm, setotpDetails) {
  const [values, setvalues] = useState({ un: "", pw: "" });
  const [errors, seterrors] = useState({ un: "", pw: "", comerrors: "" });
  const [isSubmitting, setisSubmitting] = useState(false);
  const [hide, sethide] = useState({ un: false, pw: false });
  const [loading, setloading] = useState(false);

  const [acDetails, setacDetails] = useState({});

  const hadelOnChange = (e) => {
    console.log(e.target.id);
    const { name, value } = e.target;
    if (e.target.id === "em") {
      setvalues({
        ...values,
        [name]: value.trim(),
      });
    } else {
      setvalues({ ...values, [name]: value });
    }
  };

  const hadelSubmit = (e) => {
    e.preventDefault();
    //hadlling errors
    seterrors(ValidateLogin(values));
    setisSubmitting(true);
    sethide({ un: false, pw: false });
  };

  const hideError = (e) => {
    Object.entries(errors).map(([keys, val]) => {
      if (keys === e.target.name && val !== "") {
        sethide({ ...hide, [e.target.name]: true });
      }
    });
  };

  function submit() {
    setloading(true);
    Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/auth/checkuser/`, {
      username: values.un.toUpperCase(),
      password: values.pw,
    })
      .then((res) => {
        if (res.data.is_verified) {
          if (!res.data.status) {
            Axios.post(
              `${process.env.REACT_APP_LMS_MAIN_URL}/auth/dj-rest-auth/login/`,
              {
                username: values.un.toUpperCase(),
                password: values.pw,
              }
            )
              .then((res) => {
                setacDetails(res.data);
                setloading(false);
              })
              .catch((err) => {
                seterrors({
                  ...errors,
                  comerrors: err.response.data.non_field_errors,
                });
                setloading(false);
              });
          } else {
            seterrors({
              ...errors,
              comerrors: "Someone is already logged into this account",
            });
            setloading(false);
          }
        } else {
          setotpDetails(res.data);
          setloading(false);
          if (!res.data.completed_user) {
            setusForm(true);
          } else {
            setisOTP(true);
          }
        }
      })
      .catch((err) => {
        //check err and set state
        //console.log(err.response.data);
        if (err.response.data) {
          if (err.response.data.non_field_errors) {
            seterrors({
              ...errors,
              comerrors: err.response.data.non_field_errors,
            });
          }
          setloading(false);
        }
      });

    // Axios.post(
    //   `${process.env.REACT_APP_LMS_MAIN_URL}/auth/dj-rest-auth/login/`,
    //   {
    //     username: values.un.toUpperCase(),
    //     password: values.pw,
    //   }
    // )
    //   .then((res) => {
    //     setacDetails(res.data);
    //setloading(false)
    //   })
    //   .catch((err) => {
    //     seterrors({ ...errors, comerrors: err.response.data.non_field_errors });
    //   });
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submit();
    }
  }, [errors]);

  //save data in Local Storage
  useEffect(() => {
    if (Object.keys(acDetails).length !== 0) {
      localStorage.setItem("usValues", JSON.stringify({})); //remove values in local storage
      if (localStorage.getItem("usValues") === null) {
        localStorage.setItem("usValues", JSON.stringify(acDetails)); //for save to local storage
      } else if (
        localStorage.getItem("usValues") !== null &&
        Object.keys(JSON.parse(localStorage.getItem("usValues"))).length === 0
      ) {
        localStorage.setItem("usValues", JSON.stringify(acDetails)); //for save to local storage
      }
    }
  }, [acDetails]);

  return [
    values,
    hadelOnChange,
    hadelSubmit,
    errors,
    seterrors,
    hideError,
    hide,
    acDetails,
    loading,
  ];
}

export default StValidateLogin;
