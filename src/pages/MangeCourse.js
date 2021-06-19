import Axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Empty from "../components/Empty";
import ProfileLoader from "../components/ProfileLoader";
import TcMaCourses from "../components/TcMaCourses";
import useDebounce from "../utils/hooks/useDebounce";
import "../assets/css/coursemanage.css";
import "../assets/css/mediaFiles/managecoursemedia.css";
import "../assets/css/teachermaindash.css";
import EventsFilters from "../components/EventsFilters";

export default function MangeCourse() {
  const [subDetails, setsubDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [allSubDetail, setallSubDetail] = useState(null);
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [statistics, setstatistics] = useState({
    students: 0,
    courses: 0,
    subjects: 0,
  });
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const debounce = useDebounce(); //custom hook
  const url = `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/teachersubject`;

  useEffect(() => {
    if (search === "") {
      const fetchurl = `${url}/?page=${page}`;
      getSubjectDetails(fetchurl);
    } else {
      const fetchurl = `${url}/?page=${page}&search=${search}`;
      getSubjectDetails(fetchurl);
    }
  }, [usDetails, page, search]);

  const getSubjectDetails = async (fetchurl) => {
    setisLoading(true);
    if (usDetails.key) {
      await Axios.get(fetchurl, {
        headers: { Authorization: "Token " + usDetails.key },
      })
        .then((res) => {
          setisLoading(false);
          if (page > 1) {
            setsubDetails([...subDetails, ...res.data.results]);
          } else {
            setsubDetails([...res.data.results]);
          }
          setallSubDetail(res.data);
        })
        .catch((err) => {});
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/teacherstat/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setstatistics(res.data);
        })
        .catch((err) => {});
    }
  };

  function next() {
    if (allSubDetail.next) {
      setpage(page + 1);
    }
  }

  const handelSearchSubject = (e) => {
    const search = e.target.value;
    setpage(1);
    debounce(() => setsearch(search), 500);
  };

  return (
    <>
      <div className="main_ar_course">
        <br />
        <EventsFilters />
        <div>
          {allSubDetail !== null && allSubDetail.count === 0 && !isLoading ? (
            <Empty />
          ) : (
            subDetails &&
            allSubDetail !== null && (
              <InfiniteScroll
                dataLength={subDetails.length}
                next={next}
                hasMore={true}
                className="course_body"
              >
                <h1>MY ALL EVENTS</h1>
                <div className="outer">
                  {subDetails.map((det) => (
                    <TcMaCourses
                      key={det.id}
                      id={det.id}
                      subject_name={det.subject_name}
                      subject_cover={det.subject_cover}
                      author={det.author}
                      created_at={det.created_at}
                      description={det.description}
                      short_description={det.short_description}
                      class_type={det.class_type}
                      subject_type={det.subject_type}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            )
          )}
        </div>
        {isLoading && <ProfileLoader />}
      </div>
    </>
  );
}
