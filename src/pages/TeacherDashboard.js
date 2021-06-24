import React, { useEffect, useLayoutEffect, useState } from "react";
import TeacherDashboardHeader from "../components/TeacherDashboardHeader";
import "../assets/css/dashboard.css";
import { Link, Redirect, Route, useLocation } from "react-router-dom";
import ProfileSettings from "./ProfileSettings";
import MangeCourse from "./MangeCourse";
import UserStatus from "../utils/hooks/UserStatus";
import AcDetails from "../utils/hooks/AcDetails";
import { useDispatch, useSelector } from "react-redux";
import { activeAccount } from "../actions";
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
import TcEventDetails from "./TcEventDetails";

export default function TeacherDashboard() {
  const [toggle, settoggle] = useState(false);
  const [toggelProfile, settoggelProfile] = useState(false);
  const [redirect, setredirect] = useState(false);

  const { log, hadelLogOut } = UserStatus(); //custom hook
  const { profileDetails, teachProfilepic } = AcDetails();
  const usDetails = useSelector((state) => state.accountDetails);
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

  useEffect(() => {
    if (usDetails && !usDetails.is_band) {
      setredirect(true);
    }
  }, [usDetails]);

  if (!log) {
    return <Redirect to="/" />;
  }

  if (redirect) {
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
          <Route path="/band/createevent">
            <CreateSubject profileDetails={profileDetails} />
          </Route>
          <Route path="/band/createshow">
            <CreateModels />
          </Route>
          <Route path="/band/managecourse">
            <MangeCourse />
          </Route>
          <Route path="/band/viewevent/:id">
            <TcEventDetails />
          </Route>
          <Route path="/band/event/:id/">
            <TcModels />
          </Route>
          <Route path="/band/viewaudience/:id">
            <AllStList />
          </Route>
          <Route path="/band/addaudience/:id">
            <AddStudents />
          </Route>
          <Route path="/band/profilesettings">
            <ProfileSettings />
          </Route>
          <Route path="/band/updateevent/:subid">
            <UpdateSubject />
          </Route>
          <Route path="/teacherdashboard/updatecourse/:subid">
            <UpdateCourse />
          </Route>
          <Route path="/teacherdashboard/updatemodule/:cosid/:ccid">
            <UpdateModule />
          </Route>
          <Route path="/band/ticket">
            <GeneEnrollmentkeys />
          </Route>
        </div>
      </div>
    </div>
  );
}
