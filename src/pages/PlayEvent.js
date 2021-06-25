import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

function PlayEvent() {
  let history = useHistory();
  const playIframe = useRef();

  useEffect(() => {
    if (history.location.state.value) {
      document.getElementById("outer").innerHTML = history.location.state.value;
      document.querySelector(".outer iframe").style.width = "100%";
      document.querySelector(".outer iframe").style.height = "100vh";
    } else {
      history.goBack();
    }
  }, [history]);
  return (
    <div
      className="outer"
      id="outer"
      style={{ width: "100%", height: "100%" }}
      ref={playIframe}
    ></div>
  );
}

export default PlayEvent;
