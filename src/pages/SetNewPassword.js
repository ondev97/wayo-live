import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { activeAccount } from "../actions";
import logo from "../img/Logo_1.png";

function SetNewPassword() {
  const dispatch = useDispatch();
  const [values, setvalues] = useState({ newpassword: "", retype: "" });
  const [error, seterror] = useState({
    newpassword: "",
    retype: "",
    comerror: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);
  const [hide, sethide] = useState({ newpassword: false, retype: false });

  const [readOnly, setreadOnly] = useState("");
  const [redirect, setredirect] = useState(false);

  useEffect(() => {
    dispatch(activeAccount());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmitting) {
      submit();
    }
  }, [error]);

  const handelvalue = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    //hadlling errors
    seterror(ValidateLogin(values));
    setisSubmitting(true);
    sethide({ un: false, pw: false });
  };
  if (redirect) {
    return <Redirect to={"/"} />;
  }

  const hideError = (e) => {
    Object.entries(error).map(([keys, val]) => {
      if (keys === e.target.name && val !== "") {
        sethide({ ...hide, [e.target.name]: true });
      }
    });
  };

  let ValidateLogin = (values) => {
    let error = {};

    if (!values.newpassword.trim()) {
      error.newpassword = "Please Enter New Password";
    } else {
      if (values.newpassword.length < 8) {
        error.newpassword = "New Password Must Be More Than 8 Characters";
      }
    }
    if (!values.newpassword.trim()) {
      error.retype = "Please Enter Retype Password";
    } else {
      if (values.retype.length < 8) {
        error.retype = "Retype Password Must Be More Than 8 Characters";
      }
    }
    if (values.newpassword !== values.retype) {
      error.retype = "Retype Password Invalid";
    }

    return error;
  };

  function submit() {}

  return (
    <div className="login_body">
      <div className="login_column">
        <div className="login_form" style={{ padding: "25px 0" }}>
          <div className="topSign">
            <h2>Enter The New Password</h2>
          </div>
          <form>
            <p>
              <label htmlFor="em">New Password</label>
              <input
                type="password"
                value={values.newpassword}
                onChange={handelvalue}
                placeholder={"Enter the New Password"}
                name="newpassword"
                id="em"
                onFocus={hideError}
              />
              {error.newpassword && (
                <span className={`tip ${hide.newpassword ? "hidetip" : ""}`}>
                  {error.newpassword}
                </span>
              )}
            </p>
            <p>
              <label htmlFor="rm">Retype Password</label>
              <input
                type="password"
                value={values.retype}
                onChange={handelvalue}
                placeholder={"Retype Password"}
                name="retype"
                id="rm"
                onFocus={hideError}
              />
              {error.retype && (
                <span className={`tip ${hide.retype ? "hidetip" : ""}`}>
                  {error.retype}
                </span>
              )}
            </p>
            <div className="but">
              <input
                onClick={handlesubmit}
                type="button"
                value="Changed Password"
                name="submit"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="login_column">
        <div className="image_login">
          <img src={logo} alt="" />
        </div>
      </div>
    </div>
  );
}

export default SetNewPassword;
