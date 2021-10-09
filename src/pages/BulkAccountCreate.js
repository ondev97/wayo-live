import Axios from "axios";
import React, { useState } from "react";
import { store } from "react-notifications-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../assets/css/bulkAccount.css";
import download from "../img/bulk_users.xlsx";
import * as XLSX from "xlsx";

function BulkAccountCreate() {
  const [isModel, setisModel] = useState(false);
  const [fileName, setfileName] = useState("");
  const [files, setfiles] = useState("");
  const usDetails = useSelector((state) => state.accountDetails);
  const [stData, setstData] = useState([]);
  const [data, setdata] = useState({});
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

// process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    const arra = [];
    const nnarra = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
          /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
          if (arra) {
            arra.push(d);
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
      const narra = arra.filter((arr) => arr.length > 0);
      nnarra.push(narra);
      setstData(narra);
    }

    //new object
    let valueObj = {};
    headers.map((data) => (valueObj[data] = []));

    for (let i = 0; i < Object.keys(valueObj).length; i++) {
      list.map((da) =>
          valueObj[Object.keys(valueObj)[i]].push(Object.values(da)[i])
      );
    }
    setdata(valueObj);
    console.log(valueObj);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setfileName(e.target.files[0].name);
    setfiles(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  /*Add Audience to course*/
  const addStToCos = async () => {
    console.log('runninggggggg');
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
            data,
            {
              headers: {
                Authorization: "Token " + usDetails.key
                // "content-type": "multipart/form-data",
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
              setloading(false);
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
