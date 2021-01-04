import React, { useEffect } from 'react';
import '../assets/css/allteachers.css';
import { activeAccount } from '../actions';
import { loadStDetails } from '../actions/stDetailsAction';
import { useDispatch } from 'react-redux';
import InTeacher from '../components/InTeacher';

export default function IndexAllTeachers() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
      },[dispatch])

    return (
        <div className="maininde">
            <div className="upper_cover">
                <h1>Teachers</h1>
            </div>
            <div className="tech_body">
                <InTeacher/>
                <InTeacher/>
                <InTeacher/>
                <InTeacher/>
                <InTeacher/>
                <InTeacher/>
                <InTeacher/>
            </div>
        </div>
    )
}
