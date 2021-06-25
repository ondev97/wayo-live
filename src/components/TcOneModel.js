import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import LazyLoad from "react-lazyload";
import ReactPlayer from "react-player/lazy";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ModuleBody from "./ModuleBody";

export default function TcOneModel({
  name,
  msg,
  setisRemoveModule,
  setvideoLink,
  setsetVideo,
  moduleData,
}) {
  const [playing, setplaying] = useState(false);
  const [iValue, setiValue] = useState("");
  const [src, setsrc] = useState("");
  const valueRef = useRef();
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  let history = useHistory();

  const playPush = (e) => {
    if (e.target.className.includes("player_overlay")) {
      if (playing) {
        setplaying(false);
      } else {
        setplaying(true);
      }
    }
  };

  const play = (link) => {
    setplaying(true);
    setvideoLink(link);
    setsetVideo(true);
    setplaying(false);
  };

  //filtering message and embed react player
  function filterTags(nodes) {
    let media = [];
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        if (
          nodes[i].type === "figure" &&
          nodes[i].props.className === "media"
        ) {
          if (nodes[i].props.children) {
            for (let x = 0; x < nodes[i].props.children.length; x++) {
              if (nodes[i].props.children[x].type === "oembed") {
                if (nodes[i].props.children[x].props.url.includes("youtu")) {
                  media.push(
                    <div className="re_player" id="re_player" key={i}>
                      <div className="player_overlay" onClick={playPush}></div>
                      <ReactPlayer
                        url={nodes[i].props.children[x].props.url}
                        controls={true}
                        pip={true}
                        className="player"
                        width="100%"
                        height="100%"
                        muted={true}
                        playing={playing}
                        onPlay={() =>
                          play(nodes[i].props.children[x].props.url)
                        }
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
                  );
                } else {
                  media.push(
                    <div className="re_player" key={i}>
                      <ReactPlayer
                        url={nodes[i].props.children[x].props.url}
                        controls={true}
                        pip={true}
                        className="player"
                        width="100%"
                        height="100%"
                      />
                    </div>
                  );
                }
              } else {
                media = [...media, nodes[i]];
              }
            }
          } else {
            media = [...media, nodes[i]];
          }
        } else {
          //media = [...media, nodes[i]];
        }
        if (nodes[i].type === "p") {
          if (nodes[i].props.children) {
            for (let z = 0; nodes[i].props.children.length > z; z++) {
              console.log(nodes[i].props.children[z].includes("<iframe"));
              if (nodes[i].props.children[z].includes("<iframe")) {
                valueRef.current = nodes[i].props.children[z];
                break;
              }
            }
          }
        }
      }
      return media;
    }
  }

  const functionRemoveModule = (id) => {
    Axios.delete(
      `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/deletemodule/${id}/`,
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    )
      .then(() => {
        setisRemoveModule(true);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setiValue(valueRef.current);
  }, []);
  useEffect(() => {
    if (iValue) {
      document.getElementById("setValue").innerHTML = iValue;
      getI();
    }
  }, [iValue]);

  function getI() {
    let ifra = document.querySelector("#setValue iframe");
    setsrc(ifra.getAttribute("src"));
  }

  //play Iframe
  const playIframe = () => {
    setplaying(true);
    setplaying(false);
    history.push({
      pathname: "/band/playevent",
      state: {
        value: iValue,
      },
    });
  };

  return (
    <LazyLoad height={200}>
      <ModuleBody name={moduleData.event_name}>
        <div className="on_model_body">
          {msg && (
            <div className="model_body_row">
              {filterTags(ReactHtmlParser(msg))}
              <div ref={valueRef} style={{ display: "none" }}></div>
              {iValue ? (
                <>
                  <div id="setValue" style={{ display: "none" }}></div>
                  {src ? (
                    <div className="re_player" id="re_player">
                      <ReactPlayer
                        url={src}
                        controls={true}
                        pip={true}
                        className="player"
                        width="100%"
                        height="100%"
                        playing={playing}
                        onPlay={playIframe}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              <div className="event_details_dis">
                <h3>EVENT DETAILS </h3>
                <p>Event Start Time - {moduleData.event_start || ""}</p>
                <p>Event End Time - {moduleData.event_end || ""}</p>
                <p>Event Type - {moduleData.event_type || ""}</p>
              </div>
            </div>
          )}
        </div>
      </ModuleBody>
    </LazyLoad>
  );
}
