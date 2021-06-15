import React, { useEffect, useLayoutEffect, useState } from "react";
import TeacherDashboardHeader from "../components/TeacherDashboardHeader";
import "../assets/css/dashboard.css";
import { Link, Redirect, Route, useLocation } from "react-router-dom";
import ProfileSettings from "./ProfileSettings";
import MangeCourse from "./MangeCourse";
import UserStatus from "../utils/hooks/UserStatus";
import AcDetails from "../utils/hooks/AcDetails";
import { useDispatch } from "react-redux";
import { activeAccount } from "../actions";
import CreateCourse from "./CreateCourse";
import CourseView from "./CourseView";
import TcModels from "./TcModels";
import CreateSubject from "./CreateSubject";
import CreateModels from "./CreateModels";
import GeneEnrollmentkeys from "./GeneEnrollmentkeys";
import UpdateSubject from "./UpdateSubject";
import UpdateCourse from "./UpdateCourse";
import UpdateModule from "./UpdateModule";
import AllStList from "./AllStList";
import { AnimatePresence, motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AddStudents from "./AddStudents";

export default function TeacherDashboard() {
  const [toggle, settoggle] = useState(false);
  const [toggelProfile, settoggelProfile] = useState(false);

  const { log, hadelLogOut } = UserStatus(); //custom hook
  const [teachProfilepic] = AcDetails();
  const dispatch = useDispatch();
  const location = useLocation();

  useLayoutEffect(() => {
    if (window.innerWidth < 867) {
      settoggle(true);
    }
  }, [location]);
  const togglemenu = () => {
    settoggle(!toggle);
  };

  const togglesh = () => {
    settoggelProfile(!toggelProfile);
  };

  useEffect(() => {
    dispatch(activeAccount());
  }, [dispatch]);

  if (!log) {
    return <Redirect to="/" />;
  }

  const full = () => {
    let elem = document.documentElement;
    if (!window.screenTop && !window.screenY) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  };
  const pageAni = {
    visible: {
      opacity: 1,
      transition: { delay: 0.1, ease: "easeOut" },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <div className="main">
      <div className={`main_column ${toggle ? "active" : ""}`}>
        <TeacherDashboardHeader />
      </div>
      <div className="main_column">
        <div className="head">
          <div className="column">
            <i onClick={togglemenu} className="fas fa-bars"></i>
          </div>
          <div className="column">
            <div className="sec">
              <span>
                <i className="fas fa-expand" onClick={full}></i>
              </span>
            </div>
            <div className="sec">
              <div className="profile" onClick={togglesh}>
                <LazyLoadImage
                  src={`${teachProfilepic}`}
                  alt=""
                  effect="blur"
                />
                <AnimatePresence exitBeforeEnter>
                  {toggelProfile ? (
                    <motion.div
                      className={`drop_down ${toggelProfile ? "prActive" : ""}`}
                      variants={pageAni}
                      animate="visible"
                      initial="hidden"
                      exit="hidden"
                    >
                      <div
                        className="drop_down_list"
                        style={
                          toggelProfile
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <ul>
                          <Link to="/teacherdashboard/profilesettings">
                            <li>
                              <i className="far fa-user-circle"></i>Profile
                            </li>
                          </Link>
                          <li onClick={hadelLogOut}>
                            <i className="fas fa-sign-out-alt"></i>Log Out
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    ""
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div className="sub_column">
          {/*<Route path='/teacherdashboard/teachermaindashboard'>*/}
          {/*    <TeacherMainDashboard/>*/}
          {/*</Route>*/}
          <Route path="/teacherdashboard/createsubject">
            <CreateSubject />
          </Route>
          <Route path="/teacherdashboard/createcourse/:id">
            <CreateCourse />
          </Route>
          <Route path="/teacherdashboard/createmodels/:id/:ccid">
            <CreateModels />
          </Route>
          <Route path="/teacherdashboard/managecourse">
            <MangeCourse />
          </Route>
          <Route path="/teacherdashboard/viewcourse/:id">
            <CourseView />
          </Route>
          <Route path="/teacherdashboard/models/:id/:cid">
            <TcModels />
          </Route>
          <Route path="/teacherdashboard/viewallst/:cid">
            <AllStList />
          </Route>
          <Route path="/teacherdashboard/addstudents/:cid">
            <AddStudents />
          </Route>
          <Route path="/teacherdashboard/profilesettings">
            <ProfileSettings />
          </Route>
          <Route path="/teacherdashboard/updatesubject/:subid">
            <UpdateSubject />
          </Route>
          <Route path="/teacherdashboard/updatecourse/:subid">
            <UpdateCourse />
          </Route>
          <Route path="/teacherdashboard/updatemodule/:cosid/:ccid">
            <UpdateModule />
          </Route>
          <Route path="/teacherdashboard/keys">
            <GeneEnrollmentkeys />
          </Route>
        </div>
      </div>
    </div>
  );
}
