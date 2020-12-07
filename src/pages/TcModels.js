import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import '../assets/css/tcmoels.css';
import ModelsCourseDescri from '../components/ModelsCourseDescri';
import TcOneModel from '../components/TcOneModel';

export default function TcModels() {

    const {id} = useParams();
    const [moduleData, setmoduleData] = useState([]);
    const [moduleFiles, setmoduleFiles] = useState([]);
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    useEffect(async () => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/getmodules/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setmoduleData([...moduleData,...res.data]);

            }).catch(err=>{
                console.log(err);
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
                    setmoduleFiles([...moduleFiles,...arr]);
                }).catch(err=>{
                    console.log(err);
                })
                )
            }
        }, [moduleData]);

    return (
        <div>
            <div className="models">
                <div className="md_all_models">
                    <div className="models_en_nav">
                        <ul>
                            <Link to={`/teacherdashboard/keys/genkeys/${id}`}><li><i className="fas fa-key"></i>Generate Enrollment Keys</li></Link>
                            <Link to={`/teacherdashboard/keys/viewallissuekey/${id}`}><li><i className="fas fa-key"></i>View All Enrollment Keys</li></Link>
                        </ul>
                    </div>
                    <div className="md_models">
                        <div className="cr_models">
                            <Link to={`/teacherdashboard/createmodels/${id}`}>
                                <button><i className="fas fa-plus-circle"></i>Create Module</button>
                            </Link>
                        </div>
                        <div className="al_models">
                            {
                                moduleData.map((data)=>(
                                    <TcOneModel key={data.id} msg={data.module_content} name={data.module_name} id={data.id} moduleFiles={moduleFiles}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="md_course_desc">
                    <ModelsCourseDescri id={id}/>
                </div>
            </div>
        </div>
    )
}
