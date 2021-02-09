import React, { useEffect, useState } from 'react';
import {Redirect, useParams,useHistory} from 'react-router-dom';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import StOneModule from '../../components/student/StOneModule';
import StCourseModuleDes from '../../components/student/StCourseModuleDes';
import {store} from "react-notifications-component";

export default function Stmodules() {
    const [isToggle, setisToggle] = useState(false)
    const {id} = useParams();
    const [moduleData, setmoduleData] = useState([]);
    const [moduleFiles, setmoduleFiles] = useState([]);
    const [redirect, setredirect] = useState(false);
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    let history = useHistory();
            
    const back =()=>{
        history.goBack();
    }

    useEffect(async () => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/getmodules/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setmoduleData(res.data);
            }).catch(err=>{
                console.log(err);
                store.addNotification({
                    title: err.response.data.message,
                    message: "Eyekon eClass",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                        pauseOnHover: true,
                        showIcon:true
                    },
                    width:600
                });
                setredirect(true);
            })
        }
    }, [usDetails]);

    useEffect(() => {
        if(moduleData.length !== 0){
            let arr = [];
            moduleData.map((data)=>
                Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/getmodulefiles/${data.id}/`,{
                    headers:{Authorization:"Token "+usDetails.key}
                }).then(res=>{
                    arr.push({[data.id]:res.data});
                    setmoduleFiles([...arr]);
                }).catch(err=>{

                })
                )
            }
        }, [moduleData]);

    if(redirect){
        return <Redirect to={`/studentdashboard/mycourses/`}/>
    }

    return (
        <div>
            <div className="models">
                <div className="md_all_models">
                    <div className="md_models">
                         <div className="cr_models">
                            <button onClick={back}><i className="fas fa-chevron-circle-left"></i>Back to Course</button>
                        </div>
                        <div className="al_models">
                            {
                                moduleData.length !== 0 ?
                                    moduleData.map((data)=>(
                                       <StOneModule key={data.id} msg={data.module_content} name={data.module_name} id={data.id} moduleFiles={moduleFiles}/>
                                    ))
                                :   <div className="empy">
                                        <h3>No Course Module Available..</h3>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="md_course_desc">
                    <StCourseModuleDes/>
                </div>
            </div>
        </div>
    )
}
