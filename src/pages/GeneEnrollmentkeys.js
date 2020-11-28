import React from 'react'
import { Route } from 'react-router-dom'
import GenerateKeys from '../components/GenerateKeys'
import ProfileSettings from './ProfileSettings'
import ViewAllEnroKeys from '../components/ViewAllEnroKeys'

function GeneEnrollmentkeys() {
    return (
        <div className="main_sub">
            <div className="simple_nav">
                <ul>
                    <li>Generate Enrollment Keys</li>
                    <li>View All Enrollment Keys</li>
                </ul>
            </div>
            <div className="show">
                <Route path='/teacherdashboard/keys/genkeys'>
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
