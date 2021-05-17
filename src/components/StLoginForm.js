import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import StValidateLogin from "../utils/hooks/StValidateLogin";

export default function StLoginForm() {
  const [
    values,
    hadelOnChange,
    hadelSubmit,
    errors,
    hideError,
    hide,
    acDetails,
  ] = StValidateLogin();
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
    if (!acDetails.user.is_teacher) {
      return <Redirect to="/studentdashboard/maindashboard" />;
    } else if (acDetails.user.is_teacher) {
      return <Redirect to="/teacherdashboard/managecourse" />;
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
          <label htmlFor="em">Username (Class Number)</label>
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
          <input type="submit" value="Log In" name="submit" />

          <div className="fpw">
            <p>
              <Link to="/passwordreset">Forgot Password?</Link>
            </p>
            {/* <p>
              <Link to="/stsignup">Don't You Have An Account?</Link>
            </p> */}
          </div>
        </div>

        <div className="instruc">
          <p>
            ජාතිකපාසල Student Account සදහා Log වීමට ප්‍රථම ඔබ ජාතිකපාසල හි
            ලියාපදිංචි විය යුතුය. ඒ සදහා ඔබගේ අනන්‍යතාවය ගුරුවරයා වෙත තහවුරු කර
            ඔබගේ student account සදහා අදාල Username සහ Password ලබාගන්න.
            ජාතිකපාසල Student Accounts හි කුමන හෝ තාක්ෂණික ගැටළුවක් පවතීනම් එය
            නිරාකරණය කරගැනීම සදහා ඔබගේ ගුරුවරයා සම්බන්ද කරගන්න.
          </p>
        </div>
      </form>
    </>
  );
}
