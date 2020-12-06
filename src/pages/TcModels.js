import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../assets/css/tcmoels.css';
import ModelsCourseDescri from '../components/ModelsCourseDescri';
import TcOneModel from '../components/TcOneModel';

export default function TcModels() {

    const {id} = useParams();

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
                           <TcOneModel/>
                           <TcOneModel/>
                        </div>
                    </div>
                </div>
                <div className="md_course_desc">
                    <ModelsCourseDescri/>
                </div>
            </div>
        </div>
    )
}
