import React, { useRef, useState, useEffect } from 'react'
import cs1 from '../img/cs1.jpg';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Axios from "axios";
import StudentCard from "./StudentCard";

export default function ModelPreviewAllStudents() {

    const {id} = useParams();
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    const [stuData, setstuData] = useState([]);

    useEffect(async() => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/students/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setstuData([...res.data]);
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [usDetails]);

    return (
            <div className="all_course_student">
                {
                    stuData.length !== 0 ?
                        stuData.map((sdata,index)=> <StudentCard key={index} student={sdata}/>)
                        :  ''
                }
            </div>
    )
}
