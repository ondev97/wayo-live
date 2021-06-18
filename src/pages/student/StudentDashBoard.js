import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import { activeAccount } from "../../actions";
import { loadStDetails } from "../../actions/stDetailsAction";
import StudentMainDashboard from "./StudentMainDashboard";
import StudentDashBoardHeader from "../../components/student/StudentDashboardHeader";
import StProfile from "./StProfile";
import Contact from "./Contact";
import StCourses from "./StCourses";
import Stmodules from "./Stmodules";
import StMyCourses from "./StMyCourses";
import StSubCourses from "./StSubCourses";
import EventDetails from "./EventDetails";

function StudentDashBoard() {
  const dispatch = useDispatch();
  const [toggle, settoggle] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(activeAccount());
    dispatch(loadStDetails());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (window.innerWidth < 867) {
      settoggle(true);
    }
  }, [location]);

  return (
    <div className="main">
      <div className={`main_column ${toggle ? "active" : ""}`}>
        <StudentDashBoardHeader />
      </div>
      <div className="main_column">
        <div className="sub_column">
          <Route path="/studentdashboard/maindashboard">
            <StudentMainDashboard />
          </Route>
          <Route path="/studentdashboard/contact/">
            <Contact />
          </Route>
          <Route path="/studentdashboard/mycourses/">
            <StMyCourses />
          </Route>
          <Route path="/studentdashboard/stcourses/:id">
            <StCourses />
          </Route>
          <Route path="/studentdashboard/envetdetails/:id">
            <EventDetails />
          </Route>
          <Route path="/studentdashboard/stmodules/:id">
            <Stmodules />
          </Route>
          <Route path="/studentdashboard/studentprofile/">
            <StProfile />
          </Route>
          <Route path="/studentdashboard/mycoursesforsubject/:id">
            <StSubCourses />
          </Route>
        </div>
      </div>
    </div>
  );
}
export default StudentDashBoard;
