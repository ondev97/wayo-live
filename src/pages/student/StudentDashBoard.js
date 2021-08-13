import { Link, Redirect, Route, useLocation } from "react-router-dom";
import { activeAccount } from "../../actions";
import { loadStDetails } from "../../actions/stDetailsAction";
import UserStatus from "../../utils/hooks/UserStatus";
import StudentMainDashboard from "./StudentMainDashboard";
import StudentDashBoardHeader from "../../components/student/StudentDashboardHeader";
import StProfile from "./StProfile";
import StCourses from "./StCourses";
import Stmodules from "./Stmodules";
import StMyCourses from "./StMyCourses";
import { AnimatePresence, motion } from "framer-motion";
import StSubCourses from "./StSubCourses";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import Contact from "./Contact";
import EventDetails from "./EventDetails";
import UserGuide from "../UserGuide";
import Form from "./Form";

function StudentDashBoard() {
  const dispatch = useDispatch();
  const [toggelProfile, settoggelProfile] = useState(false);
  const [redirect, setredirect] = useState(false);
  const [toggle, settoggle] = useState(false);
  const location = useLocation();

  const { log, hadelLogOut } = UserStatus(); //custom hook
  const { initialState } = useSelector((state) => state.StudentDetails);

  useEffect(() => {
    dispatch(activeAccount());
    dispatch(loadStDetails());
  }, [dispatch]);

  useEffect(() => {
    if (initialState && initialState.user.is_band) {
      setredirect(true);
    }
  }, [initialState]);

  useLayoutEffect(() => {
    if (window.innerWidth < 867) {
      settoggle(true);
    }
    if (location.pathname.includes("/audiencedashboard/envet")) {
      document.querySelector(".head").style.display = "flex";
      settoggle(true);
    }
  }, [location]);
  const togglemenu = () => {
    settoggle(!toggle);
  };

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
        <StudentDashBoardHeader />
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
              <div
                className="profile"
                onClick={() => {
                  settoggelProfile(!toggelProfile);
                }}
              >
                <LazyLoadImage
                  src={`${initialState && `${initialState.user_image}`}`}
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
                          <Link to="/audiencedashboard/myprofile/">
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
          <Route path="/audiencedashboard/maindashboard">
            <StudentMainDashboard />
          </Route>
          <Route path="/audiencedashboard/contact/">
            <Contact />
          </Route>
          <Route path="/studentdashboard/mycourses/">
            <StMyCourses />
          </Route>
          <Route path="/studentdashboard/stcourses/:id">
            <StCourses />
          </Route>
          <Route path="/audiencedashboard/envetdetails/:id">
            <EventDetails />
          </Route>
          <Route path="/audiencedashboard/envet/:id">
            <Stmodules />
          </Route>
          <Route path="/audiencedashboard/myprofile/">
            <StProfile />
          </Route>
          <Route path="/audiencedashboard/eventsinband/:id">
            <StSubCourses />
          </Route>
          <Route path="/audiencedashboard/userguide/">
            <UserGuide />
          </Route>
          {/* <Route path="/audiencedashboard/playevent">
            <PlayEvent />
          </Route> */}
          <Route path="/audiencedashboard/form/:id">
            <Form />
          </Route>
        </div>
      </div>
    </div>
  );
}
export default StudentDashBoard;
