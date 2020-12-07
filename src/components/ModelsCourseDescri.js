import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ModelPreviewAllStudents from '../components/ModelPreviewAllStudents';
import ReactTimeAgo from 'react-time-ago';

export default function ModelsCourseDescri({id}) {

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    const [courseDetails, setcourseDetails] = useState({});

    useEffect(async () => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/list/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setcourseDetails({...courseDetails,...res.data});
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [usDetails]);

    return (
        <div>
            <div className="course_desc_head">
                <div className="course_pic">
                    <img src={`${courseDetails.course_cover}`} alt=""/>
                    <div className="cos_options">
                        <button title="Edit This Course"><i className="fas fa-pencil-alt"></i>Edit Course</button>
                        <button title="Delete This Course"><i className="fas fa-trash-alt"></i>Delete Course</button>
                    </div>
                </div>
                <h2>{courseDetails.course_name}</h2>
                {
                    courseDetails.created_at && 
                        <h3><ReactTimeAgo date={Date.parse(courseDetails.created_at)} locale="en-US" /></h3>
                }
            </div>
            <div className="course_desc_body">
                <div className="course_short_desc">
                    <h3>Course Description</h3>
                    <p>{courseDetails.course_description}</p>
                </div>
                <div className="course_all_student">
                    <h3>Students</h3>
                    <ModelPreviewAllStudents/>
                </div>
            </div>
        </div>
    )
}
