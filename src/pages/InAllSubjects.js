import React, {useEffect, useState} from 'react';
import rjs from '../img/rjs.jpg';
import child from '../img/child.png';
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import { loadStDetails } from '../actions/stDetailsAction';
import '../assets/css/allsubjects.css';
import Axios from "axios";
import InTeacher from "../components/InTeacher";
import AllSubCard from "../components/AllSubCard";

export default function InAllSubjects() {
    const dispatch = useDispatch();
    const [allSubDetails, setallSubDetails] = useState([])
    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
        Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/indexsub/`).then(res=>{
                setallSubDetails([...res.data])
            }).catch(err=>{
                console.log(err)
            });
        window.scrollTo(0, 0);
      },[dispatch]);

    return (
        <div className='maininde'>
            <div className="upper_cover">
                <h1>Subjects</h1>
            </div>
                <div className="popular_subjects">
                    <div className="subject_area">
                        {
                            allSubDetails.map((tdata,index)=> <AllSubCard key={index} subject={tdata}/>)
                        }
                    </div>
                </div>
        </div>
    )
}
