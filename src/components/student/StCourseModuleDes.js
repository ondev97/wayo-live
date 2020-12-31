import {useParams} from "react-router-dom";

import React, { useEffect, useState } from 'react';
import rjs from '../../img/rjs.jpg'
import ModelPreviewAllStudents from '../ModelPreviewAllStudents';
import {useSelector} from "react-redux";
import Axios from "axios";
import ReactTimeAgo from "react-time-ago";

export default function StCourseModuleDes() {
    const usDetails = useSelector(state => state.accountDetails);
    const [courseData, setcourseData] = useState({'created_at':'2020-12-29T22:59:02.384639+05:30'});
    const {id} = useParams();

    useEffect(async () => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/viewcourse/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setcourseData(res.data);
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [usDetails]);

    return (
        <div className='colCourseView'>
            <div className="course_desc_head">
                <div className="course_pic">
                    <img src={`${courseData.course_cover}`} alt=""/>
                    <div className="cos_options">
                        <button><i className="fas fa-trash-alt"></i><span>Unenroll Me</span></button>
                    </div>
                </div>
                <h2>{courseData.course_name}</h2>
                <h3><ReactTimeAgo date={Date.parse(courseData.created_at)} locale="en-US" /></h3>
            </div>
            <div className="course_desc_body">
                <div className="course_short_desc">
                    <h3>Course Description</h3>
                    <p>{courseData.course_description}</p>
                </div>
                <div className="course_all_student">
                    <h3>Students</h3>
                    <ModelPreviewAllStudents/>
                </div>
            </div>
        </div>
    )
}
