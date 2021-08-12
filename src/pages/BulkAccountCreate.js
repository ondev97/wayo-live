import Axios from "axios";
import React, { useState } from "react";
import { store } from "react-notifications-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../assets/css/bulkAccount.css";
import download from "../img/bulk_users.xlsx";

function BulkAccountCreate() {
  const [isModel, setisModel] = useState(false);
  const [fileName, setfileName] = useState("");
  const [files, setfiles] = useState("");
  const usDetails = useSelector((state) => state.accountDetails);

  const [loading, setloading] = useState(false);

  const bgClick = (e) => {
    if (e.target.classList.contains("outer-uploadModel")) {
      setisModel(false);
      setfileName("");
      setfiles("");
    }
  };

  const close = () => {
    setisModel(false);
    setfileName("");
    setfiles("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setfiles(file);
    setfileName(file.name);
  };

  /*Add Audience to course*/
  const addStToCos = async () => {
    if (files) {
      if (
        files.type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setloading(true);
        const form = new FormData();
        form.append("excel_file", files);

        await Axios.post(
          `${process.env.REACT_APP_LMS_MAIN_URL}/auth/reg_users/`,
          form,
          {
            headers: {
              Authorization: "Token " + usDetails.key,
              "content-type": "multipart/form-data",
            },
          }
        )
          .then((res) => {
            setloading(false);
            setisModel(false);
            setfileName("");
            setfiles("");
            let success = res.data.count_of_all_users;
            let failed = res.data.not_saved_lines.length;

            if (success - failed > 0) {
              store.addNotification({
                title: success - failed + " Users Account Created",
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
            if (failed > 0) {
              store.addNotification({
                title: failed + " Users Accounts Are Failed",
                message: process.env.REACT_APP_LMS_ALERT_NAME,
                type: "danger",
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
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        store.addNotification({
          title: "File Type Invalid",
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
    <div className="mainBulk">
      {isModel ? (
        <div className="outer-uploadModel" onClick={bgClick}>
          <div className="uploadModel">
            <div className="closebut">
              <button onClick={close}>
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            <div className="sec">
              <label htmlFor="file">Choose File</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileUpload}
              />
              {fileName && (
                <div>
                  <i className="far fa-file-excel"></i>
                  <p>
                    <span>{fileName}</span>
                  </p>
                </div>
              )}
            </div>
            {fileName ? (
              <button onClick={addStToCos}>
                {loading ? <i className="fas fa-circle-notch rotate"></i> : ""}
                Create Bulk Audience
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="infoBulk">
        <h1>ADD BULK ACCOUNT</h1>
        <p>
          First, click on the "Download Template" button to download the empty
          template (.xlsx) file to add the audience accounts list. Then, insert
          orderly the audience account username (UPPERCASE) and password in that
          template file. Finally, click on the "Upload Audience Accounts File"
          button to upload the audience accounts list.
        </p>
      </div>
      <div className="fileRow">
        <Link to={download} target="_blank" download>
          <button>Download Template</button>
        </Link>
        <button onClick={() => setisModel(true)}>
          Upload Audience Accounts File
        </button>
      </div>
    </div>
  );
}

export default BulkAccountCreate;
