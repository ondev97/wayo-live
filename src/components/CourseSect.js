import React from 'react'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'

export default function CourseSect({course_cover,course_name,price,duration,created_at,courseid,no}) {
    return (
        <Link to={`/teacherdashboard/models/${courseid}`}>
            <div className="grid_card_manage">
                <div className="grid_card_mg_head">
                    <img src={`${process.env.REACT_APP_LMS_MAIN_URL}${course_cover}`} alt=""/>
                    <div className="dura">
                        <h3><i className="far fa-clock cl"></i>{duration} Hrs</h3>
                    </div>
                </div>
                <div className="cos_manage_num">
                    <h3>{no<10 ? `0${no+1}` : no}</h3>
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
                    <h3>{course_name}</h3>
                    <h4>LKR {price}</h4>
                    <div className="cs_tail">
                        <h4><ReactTimeAgo date={Date.parse(created_at)} locale="en-US" /></h4>
                    </div>
                </div>
            </div>
        </Link>
    )
}
