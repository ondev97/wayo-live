import Axios from "axios";
import React, { useEffect, useState } from "react";
import { store } from "react-notifications-component";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import checkErrors from "../components/ValidateModule";

function CreateModels() {
  const { id } = useParams();
  const { ccid } = useParams();
  const [formValues, setformValues] = useState({ mn: "", msg: "" });
  const [formErrors, setformErrors] = useState({ mn: "", msg: "", comerr: "" });
  const [hide, sethide] = useState({ mn: false, msg: false });
  const [mediafiles, setmediafiles] = useState([]);
  const [isSubmit, setisSubmit] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [sucMsg, setsucMsg] = useState(false);
  const [isRedirect, setisRedirect] = useState(false);
  const [progressBarPrecen, setprogressBarPrecen] = useState(0);

  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const hadelValues = (e) => {
    const { name, value } = e.target;
    setformValues({
      ...formValues,
      [name]: value,
    });
  };
  const files = (e) => {
    if (e.target.files) {
      setmediafiles([...mediafiles, ...e.target.files]);
    }
  };

  useEffect(() => {
    if (mediafiles !== null) {
      for (let i = 0; i < mediafiles.length; i++) {
        if (mediafiles[i].type === "video/mp4") {
          setformErrors({
            ...formErrors,
            comerr:
              "Please Upload Video Files To Vimeo And paste Vimeo URL In Here",
          });
        }
      }
    }
  }, [mediafiles]);

  const hideErrors = (e) => {
    Object.entries(formErrors).map(([keys, val]) => {
      if (keys === e.target.name && val !== "") {
        sethide({ ...hide, [e.target.name]: true });
      }
    });
  };

  const hadelSubmit = (e) => {
    e.preventDefault();
    setformErrors(checkErrors(formValues, mediafiles));
    sethide({ mn: false, msg: false });
    setisSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      uploadModule();
    }
  }, [formErrors]);

  function uploadModule() {
    setsucMsg(false);
    let formData = new FormData();
    let fileData = new FormData();

    formData.append("module_name", formValues.mn);
    formData.append("module_content", formValues.msg);

    //add multiple files
    if (mediafiles !== null) {
      for (let i = 0; i < mediafiles.length; i++) {
        if (mediafiles[i].type !== "video/mp4") {
          fileData.append(`files`, mediafiles[i]);
        }
      }
    }
    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/createmodule/${id}/`,
      formData,
      {
        headers: {
          Authorization: "Token " + usDetails.key,
          "content-type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        if (res.data.id && mediafiles.length !== 0) {
          Axios.post(
            `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/createmodulefile/${res.data.id}/`,
            fileData,
            {
              headers: { Authorization: "Token " + usDetails.key },
              onUploadProgress: (progressEvent) => {
                if (progressEvent.isTrusted) {
                  setuploading(true);
                  setprogressBarPrecen(
                    parseInt(
                      Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                      )
                    )
                  );
                }
              },
            }
          ).then(() => {
            setuploading(false);
            setmediafiles(null);
            setsucMsg(true);
            setformValues({ mn: "", msg: "" });
          });
        } else {
          setsucMsg(true);
        }
      })
      .catch((err) => {});
  }

  if (sucMsg) {
    setsucMsg(false);
    setisRedirect(true);
    //showing alert
    store.addNotification({
      title: "Module Added Successfully!",
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
  }

  const editorOnChangeHandel = (e, editor) => {
    let data = editor.getData();
    setformValues({ ...formValues, ["msg"]: data });
  };

  if (isRedirect) {
    return <Redirect to={`/teacherdashboard/models/${id}/${ccid}`} />;
  }
  const editorConfiguration = {
    ckfinder: {
      uploadUrl: `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/uploads/`,
    },
    removePlugins: [
      "Heading",
      "Link",
      "Bold",
      "Italic",
      "List",
      "BlockQuote",
      "Table",
      "Image",
      "ImageCaption",
      "ImageStyle",
      "ImageToolbar",
      "ImageUpload",
    ],
  };

  return (
    <div className="subject_form">
      <div className="main_form">
        <h1>Create Module</h1>
        <form onSubmit={hadelSubmit}>
          {formErrors.comerr && (
            <p style={{ color: "red", fontSize: "13px", marginBottom: "10px" }}>
              {formErrors.comerr}
            </p>
          )}
          <p>
            <label htmlFor="mn">Module Name</label>
            <input
              type="text"
              id="mn"
              name="mn"
              value={formValues.mn}
              onChange={hadelValues}
              onFocus={hideErrors}
            />
            {formErrors.mn && (
              <span className={`tip ${hide.mn ? "hidetip" : ""}`}>
                {formErrors.mn}
              </span>
            )}
          </p>
          <p>
            <label htmlFor="msg">Messages/Links</label>
            <div className="editorck">
              <CKEditor
                editor={ClassicEditor}
                data={formValues.msg}
                onChange={editorOnChangeHandel}
                config={editorConfiguration}
              />
            </div>
          </p>
          <p>
            <button
              type={`${uploading ? "button" : "submit"}`}
              name="submit"
              className="uplo"
            >{`${uploading ? "Updating" : "Update Module"}`}</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CreateModels;
