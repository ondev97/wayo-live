import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { store } from "react-notifications-component";
import Axios from "axios";

function KeyModel({
  setismodel,
  id,
  setredirect,
  ismodel,
  usDetails,
  style,
  content,
  setcontent,
  setstyle,
}) {
  const modelOuter = useRef();

  const [key, setkey] = useState("");

  const closemodel = () => {
    if (ismodel) {
      setismodel(false);
    }
  };
  const closemodelouter = (e) => {
    if (e.target.className === modelOuter.current.className) {
      setismodel(false);
    }
  };
  const modelAni = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };
  const pageAni = {
    visible: {
      opacity: 1,
      transition: { delay: 0.5 },
    },
    hidden: {
      opacity: 0,
    },
  };
  const handelKey = (e) => {
    const key = e.target.value;
    setkey(key);
    setcontent("");
    setstyle({ color: "red", visibility: "hidden" });
  };
  const clk = () => {
    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/show/addtoevent/${id}/`,
      {
        ticket_number: key,
      },
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    )
      .then(() => {
        closemodel();
        store.addNotification({
          title: "Sucessfully Enrolled",
          message: process.env.REACT_APP_LMS_ALERT_NAME,
          type: "success",
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
      })
      .catch((err) => {
        setcontent(err.response.data.message);
        setstyle({ color: "red", visibility: "visible" });
      });
  };
  return (
    <>
      <motion.div
        className="key_model_outer"
        ref={modelOuter}
        onClick={closemodelouter}
        variants={modelAni}
        animate="visible"
        initial="hidden"
        exit="hidden"
      >
        <motion.div
          className="key_model_page"
          variants={pageAni}
          animate="visible"
          initial="hidden"
        >
          <div className="close_key_mod">
            <i onClick={closemodel} className="fas fa-times-circle"></i>
          </div>
          <h3>ENTER TICKET ID</h3>
          <div className="inpu">
            <input type="text" name="key" onChange={handelKey} />
            <button onClick={clk}>JOIN</button>
          </div>
          <p id={"err"} style={style}>
            {content}
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}

export default KeyModel;
