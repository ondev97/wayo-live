import React from 'react'
import { Link, matchPath, Route, useLocation } from 'react-router-dom'
import GenerateKeys from '../components/GenerateKeys'
import ViewIssuedKeys from './ViewIssuedKeys';
import '../assets/css/geneenrollmentkeys.css';
import '../assets/css/mediaFiles/enrollmentkey.css';

function GeneEnrollmentkeys() {
    
    let location = matchPath(useLocation().pathname,{
        path: ['/teacherdashboard/keys/genkeys/:id','/teacherdashboard/keys/viewallissuekey/:id'],
        exact: true,
        strict: false 
    });

    return (
        <div className="main_sub">
            <div className="simple_nav">
                <Link to={`/teacherdashboard/keys/genkeys/${location.params.id}`}>
                    Generate Enrollment Keys
                </Link>
                <Link to={`/teacherdashboard/keys/viewallissuekey/${location.params.id}`}>
                    View All Enrollment Keys
                </Link>
            </div>
            <div className="show">
                <Route path='/teacherdashboard/keys/genkeys/:id'>
                    <GenerateKeys/>
                </Route>
                <Route path='/teacherdashboard/keys/viewallissuekey/:id'>
                    <ViewIssuedKeys/>
                </Route>
            </div>
        </div>
    )
}

export default GeneEnrollmentkeys
