import React, { useEffect } from 'react';
import rjs from '../img/rjs.jpg';
import child from '../img/child.png';
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import { loadStDetails } from '../actions/stDetailsAction';
import '../assets/css/allsubjects.css';

export default function InAllSubjects() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
      },[dispatch]);

    return (
        <div className='maininde'>
            <div className="upper_cover">
                <h1>Subjects</h1>
            </div>
                <div className="popular_subjects">
                    <div className="subject_area">
                        <div className="subject_in_cards">
                            <div className="subject_head">
                                <div className="subject_img">
                                    <img src={rjs} alt="subjects"/>
                                </div>
                                <div className="teach_img">
                                    <img src={child} alt="child"/>
                                </div>
                            </div>
                            <div className="subject_body">
                                <h2>English For Beginners</h2>
                                <p>Teacher Name Here</p>
                                <div className="row_sim">
                                    <h3><i className="far fa-user"></i>500 Students</h3>
                                    <h3><i className="fas fa-graduation-cap"></i>A/L</h3>
                                </div>
                            </div>
                            <div className="subject_tail">
                                <p><i className="far fa-clock"></i>One Hour Ago</p>
                            </div>
                        </div>
                        <div className="subject_in_cards">
                            <div className="subject_head">
                                <div className="subject_img">
                                    <img src={rjs} alt="subjects"/>
                                </div>
                                <div className="teach_img">
                                    <img src={child} alt="child"/>
                                </div>
                            </div>
                            <div className="subject_body">
                                <h2>English For Beginners</h2>
                                <p>Teacher Name Here</p>
                                <div className="row_sim">
                                    <h3><i className="far fa-user"></i>500 Students</h3>
                                    <h3><i className="fas fa-graduation-cap"></i>A/L</h3>
                                </div>
                            </div>
                            <div className="subject_tail">
                                <p><i className="far fa-clock"></i>One Hour Ago</p>
                            </div>
                        </div>
                        <div className="subject_in_cards">
                            <div className="subject_head">
                                <div className="subject_img">
                                    <img src={rjs} alt="subjects"/>
                                </div>
                                <div className="teach_img">
                                    <img src={child} alt="child"/>
                                </div>
                            </div>
                            <div className="subject_body">
                                <h2>English For Beginners</h2>
                                <p>Teacher Name Here</p>
                                <div className="row_sim">
                                    <h3><i className="far fa-user"></i>500 Students</h3>
                                    <h3><i className="fas fa-graduation-cap"></i>A/L</h3>
                                </div>
                            </div>
                            <div className="subject_tail">
                                <p><i className="far fa-clock"></i>One Hour Ago</p>
                            </div>
                        </div>
                        <div className="subject_in_cards">
                            <div className="subject_head">
                                <div className="subject_img">
                                    <img src={rjs} alt="subjects"/>
                                </div>
                                <div className="teach_img">
                                    <img src={child} alt="child"/>
                                </div>
                            </div>
                            <div className="subject_body">
                                <h2>English For Beginners</h2>
                                <p>Teacher Name Here</p>
                                <div className="row_sim">
                                    <h3><i className="far fa-user"></i>500 Students</h3>
                                    <h3><i className="fas fa-graduation-cap"></i>A/L</h3>
                                </div>
                            </div>
                            <div className="subject_tail">
                                <p><i className="far fa-clock"></i>One Hour Ago</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
