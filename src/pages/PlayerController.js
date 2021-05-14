import React, { useState } from "react";

export default function PlayerController({
  playing,
  setplaying,
  setvolume,
  volume,
  setmute,
  mute,
}) {
  const [rangeVolume, setrangeVolume] = useState(1);

  //push and play
  const playPush = (e) => {
    if (
      e.target.className.includes("player_overlay") ||
      e.target.className.includes("playpush")
    ) {
      if (playing) {
        setplaying(false);
      } else {
        setplaying(true);
      }
    }
  };

  //volume controller
  const volumeController = (e) => {
    let value = parseFloat(e.target.value);
    setrangeVolume(value);
    setvolume(value);
  };

  return (
    <>
      <div className="player_overlay" onClick={playPush}>
        <div className="playPush">
          <div className="icon">
            <i
              className={
                playing ? "fas fa-pause playpush" : "fas fa-play playpush"
              }
              onClick={playPush}
            ></i>
          </div>
        </div>
        <div className="volume">
          <div className="icon">
            {!mute && volume > 0.5 ? (
              <i className="fas fa-volume-up" onClick={() => setmute(true)}></i>
            ) : volume <= 0.5 && volume > 0 && !mute ? (
              <i
                className="fas fa-volume-down"
                onClick={() => setmute(true)}
              ></i>
            ) : volume === 0 && !mute ? (
              <i
                className="fas fa-volume-mute"
                onClick={() => setmute(true)}
              ></i>
            ) : (
              <i
                className="fas fa-volume-mute"
                onClick={() => setmute(false)}
              ></i>
            )}
          </div>
          <div className="seekslider">
            <input
              type="range"
              className="seek"
              name="seek"
              max="1"
              min="0"
              step="0.1"
              value={rangeVolume}
              onChange={volumeController}
            />
          </div>
        </div>
      </div>
    </>
  );
}
