import Axios from "axios";
import React, { useState } from "react";
import { store } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import { loadStDetails } from "../../actions/stDetailsAction";
import UseStprofileUpdate from "../../utils/hooks/Student/UseStprofileUpdate";
import UserChangedPassword from "../UserChangedPassword";
import StAcDetailsSettingsFrm from "./StAcDetailsSettingsFrm";

export default function StProfileSettings({ setsettings }) {
  const {
    values,
    hadelChange,
    hadelSubmitForm,
    hideError,
    errors,
    hide,
    seterrors,
    setvalues,
    isOtp,
    setisOtp,
  } = UseStprofileUpdate(submit);

  const [loading, setloading] = useState(false);

  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const { initialState } = useSelector((state) => state.StudentDetails);
  const dispatch = useDispatch();

  function submit() {
    let all_data = new FormData();

    all_data.append("first_name", values.firstName);
    all_data.append("last_name", values.lastName);
    all_data.append("username", values.userName.toUpperCase());
    all_data.append("phone_no", values.phoneNumber);
    all_data.append("email", values.email);
    all_data.append("address", values.address);
    all_data.append("password", values.pw);
    all_data.append("is_band", false);

    all_data.append("user_description", values.des);
    all_data.append("otp", values.otp);

    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/auth/updateuserotp/${usDetails.id}/`,
      all_data,
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    )
      .then(() => {
        Axios.post(
          `${process.env.REACT_APP_LMS_MAIN_URL}/auth/updateuserprofile/${usDetails.id}/`,
          all_data,
          {
            headers: { Authorization: "Token " + usDetails.key },
          }
        ).then((res) => {
          dispatch(loadStDetails());
          setsettings(false);
          setisOtp(false);
          setvalues({ ...values, pw: "", otp: "" });

          store.addNotification({
            title: "Profile Changed Successfully!",
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
        });
      })
      .catch((err) => {
        if (err.response.data.detail) {
          seterrors({ ...errors, pw: err.response.data.detail });
        } else if (err.response.data.username) {
          seterrors({ ...errors, userName: err.response.data.username[0] });
        } else if (err.response.data.phone_no) {
          seterrors({ ...errors, phoneNumber: err.response.data.phone_no[0] });
        } else if (err.response.data.phone) {
          seterrors({ ...errors, phoneNumber: err.response.data.phone });
        } else if (err.response.data.email) {
          seterrors({ ...errors, email: err.response.data.email });
        } else {
          seterrors({ ...errors, otp: err.response.data.message });
        }
      });
  }

  function getOtp(e) {
    setloading(true);
    e.preventDefault();

    Axios.get(
      `${process.env.REACT_APP_LMS_MAIN_URL}/auth/getotp/${initialState.user.username}/${values.email}/${values.phoneNumber}/`
    )
      .then((res) => {
        setisOtp(true);
        setloading(false);
        store.addNotification({
          title: "Verification Code Sent to " + res.data.mobile,
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
        setloading(false);
        if (err.response.data.phone_no) {
          seterrors({ ...errors, phoneNumber: err.response.data.phone_no[0] });
        } else if (err.response.data.phone) {
          seterrors({ ...errors, phoneNumber: err.response.data.phone });
        } else if (err.response.data.email) {
          seterrors({ ...errors, email: err.response.data.email });
        } else {
          seterrors({ ...errors, otp: err.response.data.message });
        }
      });
  }

  return (
    <div>
      <div className="tc_profile_settings">
        <div className="ac_det">
          <h2>Account Settings</h2>
          <StAcDetailsSettingsFrm
            values={values}
            hadelChange={hadelChange}
            hadelSubmitForm={hadelSubmitForm}
            hideError={hideError}
            errors={errors}
            hide={hide}
            isOtp={isOtp}
            getOtp={getOtp}
            loading={loading}
          />
        </div>
        <div className="set_password">
          <UserChangedPassword setsettings={setsettings} />
        </div>
      </div>
    </div>
  );
}
