import React, { useEffect, useState } from "react";
import "../assets/css/viewallsts.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory, useParams } from "react-router-dom";
import Empty from "../components/Empty";
import ViewStuTc from "../components/ViewStuTc";
import { store } from "react-notifications-component";
import useDebounce from "../utils/hooks/useDebounce";

export default function AllStList() {
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const [allstudent, setallstudent] = useState([]);
  const [allDetailSt, setallDetailSt] = useState(null);
  const [modelOp, setmodelOp] = useState(false);
  const [unEnrol, setunEnrol] = useState(false);
  const [stPrDetail, setstPrDetail] = useState([]);
  const [page, setpage] = useState(1);
  const history = useHistory();
  const [search, setsearch] = useState("");
  const { id } = useParams();

  const debounce = useDebounce(); //custom hook

  const getallStude = async () => {
    if (usDetails) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/audienceintheevent/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      ).then((res) => {
        if (page > 1) {
          setallDetailSt(res.data);
          setallstudent([...allstudent, ...res.data]);
        } else {
          setallDetailSt(res.data);
          setallstudent([...res.data]);
        }
      });
    }
  };

  useEffect(() => {
    getallStude();
  }, [usDetails, unEnrol, page, search]);
  /*model page*/

  /*model page*/
  const viewPr = (id) => {
    if (!modelOp) {
      setmodelOp(true);
      /*get studet details */
      Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/account-api/stuprofile/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setstPrDetail(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /*Student Unenrolled*/
  const unEnrolSt = async (id) => {
    if (window.confirm("Are You Sure?")) {
      await Axios.delete(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/unenroll/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      ).then(() => {
        setallstudent([]);
        setunEnrol(!unEnrol);
        setpage(1);

        store.addNotification({
          title: `Unenrolled Successfully`,
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
      });
    }
  };
  function next() {
    if (allDetailSt.next) {
      setpage(page + 1);
    }
  }

  /*Search */
  const handelSearchSubject = (e) => {
    const search = e.target.value;
    setpage(1);
    debounce(() => setsearch(search), 500);
  };
  console.log(allstudent);
  return (
    <div className="stlist">
      <ViewStuTc
        setmodelOp={setmodelOp}
        modelOp={modelOp}
        stPrDetail={stPrDetail}
        setstPrDetail={setstPrDetail}
      />
      <div className="pageTop">
        <h1>Enrolled Students</h1>
      </div>
      {allDetailSt !== null ? (
        <div className="sttable">
          <h2>{allDetailSt.count && `Total Students ${allDetailSt.count}`}</h2>
          {allstudent.length !== 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Profile Picture</th>
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allstudent.map((data) => (
                    <tr key={data.id}>
                      <td onClick={() => viewPr(data.user.id)}>{data.id}</td>
                      <td onClick={() => viewPr(data.user.id)}>
                        <LazyLoadImage src={data.user_image} effect="blur" />
                      </td>
                      <td onClick={() => viewPr(data.user.id)}>
                        {data.user.first_name + " " + data.user.last_name}
                      </td>
                      <td onClick={() => viewPr(data.user.id)}>
                        {data.user.username}
                      </td>
                      <td onClick={() => viewPr(data.user.id)}>
                        {data.user.email}
                      </td>
                      <td>
                        <button onClick={() => unEnrolSt(data.id)}>
                          <i className="far fa-times-circle"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allDetailSt.next ? (
                <div className="butnext">
                  <button onClick={next}>Load More</button>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <Empty target="No Students" />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
