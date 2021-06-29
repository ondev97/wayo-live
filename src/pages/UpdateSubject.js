import React, { useState } from "react";
import CropImages from "../utils/hooks/CropImages";
import UpdateSubjectFunc from "../utils/hooks/SubjectUpdateValidation";
import Axios from "axios";
import { useSelector } from "react-redux";
import { store } from "react-notifications-component";
import { Redirect, useHistory, useParams } from "react-router-dom";
import UpdateSujectForm from "../components/UpdateSujectForm";
import UpdateEveHead from "../components/UpdateEventHead";

export default function UpdateSubject() {
  const { subid } = useParams();
  const {
    hadelChabgeFormValues,
    formValue,
    handelSubmit,
    hideError,
    hide,
    sethide,
    formErrors,
    setformValue,
    setisFree,
    isFree,
  } = UpdateSubjectFunc(submitForm, subid);
  const [image, getCropData, setCropper, onChange, cropData, err, file] =
    CropImages(); //custom hook
  const [showCropper, setshowCropper] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [isredirect, setisredirect] = useState(false);
  const history = useHistory();

  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  //function for base64 to blob
  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  function submitForm() {
    let form_data = new FormData();

    if (cropData !== "#") {
      let input = cropData.split(",")[1];
      const blob = b64toBlob(input, file.type);
      form_data.append("event_cover", blob, file.name);
    }

    form_data.append("event_name", formValue.event_name);
    form_data.append("description", formValue.event_short_description);
    form_data.append("event_content", formValue.event_content);
    form_data.append("event_date", formValue.event_date);
    form_data.append("event_end", formValue.event_end);
    form_data.append("event_start", formValue.event_start);
    form_data.append("event_label", formValue.event_label);
    form_data.append("event_price", formValue.event_price);
    form_data.append("event_type", formValue.event_type);
    form_data.append("is_freeze", formValue.is_freeze);

    Axios.put(
      `${process.env.REACT_APP_LMS_MAIN_URL}/show/updateevent/${subid}/${formValue.event_category}/`,
      form_data,
      {
        headers: { Authorization: "Token " + usDetails.key },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.isTrusted) {
            setisUploading(true);
          }
        },
      }
    )
      .then(() => {
        setisUploading(false);
        //showing alert
        store.addNotification({
          title: "Event Updated!",
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
        setisredirect(true);
      })
      .catch((e) => {});
  }

  if (isredirect) {
    return <Redirect to="/band/allevents" />;
  }
  return (
    <div className="subject_form">
      <button onClick={() => history.goBack()}>
        <i className="fas fa-chevron-circle-left"></i>Back to Events
      </button>
      <UpdateEveHead
        hadelChabgeFormValues={hadelChabgeFormValues}
        formValue={formValue}
        handelSubmit={handelSubmit}
        hideError={hideError}
        hide={hide}
        formErrors={formErrors}
        setformValue={setformValue}
      />
      <div className="main_form">
        <UpdateSujectForm
          hadelChabgeFormValues={hadelChabgeFormValues}
          handelSubmit={handelSubmit}
          hideError={hideError}
          hide={hide}
          sethide={sethide}
          formErrors={formErrors}
          image={image}
          getCropData={getCropData}
          setCropper={setCropper}
          onChange={onChange}
          err={err}
          showCropper={showCropper}
          setshowCropper={setshowCropper}
          isUploading={isUploading}
          formValue={formValue}
          cropData={cropData}
          setformValue={setformValue}
          setisFree={setisFree}
          isFree={isFree}
        />
      </div>
    </div>
  );
}
