import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, useLocation } from 'react-router-dom';
import { activeAccount } from '../../actions';
import { loadStDetails } from '../../actions/stDetailsAction';
import UserStatus from '../../utils/hooks/UserStatus';
import StudentMainDashboard from './StudentMainDashboard';
import StudentDashBoardHeader from '../../components/student/StudentDashboardHeader';
import StProfile from './StProfile';
import StAllSubjects from './StAllSubjects';
import StCourses from './StCourses';
import Stmodules from './Stmodules';
import StMyCourses from "./StMyCourses";
import {AnimatePresence, motion} from "framer-motion";
import StSubCourses from "./StSubCourses";

export default function StudentDashBoard() {

    const dispatch = useDispatch();
    const [toggelProfile, settoggelProfile] = useState(false);
    const [toggle, settoggle] = useState(false);
    const location = useLocation();

    const {log,hadelLogOut} = UserStatus();//custom hook
    const {initialState} = useSelector(state => state.StudentDetails);
    
    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
    },[dispatch]);
    
    useLayoutEffect(() => {
        if(window.innerWidth < 867){
            togglemenu();
        }
    },[location])
    const togglemenu = ()=>{
        settoggle(!toggle);
    };

    if(!log){
        return <Redirect to="/"/>
    }

    const full = () =>{
        let elem = document.documentElement;
        if(!window.screenTop && !window.screenY){
            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
              elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
              elem.msRequestFullscreen();
            }
        }
        else{
            if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
              }
        }
    }
     const pageAni = {
        visible:{
            opacity:1,
            transition:{delay:0.1,ease:'easeOut'}
        },
        hidden:{
            opacity:0
        }
    }

    return (
        <div className="main">
            <div className={`main_column ${toggle ? 'active' : ''}`}>
                <StudentDashBoardHeader/>
            </div>
            <div className="main_column">
                <div className="head">
                    <div className="column">
                        <i onClick={togglemenu} className="fas fa-bars"></i>
                    </div>
                    <div className="column">
                        <div className="sec">
                            <span><i className="fas fa-expand" onClick={full}></i></span>
                        </div>
                        <div className="sec">
                            <div className="profile" onClick={()=>{settoggelProfile(!toggelProfile)}}>
                                <img src={`${initialState && `${initialState.profile_pic}` }`} alt="" />
                                <AnimatePresence exitBeforeEnter>
                                {
                                    toggelProfile ?
                                        <motion.div className={`drop_down ${toggelProfile ? 'prActive' : ''}`} variants={pageAni} animate='visible' initial='hidden' exit='hidden'>
                                            <div className="drop_down_list" style={toggelProfile ? {display:'block'} : {display:'none'}}>
                                                <ul>
                                                    <Link to='/studentdashboard/studentprofile/'><li><i className="far fa-user-circle"></i>Profile</li></Link>
                                                    <li onClick={hadelLogOut}><i className="fas fa-sign-out-alt" ></i>Log Out</li>
                                                </ul>
                                            </div>
                                        </motion.div>
                                    :''
                                }
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sub_column">
                    <Route path='/studentdashboard/maindashboard'>
                        <StudentMainDashboard/>
                    </Route>
                    <Route path='/studentdashboard/allsubjects/'>
                        <StAllSubjects/>
                    </Route>
                    <Route path='/studentdashboard/mycourses/'>
                        <StMyCourses/>
                    </Route>
                    <Route path='/studentdashboard/stcourses/:id'>
                        <StCourses/>
                    </Route>
                    <Route path='/studentdashboard/stmodules/:id'>
                        <Stmodules/>
                    </Route>
                    <Route path='/studentdashboard/studentprofile/'>
                        <StProfile/>
                    </Route>
                    <Route path='/studentdashboard/mycoursesforsubject/:id'>
                        <StSubCourses/>
                    </Route>
                </div>
            </div>
        </div>
    )
}
