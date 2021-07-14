import Axios from "axios";
import React, { useState } from "react";
import { store } from "react-notifications-component";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";

export default function AddStFileSe({
  IsfoleModel,
  setIsfoleModel,
  setaddedProfile,
  setselectst,
  setallStudents,
  setpage,
  setsuncess,
  suncess,
}) {
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [fileName, setfileName] = useState("");
  const [stData, setstData] = useState([]);
  const { id } = useParams();

  const bgClick = (e) => {
    if (e.target.classList.contains("modeladdstfile")) {
      setIsfoleModel(false);
    }
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

    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));
    setData(list);
    setColumns(columns);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setfileName(e.target.files[0].name);
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

  let pass = 0;
  let fail = 0;

  /*Add students to course*/
  const addStToCos = async () => {
    if (stData.length !== 0) {
      await Axios.post(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/addtoeventbyband/${id}/`,
        {
          users: stData,
        },
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          res.data.map((data) =>
            Object.values(data).pop() === false
              ? (fail = fail + 1)
              : (pass = pass + 1)
          );

          if (pass > 0) {
            store.addNotification({
              title: `${pass} Users Added To The Even`,
              message: process.env.REACT_APP_LMS_ALERT_NAME,
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 2000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
              width: 400,
            });
          }
          if (fail > 0) {
            store.addNotification({
              title: `${fail} Users Can Not Add To The Event`,
              message: process.env.REACT_APP_LMS_ALERT_NAME,
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 2000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
              width: 400,
            });
          }

          setaddedProfile([]);
          setselectst([]);
          setallStudents([]);
          setpage(1);
          setsuncess(!suncess);
          setIsfoleModel(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      store.addNotification({
        title: `Please Select A File`,
        message: process.env.REACT_APP_LMS_ALERT_NAME,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
          pauseOnHover: true,
          showIcon: true,
        },
        width: 400,
      });
    }
  };

  return (
    <>
      {IsfoleModel ? (
        <div className="modeladdstfile" onClick={bgClick}>
          <div className="filecsv">
            <div className="closebut">
              <button onClick={() => setIsfoleModel(false)}>
                <i class="far fa-times-circle"></i>
              </button>
            </div>
            <div className="filearea">
              <label htmlFor="flst">Choose File</label>
              <input
                type="file"
                id="flst"
                name="filest"
                onChange={handleFileUpload}
              />
              {fileName && (
                <>
                  <i className="far fa-file-excel"></i>
                  <p>
                    <span>{fileName}</span>
                  </p>
                </>
              )}
            </div>
            <button onClick={addStToCos}>Add Audience</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
