import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import student from '../img/student.png';
import courses from '../img/education.png';
import Subjects from '../img/book.png';
import '../assets/css/teachermaindash.css'

export default function TeacherMainDashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
      },[])

    return (
        <div>
            <div className="header_sec">
                <div className="card_dash">
                    <div className="icon_dash">
                        <img src={student} alt="student"/>
                    </div>
                    <div className="body_dash">
                        <h1>Students</h1>
                        <h3>50</h3>
                    </div>
                </div>
                <div className="card_dash">
                    <div className="icon_dash">
                        <img src={courses} alt="student"/>
                    </div>
                    <div className="body_dash">
                        <h1>Courses</h1>
                        <h3>50</h3>
                    </div>
                </div>
                <div className="card_dash">
                    <div className="icon_dash">
                        <img src={Subjects} alt="student"/>
                    </div>
                    <div className="body_dash">
                        <h1>Subjects</h1>
                        <h3>50</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
