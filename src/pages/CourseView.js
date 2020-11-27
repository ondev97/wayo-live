import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../assets/css/courseview.css';
import CourseSect from '../components/CourseSect';

export default function CourseView() {

    const {id} = useParams();
    

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
                                <li><i class="far fa-trash-alt"></i> Delete Subject</li>
                                <li><i class="far fa-edit"></i> Edit Subject</li>
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
                        <CourseSect/>
                        <CourseSect/>
                        <CourseSect/>
                        <CourseSect/>
                    </div>
                </div>     
            </div>
            <div className="short_dis_manage_course">
            </div>
        </div>
    )
}