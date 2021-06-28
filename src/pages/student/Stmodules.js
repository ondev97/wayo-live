import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import StOneModule from "../../components/student/StOneModule";
import StCourseModuleDes from "../../components/student/StCourseModuleDes";
import { store } from "react-notifications-component";
import PlayerController from "../PlayerController";
import ReactPlayer from "react-player/lazy";

export default function Stmodules() {
  const { id } = useParams();
  const [moduleData, setmoduleData] = useState([]);
  const [moduleFiles, setmoduleFiles] = useState([]);
  const [redirect, setredirect] = useState(false);
  const [videoLink, setvideoLink] = useState("");
  const [setVideo, setsetVideo] = useState(false);
  const [playing, setplaying] = useState(true);
  const [volume, setvolume] = useState(1);
  const [mute, setmute] = useState(false);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  let history = useHistory();

  const back = () => {
    history.goBack();
  };

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/viewevent/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setmoduleData(res.data);
        })
        .catch((err) => {
          store.addNotification({
            title: err.response.data.message,
            message: process.env.REACT_APP_LMS_ALERT_NAME,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true,
              pauseOnHover: true,
              showIcon: true,
            },
            width: 600,
          });
          setredirect(true);
        });
    }
  }, [usDetails]);

  //add external script tag for model page and disable context menu
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   if (setVideo) {
  //     //disable right click
  //     document.addEventListener("contextmenu", (e) => {
  //       if (e.target.className === "player_overlay") {
  //         e.preventDefault();
  //       }
  //     });
  //     script.setAttribute("id", "tidio");
  //     script.src = "//code.tidio.co/vordp7zskjhjmejdgqprrjv2lnhubhk4.js";
  //     script.async = true;

  //     document.body.appendChild(script);
  //   } else {
  //     const tidioId = document.getElementById("tidio");
  //     const tidioChat = document.getElementById("tidio-chat");
  //     const tidioChatCode = document.getElementById("tidio-chat-code");
  //     if (tidioId) {
  //       tidioId.remove();
  //       tidioChatCode.remove();
  //       tidioChat.remove();
  //     }
  //   }
  // }, [setVideo]);

  if (redirect) {
    return <Redirect to={`/audiencedashboard/eventsinband/${id}/`} />;
  }

  const videoBackground = (e) => {
    if (e.target.className.includes("full_screen_video")) {
      setsetVideo(false);
      setplaying(true);
      setvolume(1);
      setvideoLink("");
    }
  };

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
              <button onClick={back}>
                <i className="fas fa-chevron-circle-left"></i>Back to Event
                Details
              </button>
            </div>
            <div className="al_models">
              {moduleData.length !== 0 ? (
                <StOneModule
                  moduleData={moduleData}
                  msg={moduleData.event_content}
                  name={moduleData.event_name}
                  id={moduleData.id}
                  setvideoLink={setvideoLink}
                  setsetVideo={setsetVideo}
                />
              ) : (
                <div className="empy">
                  <h3>No Course Module Available..</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md_course_desc">
          <StCourseModuleDes />
        </div>
      </div>
    </div>
  );
}
