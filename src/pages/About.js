import React, { useEffect, useState } from "react";
import ab1 from "../img/ab1.png";
import ab2 from "../img/ab2.png";
import "../assets/css/about.css";
import { useDispatch } from "react-redux";
import { activeAccount } from "../actions";
import { loadStDetails } from "../actions/stDetailsAction";
import Axios from "axios";

export default function About() {
  const dispatch = useDispatch();
  const [statistics, setstatistics] = useState({
    students: 0,
    courses: 0,
    teachers: 0,
    subjects: 0,
  });
  useEffect(() => {
    dispatch(activeAccount());
    dispatch(loadStDetails());
    Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/stat/`)
      .then((res) => {
        setstatistics(res.data);
      })
      .catch((err) => {});
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <div className="maininde">
      <div className="upper_cover">
        <h1>About Us</h1>
      </div>
    </div>
  );
}
