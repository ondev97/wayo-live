import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { activeAccount } from '../actions';
import student from '../img/student.png';
import courses from '../img/education.png';
import Subjects from '../img/book.png';
import '../assets/css/teachermaindash.css'
import Axios from "axios";

export default function TeacherMainDashboard() {
    const dispatch = useDispatch();

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    const [statistics, setstatistics] = useState({'students':0, 'courses':0, 'subjects':0})
    const [isLoading, setisLoading] = useState(false);

    useEffect(async() => {
        dispatch(activeAccount());
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/teacherstat/`,{
                headers:{Authorization:"Token " + usDetails.key}
            }).then(res=>{
                setstatistics(res.data);
            }).catch(err=>{

            })
        }
        console.log(usDetails)
      },[dispatch])

    return (
        <div>
            <div className="header_sec">
                <div className="card_dash">
                    <div className="icon_dash">
                        <img src={student} alt="student"/>
                    </div>
                    <div className="body_dash">
                        <h1>Students</h1>
                        <h3>{statistics.students}</h3>
                    </div>
                </div>
                <div className="card_dash">
                    <div className="icon_dash">
                        <img src={courses} alt="student"/>
                    </div>
                    <div className="body_dash" onClick={()=>{
                        alert(usDetails.key)
                    }}>
                        <h1>Courses</h1>
                        <h3>{statistics.courses}</h3>
                    </div>
                </div>
                <div className="card_dash">
                    <div className="icon_dash">
                        <img src={Subjects} alt="student"/>
                    </div>
                    <div className="body_dash">
                        <h1>Subjects</h1>
                        <h3>{statistics.subjects}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
