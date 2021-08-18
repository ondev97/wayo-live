import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import StModuleBody from "./StModuleBody";
import LazyLoad from "react-lazyload";
import ReactHtmlParser from "react-html-parser";
import { useHistory } from "react-router";

export default function StOneModule({
  moduleData,
  name,
  msg,
  setvideoLink,
  setsetVideo,
  modId,
}) {
  const [playing, setplaying] = useState(false);
  const [iValue, setiValue] = useState("");
  const [src, setsrc] = useState("");
  const valueRef = useRef();

  let history = useHistory();

  const play = (link) => {
    setplaying(true);
    setvideoLink(link);
    setsetVideo(true);
    setplaying(false);
  };

  const playPush = (e) => {
    if (e.target.className.includes("player_overlay")) {
      if (playing) {
        setplaying(false);
      } else {
        setplaying(true);
      }
    }
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

  useEffect(() => {
    setiValue(valueRef.current);
  }, []);
  useEffect(() => {
    if (iValue) {
      document.getElementById("setValue").innerHTML = iValue;
      // getI();
    }
  }, [iValue]);

  // function getI() {
  //   let ifra = document.querySelector("#setValue iframe");
  //   setsrc(ifra.getAttribute("src"));
  // }

  // //play Iframe
  // const playIframe = () => {
  //   setplaying(true);
  //   setplaying(false);
  //   history.push({
  //     pathname: "/audiencedashboard/playevent",
  //     state: {
  //       value: iValue,
  //     },
  //   });
  // };

  return (
    <LazyLoad height={200}>
      <StModuleBody name={moduleData.event_name} id={modId}>
        <div className="on_model_body">
          {msg && (
            <div className="model_body_row">
              {filterTags(ReactHtmlParser(msg))}
              <div ref={valueRef} style={{ display: "none" }}></div>
              {iValue ? (
                <>
                  <div id="setValue"></div>
                </>
              ) : (
                ""
              )}
              {/* <div className="event_details_dis">
                <h3>EVENT DETAILS </h3>
                <p>EVENT START TIME : {moduleData.event_start || ""}</p>
                <p>EVENT END TIME : {moduleData.event_end || ""}</p>
              </div> */}
            </div>
          )}
        </div>
      </StModuleBody>
    </LazyLoad>
  );
}
