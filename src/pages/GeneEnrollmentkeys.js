import React from 'react'
import { Link, Route } from 'react-router-dom'
import GenerateKeys from '../components/GenerateKeys'
import ViewAllEnroKeys from '../components/ViewAllEnroKeys';
import '../assets/css/geneenrollmentkeys.css';

function GeneEnrollmentkeys() {
    return (
        <div className="main_sub">
            <div className="simple_nav">
                <ul>
                    <Link to='/teacherdashboard/keys/genkeys/:id'>
                        <li>Generate Enrollment Keys</li>
                    </Link>
                    <Link to='/teacherdashboard/keys/allkeys'>
                        <li>View All Enrollment Keys</li>
                    </Link>
                </ul>
            </div>
            <div className="show">
                <Route path='/teacherdashboard/keys/genkeys/:id'>
                    <GenerateKeys/>
                </Route>
                <Route path='/teacherdashboard/keys/allkeys'>
                    <ViewAllEnroKeys/>
                </Route>
            </div>
        </div>
    )
}

export default GeneEnrollmentkeys
