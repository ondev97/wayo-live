import React, {useEffect, useState} from 'react';
import ab1 from '../img/ab1.png';
import ab2 from '../img/ab2.png';
import '../assets/css/about.css';
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import { loadStDetails } from '../actions/stDetailsAction';
import Axios from "axios";

export default function About() {

    const dispatch = useDispatch();
    const [statistics, setstatistics] = useState({'students':0})
    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
        Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/stat/`).then(res=>{
                setstatistics(res.data)
            }).catch(err=>{
                console.log(err)
            });
      },[dispatch])

    return (
        <div className="maininde">
            <div className="upper_cover">
                <h1>About Us</h1>
            </div>
            <div className="body_sec">
                <div className="ab_column">
                    <h1>Who We Are?</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis facilis expedita quam, perferendis itaque nam? In labore rerum autem, eveniet ipsa, recusandae omnis, laudantium eius culpa aut illum sint deserunt.Illum amet, temporibus aspernatur esse similique eius! Voluptatem natus nihil voluptatibus voluptates deserunt autem similique rem. Excepturi libero, reprehenderit, ratione obcaecati, perferendis molestias in minima est amet eaque fugit eius?</p>
                </div>
                <div className="ab_column">
                    <img src={ab1} alt="image"/>
                </div>
            </div>
            <div className="body_sec">
                <div className="ab_column">
                    <img src={ab2} alt="image"/>
                </div>
                <div className="ab_column">
                    <h1>What We Do?</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis facilis expedita quam, perferendis itaque nam? In labore rerum autem, eveniet ipsa, recusandae omnis, laudantium eius culpa aut illum sint deserunt.Illum amet, temporibus aspernatur esse similique eius! Voluptatem natus nihil voluptatibus voluptates deserunt autem similique rem. Excepturi libero, reprehenderit, ratione obcaecati, perferendis molestias in minima est amet eaque fugit eius?</p>
                </div>
            </div>
            <div className="inde_counter">
                <div className="main_inde_counter">
                <h1>Teachers open the door, but you must enter by yourself</h1>
                    <div className="wr">
                        <div className="counter_colu">
                            <h2>Students</h2>
                            <h3>{statistics.students}+</h3>
                        </div>
                        <div className="counter_colu">
                            <h2>Subjects</h2>
                            <h3>{statistics.subjects}+</h3>
                        </div>
                        <div className="counter_colu">
                            <h2>Instructors</h2>
                            <h3>{statistics.teachers}+</h3>
                        </div>
                        <div className="counter_colu">
                            <h2>Courses</h2>
                            <h3>{statistics.courses}+</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
