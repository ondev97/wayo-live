import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { activeAccount } from "../actions";
import { loadStDetails } from "../actions/stDetailsAction";
import "../assets/css/allsubjects.css";
import Axios from "axios";
import AllSubCard from "../components/AllSubCard";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileLoader from "../components/ProfileLoader";

export default function InAllSubjects() {
  const dispatch = useDispatch();
  const [allSubDetails, setallSubDetails] = useState([]);
  const [nextPage, setnextPage] = useState(null);
  const [page, setpage] = useState(1);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    dispatch(activeAccount());
    dispatch(loadStDetails());
    setisLoading(true);
    Axios.get(
      `${process.env.REACT_APP_LMS_MAIN_URL}/show/listallevents/?page=${page}`
    )
      .then((res) => {
        setisLoading(false);
        if (page > 1) {
          setallSubDetails([...allSubDetails, ...res.data.results]);
        } else {
          setallSubDetails([...res.data.results]);
        }
        setnextPage(res.data.next);
      })
      .catch((err) => {});
    window.scrollTo(0, 0);
  }, [dispatch, page]);

  function next() {
    if (nextPage) {
      setpage(page + 1);
    }
  }

  return (
    <div className="maininde">
      <div className="popular_subjects">
        <h1>UPCOMING EVENTS</h1>
        {!isLoading && allSubDetails.length > 0 ? (
          <div className="">
            <InfiniteScroll
              dataLength={allSubDetails.length}
              next={next}
              hasMore={true}
              className="subject_area"
            >
              {allSubDetails.map((tdata, index) =>
                !tdata.is_freeze ? (
                  <AllSubCard key={index} subject={tdata} />
                ) : (
                  ""
                )
              )}
            </InfiniteScroll>
          </div>
        ) : isLoading ? (
          <ProfileLoader />
        ) : (
          <div className="emheading">
            <h1>No Events Available In The System</h1>
          </div>
        )}
      </div>
    </div>
  );
}
