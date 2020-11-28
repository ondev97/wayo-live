import React from 'react'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'

export default function TcMaCourses({id,subject_name,subject_cover,author,created_at,short_description,class_type,subject_type}) {
    return (
        <div className="course_card">
            <Link to={`/teacherdashboard/viewcourse/${id}`}>
                <div className="cscard_head">
                    <img src={`${process.env.REACT_APP_LMS_MAIN_URL}${subject_cover}`} alt=""/>
                    <div className="cos_options">
                        <h3><i className="fas fa-chevron-circle-up"></i></h3>
                            <div className="options_body">
                                <ul>
                                    <li>Delete</li>
                                    <li>Edit</li>
                                </ul>
                            </div>
                    </div>
                </div>
                <div className="cscard_body">
                    <div className="cscard_mid">
                        <h2>{subject_name}</h2>
                        <h3>{short_description}</h3>
                        <div className="ty">
                            <h4><i className="fas fa-graduation-cap"></i>{class_type}</h4>
                            <h5><i className="fas fa-school"></i>{subject_type}</h5>
                        </div>
                    </div>
                </div>
                <div className="cscard_bottom">
                    <h4>By:{author.user.first_name && author.user.last_name ? author.user.first_name+' '+author.user.last_name : ''}</h4>
                    <h4><i className="fas fa-clock"></i><ReactTimeAgo date={created_at} locale="en-US"/></h4>
                </div>
            </Link>
        </div>
    )
}//vwoplayer ublitio
