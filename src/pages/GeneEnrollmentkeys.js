import React from 'react'
import { Route } from 'react-router-dom'
import ProfileSettings from './ProfileSettings'
import ViewAllEnroKeys from './ViewAllEnroKeys'

function GeneEnrollmentkeys() {
    return (
        <div className="main_sub">
            <h1>Generate Keys</h1>
            <div className="simple_nav">
                <ul>
                    <li>Generate Enrollment Keys</li>
                    <li>View All Enrollment Keys</li>
                </ul>
            </div>
            <div className="show">
            </div>
        </div>
    )
}

export default GeneEnrollmentkeys
