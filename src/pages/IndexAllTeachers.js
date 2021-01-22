import React, {useEffect, useState} from 'react';
import '../assets/css/allteachers.css';
import { activeAccount } from '../actions';
import { loadStDetails } from '../actions/stDetailsAction';
import { useDispatch } from 'react-redux';
import InTeacher from '../components/InTeacher';
import Axios from "axios";
import SubjectsCard from "../components/student/SubjectsCard";
import ProfileLoader from "../components/ProfileLoader";

export default function IndexAllTeachers() {

    const dispatch = useDispatch();
    const [teacherDetails, setteacherDetails] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
        setisLoading(true);
        Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/account-api/teachers/`).then(res=>{
                setisLoading(false);
                setteacherDetails([...res.data])
            }).catch(err=>{

            });
        window.scrollTo(0, 0);
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
            </div>
            {
                isLoading &&  <ProfileLoader/>
            }
        </div>
    )
}
