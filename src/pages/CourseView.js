import React from 'react';
import '../assets/css/courseview.css';
import cs1 from '../img/cs1.jpg';

export default function CourseView() {
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
                        <button>Create Course</button>
                        <button>Course Details</button>
                    </div>
                    <div className="manage_course_grid">
                        <div className="grid_card_manage">
                            <div className="grid_card_mg_head">
                                <img src={cs1} alt=""/>
                            </div>
                            <div className="cos_manage_num">
                                <h3>01</h3>
                            </div>
                            <div className="cos_options_mna">
                                <h3><i className="fas fa-chevron-circle-up"></i></h3>
                                <div className="options_manage">
                                    <ul>
                                        <li>Delete</li>
                                        <li>Edit</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid_card_mg_body">
                                <h3>Basic Components React Js</h3>
                                <h4>10 Modules</h4>
                                <div className="cs_tail">
                                    <h4>1 Day Ago</h4>
                                </div>
                            </div>
                        </div>
                        <div className="grid_card_manage">
                            <div className="grid_card_mg_head">
                                <img src={cs1} alt=""/>
                            </div>
                            <div className="cos_manage_num">
                                <h3>02</h3>
                            </div>
                            <div className="cos_options_mna">
                                <h3><i className="fas fa-chevron-circle-up"></i></h3>
                                <div className="options_manage">
                                    <ul>
                                        <li>Delete</li>
                                        <li>Edit</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid_card_mg_body">
                                <h3>Basic Components React Js</h3>
                                <h4>10 Modules</h4>
                                <div className="cs_tail">
                                    <h4>1 Day Ago</h4>
                                </div>
                            </div>
                        </div>
                        <div className="grid_card_manage">
                            <div className="grid_card_mg_head">
                                <img src={cs1} alt=""/>
                            </div>
                            <div className="cos_manage_num">
                                <h3>03</h3>
                            </div>
                            <div className="cos_options_mna">
                                <h3><i className="fas fa-chevron-circle-up"></i></h3>
                                <div className="options_manage">
                                    <ul>
                                        <li>Delete</li>
                                        <li>Edit</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid_card_mg_body">
                                <h3>Basic Components React Js</h3>
                                <h4>10 Modules</h4>
                                <div className="cs_tail">
                                    <h4>1 Day Ago</h4>
                                </div>
                            </div>
                        </div>
                        <div className="grid_card_manage">
                            <div className="grid_card_mg_head">
                                <img src={cs1} alt=""/>
                            </div>
                            <div className="cos_manage_num">
                                <h3>04</h3>
                            </div>
                            <div className="cos_options_mna">
                                <h3><i className="fas fa-chevron-circle-up"></i></h3>
                                <div className="options_manage">
                                    <ul>
                                        <li>Delete</li>
                                        <li>Edit</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid_card_mg_body">
                                <h3>Basic Components React Js</h3>
                                <h4>10 Modules</h4>
                                <div className="cs_tail">
                                    <h4>1 Day Ago</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>     
            </div>
            <div className="short_dis_manage_course">
            </div>
        </div>
    )
}