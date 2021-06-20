import Axios from "axios";
import { AnimateSharedLayout } from "framer-motion";
import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import LazyLoad from "react-lazyload";
import ReactPlayer from "react-player/lazy";
import { useSelector } from "react-redux";
import ModuleBody from "./ModuleBody";

export default function TcOneModel({
  name,
  msg,
  moduleFiles,
  id,
  cid,
  setisRemoveModule,
  setvideoLink,
  setsetVideo,
}) {
  const [playing, setplaying] = useState(false);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

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
    let youtubeRegular = new RegExp(
      /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/
    );
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
          if (nodes[i].props.children) {
            for (let p = 0; p < nodes[i].props.children.length; p++) {
              if (nodes[i].props.children[p].type === "a") {
                if (
                  youtubeRegular.test(nodes[i].props.children[p].props.href)
                ) {
                  media.push(
                    <div className="button-row" key={i}>
                      <button className="youtube">
                        <a
                          href={nodes[i].props.children[p].props.href}
                          target="__block"
                        >
                          <i className="fab fa-youtube"></i>
                          Join YouTube Live Class
                        </a>
                      </button>
                    </div>
                  );
                } else if (
                  nodes[i].props.children[p].props.href.includes("zoom.us")
                ) {
                  media.push(
                    <div className="button-row" key={i}>
                      <button className="zoom">
                        <a
                          href={nodes[i].props.children[p].props.href}
                          target="__block"
                        >
                          <i className="fas fa-graduation-cap"></i>
                          Join Zoom Live Class
                        </a>
                      </button>
                    </div>
                  );
                } else {
                  media = [...media, nodes[i]];
                }
              } else {
                media = [...media, nodes[i]];
                break;
              }
            }
          } else {
            media = [...media, nodes[i]];
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

  const handelDeleteModule = async (id) => {
    if (window.confirm("Are You Sure?")) {
      setisRemoveModule(false);
      await functionRemoveModule(id);
    }
  };

  return (
    <LazyLoad height={200}>
      <ModuleBody name={name}>
        <div className="on_model_body">
          {msg && (
            <div className="model_body_row">
              {/* {filterTgs(ReactHtmlParser(msg))} */}
              <div className="re_player">
                <ReactPlayer
                  url="https://vimeo.com/564709580"
                  pip={false}
                  controls
                  className="player"
                  width="100%"
                  height="100%"
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                        disablepictureinpicture: "true",
                      },
                    },
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="event_details_dis">
                <h3>EVENT DETAILS -</h3>
              </div>
            </div>
          )}
        </div>
      </ModuleBody>
    </LazyLoad>
  );
}
