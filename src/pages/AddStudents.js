import Axios from "axios";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Empty from "../components/Empty";
import "../assets/css/addStudents.css";
import AddStFileSe from "../components/AddStFileSe";
import SelectStudentsTopRow from "../components/SelectStudentsTopRow";
import { store } from "react-notifications-component";
import useDebounce from "../utils/hooks/useDebounce";
import ViewStuTc from "../components/ViewStuTc";
import donwloadFile from "../img/Template.xlsx";

export default function AddStudents() {
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const [allStudents, setallStudents] = useState([]);
  const [addedProfile, setaddedProfile] = useState([]);
  const [selectst, setselectst] = useState([]);
  const [totStud, settotStud] = useState(null);
  const [IsfoleModel, setIsfoleModel] = useState(false);
  const [page, setpage] = useState(1);
  const [suncess, setsuncess] = useState(false);
  const [search, setsearch] = useState("");
  const [modelOp, setmodelOp] = useState(false);
  const [stPrDetail, setstPrDetail] = useState([]);
  const { id } = useParams();

  const debounce = useDebounce(); //custom hook

  const getStudents = async () => {
    await Axios.get(
      `${process.env.REACT_APP_LMS_MAIN_URL}/auth/notinevent/${id}/`,
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    )
      .then((res) => {
        if (page > 1) {
          settotStud(res.data);
          setallStudents([...allStudents, ...res.data]);
        } else {
          settotStud(res.data);
          setallStudents([...res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (usDetails) {
      getStudents();
    }
  }, [usDetails, page, suncess, search]);

  function next() {
    if (totStud.next) {
      setpage(page + 1);
    }
  }
  /*add students to row */
  const addToSelect = (e) => {
    if (e.target.parentElement.classList.contains("addbutst")) {
      if (selectst.length < 8) {
        const stvalue = e.target.parentElement.value;
        const arr = stvalue.split(","); //string to array

        if (!selectst.includes(arr[0])) {
          setaddedProfile([
            ...addedProfile,
            { img: arr[2], un: arr[0], id: arr[1] },
          ]);
          setselectst([...selectst, arr[0]]);
        }
      }
    }
  };

  /*Added Students*/
  const addStudemts = async () => {
    await Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/show/addtoeventbyband/${id}/`,
      {
        users: selectst,
      },
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    ).then(() => {
      store.addNotification({
        title: `Enrollment Successfully`,
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
      setaddedProfile([]);
      setselectst([]);
      setallStudents([]);
      setpage(1);
      setsuncess(!suncess);
    });
  };
  /*Search */
  const handelSearchSubject = (e) => {
    const search = e.target.value;
    setpage(1);
    debounce(() => setsearch(search), 500);
  };

  return (
    <div className="stlist">
      <AddStFileSe
        setIsfoleModel={setIsfoleModel}
        IsfoleModel={IsfoleModel}
        setaddedProfile={setaddedProfile}
        setselectst={setselectst}
        setallStudents={setallStudents}
        setpage={setpage}
        setsuncess={setsuncess}
        suncess={suncess}
      />
      <ViewStuTc
        setmodelOp={setmodelOp}
        modelOp={modelOp}
        stPrDetail={stPrDetail}
        setstPrDetail={setstPrDetail}
      />
      <div className="pageTop">
        <h1>Add Audience</h1>
      </div>
      {/* <div className="search_st">
        <div className="search" onChange={handelSearchSubject}>
          <input type="text" />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div> */}
      <div className="ins_area">
        <h4>Special Instructions</h4>
        <p>
          First, click on "Download Template" to download the empty template for
          add bulk audience list. Then, add audience details in that template
          and click on the "Upload Audience List" button.
        </p>
      </div>
      <div className="filerow">
        <Link to={donwloadFile} target="__blanck" download>
          <button>Download Template</button>
        </Link>
        <button onClick={() => setIsfoleModel(true)}>
          Upload Audience List
        </button>
      </div>

      <SelectStudentsTopRow
        addedProfile={addedProfile}
        setselectst={setselectst}
        setselectst={setselectst}
        setaddedProfile={setaddedProfile}
        selectst={selectst}
        addStudemts={addStudemts}
      />

      {allStudents.length !== 0 ? (
        <div className="sttable">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Profile Picture</th>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>
                    <img src={data.user_image} alt="user" />
                  </td>
                  <td>{data.user.first_name + " " + data.user.last_name}</td>
                  <td>{data.user.username}</td>
                  <td>{data.user.email}</td>
                  <td>
                    {/* <input type="checkbox" value={data.user.username+','+data.user.id+','+data.profile_pic} onChange={addToSelect} /> */}
                    <button
                      className="addbutst"
                      value={
                        data.user.username +
                        "," +
                        data.user.id +
                        "," +
                        data.user_image
                      }
                      onClick={addToSelect}
                    >
                      <i className="fas fa-plus-circle"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totStud.next ? (
            <div className="butnext">
              <button onClick={next}>Load More</button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Empty target="No Audience" />
      )}
    </div>
  );
}
