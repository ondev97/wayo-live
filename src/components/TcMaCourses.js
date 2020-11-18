import React from 'react'
import { Link } from 'react-router-dom'
import rjs from '../img/rjs.jpg'

export default function TcMaCourses() {
    return (
        <div className="course_card">
            <Link to="/teacherdashboard/viewcourse">
                <div className="cscard_head">
                    <img src={rjs} alt=""/>
                    <div className="cos_options">
                        <h3><i className="fas fa-chevron-circle-up"></i></h3>
                            <div className="options_body">
                                <ul>
                                    <li>Delete</li>
                                    <li>Edit</li>
                                </ul>
                            </div>
                    </div>
                    <div className="card_course_time">
                        <h3><i className="fas fa-history"></i>25 Hours</h3>
                    </div>
                </div>
                <div className="cscard_body">
                    <div className="cscard_mid">
                        <h2>React JS</h2>
                        <h3>Java Script Library</h3>
                        <div className="ty">
                            <h4><i className="fas fa-graduation-cap"></i>A/L</h4>
                            <h5><i className="fas fa-school"></i>Revision</h5>
                        </div>
                    </div>
                </div>
                <div className="cscard_bottom">
                    <h4>By: Osada Manohara</h4>
                    <h4><i className="fas fa-clock"></i>1 day ago</h4>
                </div>
            </Link>
        </div>
    )
}
