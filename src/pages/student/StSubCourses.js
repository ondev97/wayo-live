import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../../assets/css/student/stcourse.css";
import { useSelector } from "react-redux";
import Axios from "axios";
import useDebounce from "../../utils/hooks/useDebounce";
import InfiniteScroll from "react-infinite-scroll-component";
import MyCourseCard from "../../components/student/MyCourseCard";
import ProfileLoader from "../../components/ProfileLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EventsFilter from "../../components/student/EventsFilter";

export default function StSubCourses() {
  const { id } = useParams();
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const [courseData, setcourseData] = useState([]);
  const [subData, setsubData] = useState({});
  const [eventData, setEventData] = useState([]);
  const [nextPage, setnextPage] = useState(null);
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [isRedirect, setisRedirect] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const debounce = useDebounce(); //custom hook
  const [ bands, setBands] = useState([]);

  useEffect(async () => {
    setisLoading(true);
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/listeventsinband/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setisLoading(false);
          if (res.data) {
            setEventData(res.data)
            // setsubData({
            //   ...subData,
            //   sub_name: res.data.subject_name,
            //   sub_cover: res.data.subject_cover,
            //   sub_sdes: res.data.short_description,
            //   description: res.data.description,
            // });
          }
        })
        .catch((err) => {
          // if (err.response.data.message) {
          //   setisRedirect(true);
          // }
        });

      // await Axios.get(
      //   `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/enrolledcoursesinsubject/${id}/?page=${page}&search=${search}`,
      //   {
      //     headers: { Authorization: "Token " + usDetails.key },
      //   }
      // )
      //   .then((res) => {
      //     setisLoading(false);
      //     if (page > 1) {
      //       setcourseData([...courseData, ...res.data.results]);
      //     } else {
      //       setcourseData([...res.data.results]);
      //     }
      //     setnextPage(res.data.next);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, [usDetails]);

  // const handelSearchSubject = (e) => {
  //   const search = e.target.value;
  //   setpage(1);
  //   debounce(() => setsearch(search), 1000);
  // };
  // function next() {
  //   if (nextPage) {
  //     setpage(page + 1);
  //   }
  // }

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(
          `${process.env.REACT_APP_LMS_MAIN_URL}/auth/listbands/`,
          {
            headers: { Authorization: "Token " + usDetails.key },
          }
      )
          .then((res) => {
            if (res.data) {
              setBands(res.data);
            }
          })
          .catch((err) => {

          });
    }
  }, [usDetails]);




  return (
    <>
      <div className="ful_manage_course">
        <div className="st_top_manage_body">
          <div className="st_mange_cos_body">
            <div className="pagetop">
              <h1>{"ALL BANDS > ALL EVENTS"}</h1>
            </div>
            <EventsFilter bands={bands} id={id}/>
            <div className="outer_section">
              <h2>ALL EVENTS</h2>
              <div className="inner_section">
                <InfiniteScroll
                  dataLength={eventData.length}
                  // hasMore={true}
                  className="st_manage_course_grid"
                >
                  {eventData.length !== 0
                    ? eventData.map((edata, index) => (
                        <MyCourseCard
                          key={edata.id}
                          event = {edata}
                          // course_cover={cdata.course.event_cover}
                          // enrollkey={cdata.enroll_key}
                          // course_name={cdata.course.course_name}
                          // price={cdata.course.price}
                          // duration={cdata.course.duration}
                          // created_at={cdata.course.created_at}
                          // courseid={cdata.course.id}
                          // is_freeze={cdata.course.is_freeze}
                          // no={index}
                        />
                      ))
                    : isLoading && <ProfileLoader />}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
