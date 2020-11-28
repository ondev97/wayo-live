import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import '../assets/css/courseview.css';
import CourseSect from '../components/CourseSect';

export default function CourseView() {

    const {id} = useParams();
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    const [courseData, setcourseData] = useState(null);
    
    useEffect(async() => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/courses/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setcourseData(res.data);
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [usDetails])

    return (
        <div className="ful_manage_course">
            <div className="top_manage_course">
                <div className="top_manage_head">
                    <h1>React JS</h1>
                    <h3>React For Beginners</h3>
                </div>
                <div className="options_subs">
                    <h3><i className="fas fa-sliders-h"></i></h3>
                        <div className="options_manage">
                            <ul>
                                <li><i className="far fa-trash-alt"></i> Delete Subject</li>
                                <li><i className="far fa-edit"></i> Edit Subject</li>
                            </ul>
                        </div>
                </div>
            </div>
            <div className="top_manage_body">
                <div className="mange_cos_body">
                    <div className="manage_course_nav">
                        <Link to={`/teacherdashboard/createcourse/${id}`}>
                            <button>Create Course</button>
                        </Link>
                        <button>Course Details</button>
                    </div>
                    <div className="manage_course_grid">
                        {
                            courseData ? 
                                    courseData.map((cdata,index)=> <CourseSect key={index} course_cover={cdata.course_cover} course_name={cdata.course_name} duration={cdata.duration} price={cdata.price} duration={cdata.duration} created_at={cdata.created_at} courseid={cdata.id} no={index}/>)
                            :null
                        }
                    </div>
                </div>     
            </div>
            <div className="short_dis_manage_course">
            </div>
        </div>
    )
}