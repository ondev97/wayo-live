import React, {useEffect, useState} from 'react';
import '../assets/css/allteachers.css';
import { activeAccount } from '../actions';
import { loadStDetails } from '../actions/stDetailsAction';
import { useDispatch } from 'react-redux';
import InTeacher from '../components/InTeacher';
import Axios from "axios";
import SubjectsCard from "../components/student/SubjectsCard";

export default function IndexAllTeachers() {

    const dispatch = useDispatch();
    const [teacherDetails, setteacherDetails] = useState([])

    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
        Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/account-api/teachers/`).then(res=>{
                setteacherDetails([...res.data])
            }).catch(err=>{
                console.log(err)
            });
      },[dispatch])

    return (
        <div className="maininde">
            <div className="upper_cover">
                <h1>Teachers</h1>
            </div>
            <div className="tech_body">
                {
                   teacherDetails.map((tdata,index)=> <InTeacher key={index} teacher={tdata}/>)
                }
                {/*<InTeacher/>*/}
                {/*<InTeacher/>*/}
                {/*<InTeacher/>*/}
                {/*<InTeacher/>*/}
                {/*<InTeacher/>*/}
                {/*<InTeacher/>*/}
                {/*<InTeacher/>*/}
            </div>
        </div>
    )
}
