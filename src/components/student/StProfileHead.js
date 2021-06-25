import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { store } from "react-notifications-component";
import { useSelector } from "react-redux";
import CropImages from "../../utils/hooks/CropImages";
import StUploadProPicModel from "./StUploadProPicModel";

export default function StProfileHead() {
  const [showModel, setshowModel] = useState(false);
  const [filePath, setfilePath] = useState("");
  const [imgObjectURL, setimgObjectURL] = useState("");
  const [
    image,
    getCropData,
    setCropper,
    onChange,
    cropData,
    err,
    setImage,
    setCropData,
  ] = CropImages(); //custom hook

  const { initialState } = useSelector((state) => state.StudentDetails);

  const openModel = () => {
    setshowModel(!showModel);
  };

  const removeValue = (e) => {
    e.target.value = "";
  };

  const hadelFileUpload = (e) => {
    if (e.target.files[0] && e.target.files[0].name) {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg"
      ) {
        if (e.target.files[0].size <= 2000000) {
          setimgObjectURL(URL.createObjectURL(e.target.files[0]));
          setfilePath(e.target.files[0]);
          openModel();
        } else {
          //setshowModel(!showModel);
          store.addNotification({
            title: "File Should Be Less Than 2mb!",
            message: process.env.REACT_APP_LMS_ALERT_NAME,
            type: "danger",
            insert: "top",
            container: "top-left",
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
        }
      } else {
        //setshowModel(!showModel);
        store.addNotification({
          title: "Invalid File Type!",
          message: process.env.REACT_APP_LMS_ALERT_NAME,
          type: "danger",
          insert: "top",
          container: "top-left",
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
      }
    }
  };
  return (
    <div>
      <StUploadProPicModel
        showModel={showModel}
        setshowModel={setshowModel}
        filePath={filePath}
        setfilePath={setfilePath}
        imgObjectURL={imgObjectURL}
        setimgObjectURL={setimgObjectURL}
        image={image}
        getCropData={getCropData}
        setCropper={setCropper}
        cropData={cropData}
        err={err}
        setImage={setImage}
        setCropData={setCropData}
      />

      <div className="profil_box">
        <div className="srow">
          <h2>{`${initialState && initialState.user.first_name} ${
            initialState && initialState.user.last_name
          }`}</h2>
          <div className="srow_pro_pic">
            <LazyLoadImage
              effect="blur"
              src={`${initialState && `${initialState.user_image}`}`}
              alt=""
            />
            <label htmlFor="uppic">
              <i className="fas fa-camera"></i>
            </label>
            <input
              type="file"
              id="uppic"
              onChange={(e) => {
                onChange(e);
                hadelFileUpload(e);
              }}
              onClick={removeValue}
            />
          </div>
        </div>
        <div className="brow">
          <div className="brow_info"></div>
        </div>
      </div>
    </div>
  );
}
