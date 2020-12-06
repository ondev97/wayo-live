import React from 'react'
import { Link, Route } from 'react-router-dom'
import GenerateKeys from '../components/GenerateKeys'
import '../assets/css/geneenrollmentkeys.css';
import ViewIssuedKeys from './ViewIssuedKeys';

function GeneEnrollmentkeys() {
    return (
        <div className="main_sub">
            <div className="simple_nav">
                <Link to='/teacherdashboard/keys/genkeys'>
                    Generate Enrollment Keys
                </Link>
                <Link to='/teacherdashboard/keys/viewallissuekey'>
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
