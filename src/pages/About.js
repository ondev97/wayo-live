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
    const [statistics, setstatistics] = useState({'students':0, 'courses':0, 'teachers':0, 'subjects':0})
    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
        Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/stat/`).then(res=>{
                setstatistics(res.data)
            }).catch(err=>{

            });
        window.scrollTo(0, 0);
      },[dispatch])

    return (
        <div className="maininde">
            <div className="upper_cover">
                <h1>About Us</h1>
            </div>
            <div className="body_sec">
                <div className="ab_column">
                    <h1>Who We Are?</h1>
                    <p>‘eyekoneclass.lk’ is an educational website where school learners can study all their school syllabus online. ‘eyekoneclass.lk’ provides courses mainly focusing on G. C. E. Advanced Level students. Apart from the Advanced Level students, 'eyekoneclass.lk' also provides courses for students who are facing G. C. E. Ordinary Level examination and courses for other professional qualifications like certificate level, diploma level and chartered level. As teachers, we instil the belief in our students that they can achieve anything. With years of experience in teaching excellence, we teach and improve our students to gain their best results for the upcoming examinations and build the environment to maximize their potentials.</p>
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
                    <p>Under the guidance of a well experienced as well as a good leader, we march forward to gaining the excellence of the online classes in Sri Lanka's number one institute while revolutionizing the education in Sri Lanka. With the current situation of the world, we change our teaching culture towards the online world while providing an uninterrupted learning mind of students. Our vision is becoming the leader of online classes, discovering the knowledgeable and skilled professionals to the labour industry in the world. In addition to teaching, we improve our student's skills and good attitudes. We will treat students as individuals and try to meet their intellectual and emotional needs. Finally, our utmost aim for fulfilling the need for good people in society.</p>
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
