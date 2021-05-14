import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ModelsCourseDescri from "../components/ModelsCourseDescri";
import TcOneModel from "../components/TcOneModel";
import "../assets/css/tcmoels.css";
import "../assets/css/mediaFiles/modelsmedia.css";
import ReactPlayer from "react-player/lazy";
import PlayerController from "./PlayerController";

export default function TcModels() {
  const { id } = useParams();
  const [moduleData, setmoduleData] = useState([]);
  const [moduleFiles, setmoduleFiles] = useState([]);
  const [isRemoveModule, setisRemoveModule] = useState(false);
  const [videoLink, setvideoLink] = useState("");
  const [setVideo, setsetVideo] = useState(false);
  const [playing, setplaying] = useState(true);
  const [volume, setvolume] = useState(1);
  const [mute, setmute] = useState(false);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const { cid } = useParams();

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/getmodules/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setmoduleData(res.data);
        })
        .catch((err) => {});
    }
  }, [usDetails, isRemoveModule]);

  useEffect(() => {
    if (moduleData.length !== 0) {
      let arr = [];
      moduleData.map((data) =>
        Axios.get(
          `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/getmodulefiles/${data.id}/`,
          {
            headers: { Authorization: "Token " + usDetails.key },
          }
        )
          .then((res) => {
            arr.push({ [data.id]: res.data });
            setmoduleFiles([...arr]);
          })
          .catch((err) => {})
      );
    }
  }, [moduleData]);

  const videoBackground = (e) => {
    if (e.target.className.includes("full_screen_video")) {
      setsetVideo(false);
      setplaying(true);
      setvolume(1);
      setvideoLink("");
    }
  };

  //disable right click
  document.addEventListener("contextmenu", (e) => {
    if (e.target.className === "player_overlay") {
      e.preventDefault();
    }
  });

  return (
    <div>
      {setVideo ? (
        <div className="full_screen_video" onClick={videoBackground}>
          <div className="video_player">
            {
              //overlay
              <PlayerController
                setplaying={setplaying}
                playing={playing}
                setvolume={setvolume}
                volume={volume}
                setmute={setmute}
                mute={mute}
              />
            }
            <ReactPlayer
              url={videoLink}
              controls={true}
              pip={true}
              className="player"
              width="100%"
              height="100%"
              id="playerYou"
              playing={playing}
              controls={false}
              volume={volume}
              muted={mute}
              onContextMenu={(e) => e.preventDefault()}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    fs: 0,
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="models">
        <div className="md_all_models">
          <div className="md_models">
            <div className="cr_models">
              <Link to={`/teacherdashboard/viewcourse/${cid}`}>
                <button>
                  <i className="fas fa-chevron-circle-left"></i>Back to Courses
                </button>
              </Link>
              <Link to={`/teacherdashboard/createmodels/${id}/${cid}`}>
                <button>
                  <i className="fas fa-plus-circle"></i>Create Module
                </button>
              </Link>
            </div>
            <div className="al_models">
              {moduleData.length !== 0 ? (
                moduleData.map((data) => (
                  <TcOneModel
                    key={data.id}
                    msg={data.module_content}
                    name={data.module_name}
                    id={data.id}
                    cid={cid}
                    moduleFiles={moduleFiles}
                    setisRemoveModule={setisRemoveModule}
                    setvideoLink={setvideoLink}
                    setsetVideo={setsetVideo}
                  />
                ))
              ) : (
                <div className="empy">
                  <h3>No Course Modules Available..</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md_course_desc">
          <ModelsCourseDescri id={id} />
        </div>
      </div>
    </div>
  );
}
