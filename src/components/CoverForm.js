import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import StValidateLogin from "../utils/hooks/StValidateLogin";

export default function CoverForm({
  setisModel,
  setisOTP,
  setusForm,
  setotpDetails,
}) {
  const [
    values,
    hadelOnChange,
    hadelSubmit,
    errors,
    seterrors,
    hideError,
    hide,
    acDetails,
    loading,
  ] = StValidateLogin(setisOTP, setusForm, setotpDetails);
  const passwordRef = useRef();

  //function for trigger show password field
  const showPassword = (e) => {
    let checked = e.target.checked;

    if (checked) {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  if (Object.values(acDetails).length !== 0) {
    if (!acDetails.user.is_band && acDetails.user.is_verified) {
      return <Redirect to="/audiencedashboard/maindashboard" />;
    } else if (acDetails.user.is_band && acDetails.user.is_verified) {
      return <Redirect to="/band/allevents" />;
    }
  }
  return (
    <>
      <form onSubmit={hadelSubmit}>
        {errors.comerrors && (
          <p className={`comtip ${hide.un ? "hidetip" : ""}`}>
            {errors.comerrors}
          </p>
        )}
        <p>
          <label htmlFor="em">Username</label>
          <input
            type="text"
            name="un"
            id="em"
            value={values.un}
            onChange={hadelOnChange}
            className={errors.un ? "error" : ""}
            onFocus={hideError}
            style={{ textTransform: "uppercase" }}
          />
          {errors.un && (
            <span className={`tip ${hide.un ? "hidetip" : ""}`}>
              {errors.un}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="pw">Password</label>
          <input
            type="password"
            name="pw"
            id="pw"
            value={values.pw}
            onChange={hadelOnChange}
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
          <button type="submit">
            {loading ? <i className="fas fa-circle-notch rotate"></i> : "LogIn"}
          </button>

          <div className="fpw">
            <p>
              <Link to="/passwordreset">Forgot Password?</Link>
            </p>
            <p
              onClick={() => {
                seterrors({ ...errors, comerrors: "" });
                setisModel(true);
              }}
            >
              Clear Login Session
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
