import React from 'react'
import { Link, matchPath, Route, useHistory, useLocation, useParams } from 'react-router-dom'
import GenerateKeys from '../components/GenerateKeys'
import ViewIssuedKeys from './ViewIssuedKeys';
import '../assets/css/geneenrollmentkeys.css';
import '../assets/css/mediaFiles/enrollmentkey.css';

function GeneEnrollmentkeys() {

    let location = matchPath(useLocation().pathname,{
        path: ['/teacherdashboard/keys/genkeys/:id/:ccid','/teacherdashboard/keys/viewallissuekey/:id/:ccid'],
        exact: true,
        strict: false 
    });

    console.log(location.params.ccid);

    return (
        <div className="main_sub">
            <div className="simple_nav">
                <Link to={`/teacherdashboard/keys/genkeys/${location.params.id}/${location.params.ccid}`}>
                    Generate Enrollment Keys
                </Link>
                <Link to={`/teacherdashboard/keys/viewallissuekey/${location.params.id}/${location.params.ccid}`}>
                    View All Enrollment Keys
                </Link>
            </div>
            <div className="show">
            <div className="back">
                <Link to={`/teacherdashboard/models/${location.params.id}/${location.params.ccid}`}>
                <button><i className="fas fa-chevron-circle-left"></i>Back to Courses</button>
                </Link>
            </div>
                <Route path='/teacherdashboard/keys/genkeys/:id/:ccid'>
                    <GenerateKeys/>
                </Route>
                <Route path='/teacherdashboard/keys/viewallissuekey/:id/:ccid'>
                    <ViewIssuedKeys/>
                </Route>
            </div>
        </div>
    )
}

export default GeneEnrollmentkeys
