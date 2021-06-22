import React, { useState } from "react";
import UseCreateSubject from "../utils/hooks/UseCreateSubject";
import CreateSubjectForm from "../components/CreateSubjectForm";
import CropImages from "../utils/hooks/CropImages";
import Axios from "axios";
import { useSelector } from "react-redux";
import { store } from "react-notifications-component";
import { Redirect } from "react-router-dom";
import "../assets/css/creatsubject.css";
import "../assets/css/mediaFiles/createsubmedia.css";
import CreateEventHead from "../components/CreateEventHead";

export default function CreateSubject() {
  const {
    formValue,
    setformValue,
    hadelChabgeFormValues,
    handelSubmit,
    formErrors,
    hide,
    hideError,
    setisFree,
    isFree,
  } = UseCreateSubject(submitForm); //custom hook
  const [image, getCropData, setCropper, onChange, cropData, err, file] =
    CropImages(); //custom hook
  const [redirec, setredirec] = useState(null);
  const [uploading, setuploading] = useState(false);
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
    let formData = new FormData();

    if (cropData !== "#") {
      let input = cropData.split(",")[1];
      const blob = b64toBlob(input, file.type);
      formData.append("event_cover", blob, file.name);
    }

    formData.append("event_name", formValue.event_name);
    formData.append("event_type", formValue.event_type);
    formData.append("description", formValue.event_short_description);
    formData.append("event_date", formValue.event_date);
    formData.append("event_start", formValue.event_start_time);
    formData.append("event_end", formValue.event_end_time);
    formData.append("event_label", formValue.event_label);
    formData.append("event_content", formValue.event_description);
    formData.append("is_freeze", formValue.is_freeze);

    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/show/createevent/${formValue.event_category}/`,
      formData,
      {
        headers: { Authorization: "Token " + usDetails.key },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.isTrusted) {
            setuploading(true);
          }
        },
      }
    )
      .then((res) => {
        setuploading(false);
        //showing alert
        store.addNotification({
          title: "Subject Created!",
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
        setredirec({ id: res.data.id });
      })
      .catch((e) => {});
  }

  if (redirec) {
    return <Redirect to={`/band/createshow`} />;
  }

  return (
    <div className="subject_form">
      <CreateEventHead
        formValue={formValue}
        setformValue={setformValue}
        hadelChabgeFormValues={hadelChabgeFormValues}
        formErrors={formErrors}
        hide={hide}
        hideError={hideError}
      />
      <div className="main_form">
        <CreateSubjectForm
          formValue={formValue}
          setformValue={setformValue}
          hadelChabgeFormValues={hadelChabgeFormValues}
          handelSubmit={handelSubmit}
          formErrors={formErrors}
          hide={hide}
          hideError={hideError}
          image={image}
          getCropData={getCropData}
          setCropper={setCropper}
          onChange={onChange}
          cropData={cropData}
          err={err}
          uploading={uploading}
          setisFree={setisFree}
          isFree={isFree}
        />
      </div>
    </div>
  );
}
