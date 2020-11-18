import React from 'react'
import { Link } from 'react-router-dom'
import cs1 from '../img/cs1.jpg';

export default function CourseSect() {
    return (
        <Link to="/teacherdashboard/models/">
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
        </Link>
    )
}
