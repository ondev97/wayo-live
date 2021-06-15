import React, { useState, useEffect } from "react";
import "../../assets/css/student/stcourse.css";
import { useSelector } from "react-redux";
import Axios from "axios";
import Empty from "../../components/Empty";
import useDebounce from "../../utils/hooks/useDebounce";
import InfiniteScroll from "react-infinite-scroll-component";
import MyCourseCard from "../../components/student/MyCourseCard";
import ProfileLoader from "../../components/ProfileLoader";

export default function StMyCourses() {
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const [courseData, setcourseData] = useState([]);
  const [nextPage, setnextPage] = useState(null);
  const [search, setsearch] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const debounce = useDebounce(); //custom hook
  const [page, setpage] = useState(1);

  useEffect(async () => {
    setisLoading(true);
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/mycourses/?page=${page}&search=${search}`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setisLoading(false);
          if (page > 1) {
            setcourseData([...courseData, ...res.data.results]);
          } else {
            setcourseData([...res.data.results]);
          }
          setnextPage(res.data.next);
        })
        .catch((err) => {});
    }
  }, [usDetails, search, page]);

  function next() {
    if (nextPage) {
      setpage(page + 1);
    }
  }

  const handelSearchSubject = (e) => {
    const search = e.target.value;
    debounce(() => setsearch(search), 1000);
  };

  return (
    <>
      <div className="ful_manage_course">
        <div className="st_top_manage_body">
          <div className="st_mange_cos_body">
            <div className="cou_row">
              <h1>My Courses</h1>
              <div className="st_manage_cos_search">
                <input
                  type="text"
                  name="search"
                  placeholder="Search Courses"
                  onChange={handelSearchSubject}
                />
                <button>
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            {courseData.length !== 0 ? (
              <div className="">
                <InfiniteScroll
                  dataLength={courseData.length}
                  next={next}
                  hasMore={true}
                  className="st_manage_course_grid"
                >
                  {courseData.length !== 0
                    ? courseData.map((cdata, index) => (
                        <MyCourseCard
                          key={index}
                          course_cover={cdata.course.course_cover}
                          course_name={cdata.course.course_name}
                          enrollkey={cdata.enroll_key}
                          duration={cdata.course.duration}
                          created_at={cdata.course.created_at}
                          courseid={cdata.course.id}
                          no={index}
                          payment={cdata.is_payment}
                        />
                      ))
                    : isLoading && <ProfileLoader />}
                </InfiniteScroll>
              </div>
            ) : (
              <Empty target="No Courses" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
