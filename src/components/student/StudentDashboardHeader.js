import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo1 from '../../img/Logo_1.png'

export default function StudentDashBoardHeader() {

    const {initialState} = useSelector(state => state.StudentDetails);

    return (
        <div>
            <div className="logo">
                <Link to={'/'} style={{textDecoration:"none"}}> <img src={logo1} alt="logo"/> </Link>
            </div>
            <div className="profile_menu">
                <div className="pro_pic">
                <img src={`${initialState && `${initialState.profile_pic}` }`} alt="" />
                </div>
                <div className="details">
                    <h2>{initialState && initialState.user.first_name} {initialState && initialState.user.last_name}</h2>
                    <h3>Student</h3>
                </div>
            </div>
            <div className="main_section">
                <div className="list">
                    <ul>
                        <Link to={'/'}><li><i className="fas fa-home"></i>Home</li></Link>
                        <Link to="/studentdashboard/maindashboard/"><li><i class="fas fa-school"></i>My Subjects</li></Link>
                        <Link to="/studentdashboard/mycourses/"><li><i className="fas fa-chalkboard-teacher"></i>My Courses</li></Link>
                        <Link to ="/studentdashboard/allsubjects/">
                            <li><i className="fas fa-graduation-cap"></i>All Subject</li>
                        </Link>
                        <Link to="/studentdashboard/studentprofile/">
                            <li><i className="far fa-user-circle"></i>My Profile</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
