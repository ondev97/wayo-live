import Axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import ProfileUpdate from "../utils/hooks/ProfileUpdate";
import AcDetailsSettings from "./AcDetailsSettings";
import UserChangedPassword from "./UserChangedPassword";

function TcProfileSettings({ setsettings }) {
  const [
    hadelChange,
    hadelSubmitForm,
    values,
    errors,
    seterrors,
    hide,
    hideError,
    inputField,
  ] = ProfileUpdate(submit); //custom hook

  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  function submit() {
    let all_data = new FormData();

    all_data.append("first_name", values.firstName);
    all_data.append("last_name", values.lastName);
    all_data.append("username", values.userName.toUpperCase());
    all_data.append("phone_no", values.phoneNumber);
    all_data.append("email", values.email);
    all_data.append("password", values.pw);
    all_data.append("is_band", true);

    all_data.append("user_description", values.des);

    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/auth/updateuser/${usDetails.id}/`,
      all_data,
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    )
      .then(() => {
        Axios.post(
          `${process.env.REACT_APP_LMS_MAIN_URL}/auth/updatebandprofile/${usDetails.id}/`,
          all_data,
          {
            headers: { Authorization: "Token " + usDetails.key },
          }
        ).then(() => {
          window.location.reload(false);
        });
      })
      .catch((err) => {
        if (err.response.data.detail) {
          seterrors({ ...errors, pw: err.response.data.detail });
        } else if (err.response.data.username) {
          seterrors({ ...errors, userName: err.response.data.username });
        } else if (err.response.data.phone) {
          seterrors({ ...errors, phoneNumber: err.response.data.phone });
        } else if (err.response.data.email) {
          seterrors({ ...errors, email: err.response.data.email });
        } else {
          seterrors({ ...errors, com: err.response.data.message });
        }
      });
  }

  return (
    <div>
      <div className="tc_profile_settings">
        <div className="ac_det">
          <h2>Account Settings</h2>
          {errors.com ? (
            <div className="error">
              <p>{errors.com}</p>
            </div>
          ) : (
            ""
          )}
          <AcDetailsSettings
            hadelChange={hadelChange}
            hadelSubmitForm={hadelSubmitForm}
            values={values}
            errors={errors}
            hide={hide}
            hideError={hideError}
            inputField={inputField}
          />
        </div>
        <div className="set_password">
          <UserChangedPassword setsettings={setsettings} />
        </div>
      </div>
    </div>
  );
}

export default TcProfileSettings;
