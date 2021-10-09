import React from "react";

export default function StAcDetailsSettingsFrm({
  values,
  hadelChange,
  hadelSubmitForm,
  hideError,
  errors,
  hide,
  isOtp,
  getOtp,
  loading,
}) {
  return (
    <div>
      <form onSubmit={!isOtp ? getOtp : hadelSubmitForm}>
        <div className="sectpr">
          <p>
            <label htmlFor="fn">First Name</label>
            <input
              type="text"
              id="fn"
              name="firstName"
              value={values.firstName || ""}
              onChange={hadelChange}
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
              id="ln"
              name="lastName"
              value={values.lastName || ""}
              onChange={hadelChange}
              onFocus={hideError}
            />
            {errors.lastName && (
              <span className={`tip ${hide.lastName ? "hidetip" : ""}`}>
                {errors.lastName}
              </span>
            )}
          </p>
        </div>
        <div className="sectpr">
          <p>
            <label htmlFor="un">Username</label>
            <input
              type="text"
              id="un"
              name="userName"
              style={{ textTransform: "uppercase" }}
              value={values.userName || ""}
              onChange={hadelChange}
              onFocus={hideError}
            />
            {errors.userName && (
              <span className={`tip ${hide.userName ? "hidetip" : ""}`}>
                {errors.userName}
              </span>
            )}
          </p>
          <p>
            <label htmlFor="pn">Phone Number</label>
            <input
              type="text"
              id="pn"
              name="phoneNumber"
              value={values.phoneNumber || ""}
              onChange={hadelChange}
              onFocus={hideError}
            />
            {errors.phoneNumber && (
              <span className={`tip ${hide.phoneNumber ? "hidetip" : ""}`}>
                {errors.phoneNumber}
              </span>
            )}
          </p>
        </div>
        <div className="sectpr">
          <p>
            <label htmlFor="ad">Email</label>
            <input
              type="text"
              id="em"
              name="email"
              value={values.email || ""}
              onChange={hadelChange}
              onFocus={hideError}
            />
            {errors.email && (
              <span className={`tip ${hide.email ? "hidetip" : ""}`}>
                {errors.email}
              </span>
            )}
          </p>
        </div>
        <div className="sectpr">
          <p>
            <label htmlFor="ad">Descriptions</label>
            <textarea
              cols="30"
              rows="10"
              name="des"
              value={
                values.des === "null" || values.des === null ? "" : values.des
              }
              onChange={hadelChange}
              onFocus={hideError}
            ></textarea>
            {errors.des && (
              <span className={`tip ${hide.des ? "hidetip" : ""}`}>
                {errors.des}
              </span>
            )}
          </p>
        </div>
        <div className="sectpr">
          <p>
            <label htmlFor="pw" style={{ fontWeight: "bold" }}>
              Password
            </label>
            <input
              type="password"
              name="pw"
              id="pw"
              value={values.pw}
              onChange={hadelChange}
              onFocus={hideError}
              style={{ borderColor: "#f57100" }}
            />
            {errors.pw && (
              <span className={`tip ${hide.pw ? "hidetip" : ""}`}>
                {errors.pw}
              </span>
            )}
          </p>
        </div>
        {isOtp ? (
          <div className="sectpr">
            <p>
              <label htmlFor="otp" style={{ fontWeight: "bold" }}>
                OTP
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={values.otp}
                onChange={hadelChange}
                onFocus={hideError}
                style={{ borderColor: "#f57100" }}
              />
              {errors.otp && (
                <span className={`tip ${hide.otp ? "hidetip" : ""}`}>
                  {errors.otp}
                </span>
              )}
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="pro_edit_sub">
          <button>
            {loading ? <i className="fas fa-circle-notch rotate"></i> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
