import React from 'react'
import '../assets/css/coursemanage.css'
import TcMaCourses from '../components/TcMaCourses'

export default function MangeCourse() {
    return (
        <div className="main_ar_course">
            <div className="course_head">
                <div className="crcs">
                    <h2>Create Course</h2>
                </div>
                <div className="search">
                    <input type="text" name="search" placeholder="Search Your Courses"/>
                    <button><i className="fas fa-search"></i></button>
                </div>
            </div>
            <div className="course_body">
                <TcMaCourses/>
                <TcMaCourses/>
                <TcMaCourses/>
                <TcMaCourses/>
            </div>
        </div>
    )
}
