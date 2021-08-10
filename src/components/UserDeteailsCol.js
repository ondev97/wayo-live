import React from "react";
import "../assets/css/userDetailsModel.css";

function UserDeteailsCol() {
  return (
    <div className="outer_user_form">
      <div className="form_bg">
        <div className="close">
          <button className="close_model">
            <i className="fas fa-times-circle"></i>
          </button>
        </div>
        <h1>
          orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </h1>
        <form>
          <div className="sect">
            <p>
              <label htmlFor="fn">First Name</label>
              <input
                type="text"
                name="firstName"
                id="fn"
                // value={values.firstName}
                // onChange={hadelChanege}
                // className={errors.firstName ? "error" : ""}
                // onFocus={hideError}
              />
              {/* {errors.firstName && (
                <span className={`tip ${hide.firstName ? "hidetip" : ""}`}>
                  {errors.firstName}
                </span>
              )} */}
            </p>
            <p>
              <label htmlFor="ln">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="ln"
                // value={values.lastName}
                // onChange={hadelChanege}
                // className={errors.lastName ? "error" : ""}
                // onFocus={hideError}
              />
              {/* {errors.lastName && (
                <span className={`tip ${hide.lastName ? "hidetip" : ""}`}>
                  {errors.lastName}
                </span>
              )} */}
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
                // value={values.userName}
                // onChange={hadelChanege}
                // className={errors.userName ? "error" : ""}
                // onFocus={hideError}
                // style={{ textTransform: "uppercase" }}
              />
              {/* {errors.userName && (
                <span className={`tip ${hide.userName ? "hidetip" : ""}`}>
                  {errors.userName}
                </span>
              )} */}
            </p>
            <p>
              <label htmlFor="em">Phone Number</label>
              <input
                type="text"
                name="phonenumber"
                id="pn"
                // value={values.pn}
                // onChange={hadelChanege}
                // className={errors.phonenumber ? "error" : ""}
                // onFocus={hideError}
                // placeholder="94123456789"
              />
              {/* {errors.phonenumber && (
                <span className={`tip ${hide.phonenumber ? "hidetip" : ""}`}>
                  {errors.phonenumber}
                </span>
              )} */}
            </p>
          </div>
          <div className="sect">
            <p>
              <label htmlFor="em">Email</label>
              <input
                type="text"
                name="email"
                id="em"
                // value={values.email}
                // onChange={hadelChanege}
                // className={errors.email ? "error" : ""}
                // onFocus={hideError}
              />
              {/* {errors.email && (
                <span className={`tip ${hide.email ? "hidetip" : ""}`}>
                  {errors.email}
                </span>
              )} */}
            </p>
            <p>
              <label htmlFor="pw">Password</label>
              <input
                type="Password"
                name="pw"
                id="pw"
                // value={values.pw}
                // onChange={hadelChanege}
                // className={errors.pw ? "error" : ""}
                // onFocus={hideError}
                // ref={passwordRef}
              />
              {/* {errors.pw && (
                <span className={`tip ${hide.pw ? "hidetip" : ""}`}>
                  {errors.pw}
                </span>
              )} */}
            </p>
          </div>
          <div className="showpw">
            <p>
              <input
                type="checkbox"
                name="showPw"
                id="showpw"
                // onChange={(e) => showPassword(e)}
              />
              <label htmlFor="showpw">Show Password</label>
            </p>
          </div>
          <div className="but">
            <button>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDeteailsCol;
