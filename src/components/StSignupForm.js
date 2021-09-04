import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import StValidate from "../utils/hooks/StValidate";
import ValidateSignUp from "./ValidateSignUp";

export default function StSignupForm() {
  const [hadelChanege, hadelSubmit, values, errors, hideError, hide, ac] =
    StValidate(ValidateSignUp); //custom hook

  const passwordRef = useRef();
  const repasswordRef = useRef();

  //function for trigger show password field
  const showPassword = (e) => {
    let checked = e.target.checked;

    if (checked) {
      passwordRef.current.type = "text";
      repasswordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
      repasswordRef.current.type = "password";
    }
  };

  if (ac) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form onSubmit={hadelSubmit}>
        <div className="sect">
          <p>
            <label htmlFor="fn">First Name</label>
            <input
              type="text"
              name="firstName"
              id="fn"
              value={values.firstName}
              onChange={hadelChanege}
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
              onChange={hadelChanege}
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
        <div className="sect">
          <p>
            <label htmlFor="un">Username</label>
            <input
              type="text"
              name="userName"
              id="un"
              min="6"
              value={values.userName}
              onChange={hadelChanege}
              className={errors.userName ? "error" : ""}
              onFocus={hideError}
              style={{ textTransform: "uppercase" }}
            />
            {errors.userName && (
              <span className={`tip ${hide.userName ? "hidetip" : ""}`}>
                {errors.userName}
              </span>
            )}
          </p>
          <p>
            <label htmlFor="em">Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              id="pn"
              value={values.pn}
              onChange={hadelChanege}
              className={errors.phonenumber ? "error" : ""}
              onFocus={hideError}
              placeholder="94700000000"
            />
            {errors.phonenumber && (
              <span className={`tip ${hide.phonenumber ? "hidetip" : ""}`}>
                {errors.phonenumber}
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
              placeholder="abc@example.com"
              value={values.email}
              onChange={hadelChanege}
              className={errors.email ? "error" : ""}
              onFocus={hideError}
            />
            {errors.email && (
              <span className={`tip ${hide.email ? "hidetip" : ""}`}>
                {errors.email}
              </span>
            )}
          </p>
        </div>
        <div className="sect">
          <p>
            <label htmlFor="pw">Password</label>
            <input
              type="Password"
              name="pw"
              id="pw"
              value={values.pw}
              onChange={hadelChanege}
              className={errors.pw ? "error" : ""}
              onFocus={hideError}
              ref={passwordRef}
            />
            {errors.pw && (
              <span className={`tip ${hide.pw ? "hidetip" : ""}`}>
                {errors.pw}
              </span>
            )}
          </p>
          <p>
            <label htmlFor="cpw">Retype Password</label>
            <input
              type="password"
              name="cpw"
              id="cpw"
              value={values.cpw}
              onChange={hadelChanege}
              className={errors.cpw ? "error" : ""}
              onFocus={hideError}
              ref={repasswordRef}
            />
            {errors.cpw && (
              <span className={`tip ${hide.cpw ? "hidetip" : ""}`}>
                {errors.cpw}
              </span>
            )}
          </p>
        </div>
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
        <div className="but">
          <button>Register</button>
          <div className="in">
            <p>
              Already Have An Account?<Link to="/"> Log In Here</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
