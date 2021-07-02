import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function StCourseModuleDes() {
  const usDetails = useSelector((state) => state.accountDetails);
  const [courseData, setcourseData] = useState({});
  const [data, setdata] = useState({});
  const [page, setpage] = useState(1);
  const [nextPage, setnextPage] = useState(null);
  const { id } = useParams();

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/audienceintheevent/${id}/?page=${page}`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setdata(res.data);
          if (page > 1) {
            setcourseData([...courseData, ...res.data.results]);
          } else {
            setcourseData([...res.data.results]);
          }
          setnextPage(res.data.next);
        })
        .catch((err) => {});
    }
  }, [usDetails, page]);

  function next() {
    if (nextPage) {
      setpage(page + 1);
    }
  }
  return (
    <div className="live_audience">
      <div className="live_audience_head">
        <h1>LIVE AUDIENCE</h1>
        <h1>{data ? data.count : ""}</h1>
      </div>
      <div className="live_audience_body">
        {data.count > 0 ? (
          <InfiniteScroll dataLength={data.count} next={next} hasMore={true}>
            {Object.keys(courseData).length > 0 &&
              courseData.map((data) => (
                <div className="audience_row" key={data.id}>
                  <div className="audience_pro_pic">
                    <img src={data.user_image} />
                  </div>
                  <div className="audience_names">
                    <h1>{data.user.first_name}</h1>
                  </div>
                </div>
              ))}
          </InfiniteScroll>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
