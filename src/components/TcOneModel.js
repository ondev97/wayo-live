import Axios from "axios";
import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import LazyLoad from "react-lazyload";
import ReactPlayer from "react-player/lazy";
import { useSelector } from "react-redux";
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
          media = [...media, nodes[i]];
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
      <ModuleBody name={moduleData.event_name}>
        <div className="on_model_body">
          {msg && (
            <div className="model_body_row">
              {filterTags(ReactHtmlParser(msg))}
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
