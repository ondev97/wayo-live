import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";
import checkErrors from "../components/ValidateModule";
import { store } from "react-notifications-component";

export default function UpdateModule() {
  const { cosid } = useParams();
  const { ccid } = useParams();
  const [formValues, setformValues] = useState({ mn: "", msg: "", cid: "" });
  const [formErrors, setformErrors] = useState({ mn: "", msg: "", comerr: "" });
  const [hide, sethide] = useState({ mn: false, msg: false });
  const [mediafiles, setmediafiles] = useState([]);
  const [newmediafiles, setnewmediafiles] = useState([]);
  const [isSubmit, setisSubmit] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [sucMsg, setsucMsg] = useState(false);
  const [isRedirect, setisRedirect] = useState({ pr: "", ne: "" });
  const [isDelete, setisDelete] = useState(false);
  const [progressBarPrecen, setprogressBarPrecen] = useState(0);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const url = `${process.env.REACT_APP_LMS_MAIN_URL}/course-api`;

  const getValues = async () => {
    await Axios.get(`${url}/getsinglemodule/${cosid}/`, {
      headers: { Authorization: "Token " + usDetails.key },
    })
      .then((res) => {
        if (res.data.module_name) {
          setformValues({
            ...formValues,
            mn: res.data.module_name,
            cid: res.data.course,
          });
        }
        if (res.data.module_content) {
          setformValues({ ...formValues, msg: res.data.module_content });
        }
      })
      .catch((err) => {
        if (err.response.data.message === "you're unauthorized") {
          setisRedirect({ ...isRedirect, pr: true });
        }
      });
  };

  const getModuleFiles = async () => {
    await Axios.get(`${url}/getmodulefiles/${cosid}/`, {
      headers: { Authorization: "Token " + usDetails.key },
    }).then((res) => {
      setmediafiles(res.data);
    });
  };
  //delete module
  const deleteModuleFile = async (modid) => {
    if (window.confirm("Are You Sure?")) {
      await Axios.delete(`${url}/deletemodulefile/${modid}/`, {
        headers: { Authorization: "Token " + usDetails.key },
      }).then((res) => {
        if (res) {
          setisDelete(!isDelete);
        }
      });
    }
  };

  const hadelValues = (e) => {
    const { name, value } = e.target;
    setformValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (usDetails.key) {
      getValues();
      getModuleFiles();
    }
  }, [usDetails, isDelete]);

  useEffect(() => {
    if (newmediafiles !== null) {
      for (let i = 0; i < newmediafiles.length; i++) {
        if (newmediafiles[i].type === "video/mp4") {
          setformErrors({
            ...formErrors,
            comerr:
              "Please Upload Video Files To Vimeo And paste Vimeo URL In Here",
          });
        }
      }
    }
  }, [newmediafiles]);

  const hideErrors = (e) => {
    Object.entries(formErrors).map(([keys, val]) => {
      if (keys === e.target.name && val !== "") {
        sethide({ ...hide, [e.target.name]: true });
      }
    });
  };

  const files = (e) => {
    if (e.target.files) {
      setnewmediafiles([...newmediafiles, ...e.target.files]);
    }
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

  const uploadModule = async () => {
    let formData = new FormData();
    let fileData = new FormData();

    formData.append("module_name", formValues.mn);
    formData.append("module_content", formValues.msg);

    if (newmediafiles !== null) {
      for (let i = 0; i < newmediafiles.length; i++) {
        if (newmediafiles[i].type !== "video/mp4") {
          fileData.append(`files`, newmediafiles[i]);
        }
      }
    }

    await Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/updatemodule/${cosid}/`,
      formData,
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    )
      .then((res) => {
        if (res.data.id && newmediafiles.length !== 0) {
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
            setnewmediafiles(null);
            setsucMsg(true);
            setformValues({ mn: "", msg: "" });
          });
        } else {
          setsucMsg(true);
        }
      })
      .catch((err) => {});
  };

  const editorOnChangeHandel = (e, editor) => {
    let data = editor.getData();
    setformValues({ ...formValues, ["msg"]: data });
  };

  if (sucMsg) {
    setsucMsg(false);
    setisRedirect({ ne: true });
    //showing alert
    store.addNotification({
      title: "Module Updated Successfully!",
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

  if (isRedirect.pr) {
    return <Redirect to="/teacherdashboard/allevents/" />;
  }
  if (isRedirect.ne) {
    return (
      <Redirect to={`/teacherdashboard/models/${formValues.cid}/${ccid}/`} />
    );
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
        <h1>Update Module</h1>
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
