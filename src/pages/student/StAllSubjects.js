import "../../assets/css/student/stallsubjects.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import useDebounce from "../../utils/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SubjectsCard from "../../components/student/SubjectsCard";
import "../../assets/css/mediaFiles/allsubjectmedia.css";
import ProfileLoader from "../../components/ProfileLoader";

export default function StAllSubjects() {
  const [subDetails, setsubDetails] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [nextPage, setnextPage] = useState(null);
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const debounce = useDebounce(); //custom hook
  const url = `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/subjectlist`;

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
          setnextPage(res.data.next);
        })
        .catch((err) => {
          if (err.response.data) {
          }
        });
    }
  };

  function next() {
    if (nextPage) {
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
      <div className="all_st_subs">
        <div className="pagetop">
          <h1>All Subjects</h1>
          <div className="search_row">
            <input
              type="text"
              name="search"
              placeholder="Search Subject"
              onChange={handelSearchSubject}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="">
          <InfiniteScroll
            dataLength={subDetails.length}
            next={next}
            hasMore={true}
            className="all_sub_body"
          >
            {subDetails.map((det) => (
              <SubjectsCard
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
          </InfiniteScroll>
        </div>
        {isLoading && <ProfileLoader />}
      </div>
    </>
  );
}
