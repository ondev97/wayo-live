import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../../assets/css/student/stcourse.css";
import { useSelector } from "react-redux";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import MyCourseCard from "../../components/student/MyCourseCard";
import ProfileLoader from "../../components/ProfileLoader";
import EventsFilter from "../../components/student/EventsFilter";
import PaymentModal from "../../components/student/PaymentModal";

export default function StSubCourses() {
  const { id } = useParams();
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const [eventData, setEventData] = useState([]);
  const [redirect, setredirect] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [bands, setBands] = useState([]);
  const history = useHistory();
  const [filter, setfilter] = useState({
    band: id,
    eventType: "",
    category: "",
  });

  useEffect(async () => {
    setisLoading(true);
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/listeventsinband/${filter.band}/?category=${filter.category}&type=${filter.eventType}`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setisLoading(false);
          if (res.data) {
            setEventData(res.data);
          }
        })
        .catch((err) => {
          if (err.response.data.message) {
            setredirect(true);
          }
        });
    }
  }, [usDetails, filter]);

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/auth/listbands/`, {
        headers: { Authorization: "Token " + usDetails.key },
      })
        .then((res) => {
          if (res.data) {
            setBands(res.data);
          }
        })
        .catch((err) => {});
    }
  }, [usDetails]);

  return (
    <>
      <div className="ful_manage_course">
        <div className="st_top_manage_body">
          <div className="st_mange_cos_body">
            <button onClick={() => history.goBack()}>
              <i className="fas fa-chevron-circle-left"></i>Back To All Bands
            </button>
            <div className="pagetop">
              <h1>{"ALL BANDS > ALL EVENTS"}</h1>
            </div>
            <EventsFilter
              bands={bands}
              id={id}
              setfilter={setfilter}
              filter={filter}
            />
            <div className="outer_section">
              <h2>ALL EVENTS</h2>
              <div className="inner_section">
                <InfiniteScroll
                  dataLength={eventData.length}
                  // hasMore={true}
                  className="st_manage_course_grid"
                >
                  {eventData.length !== 0
                    ? eventData.map((edata) => (
                        <MyCourseCard key={edata.id} event={edata} />
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
