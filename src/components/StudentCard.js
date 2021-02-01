import React from 'react'
import { useSelector } from 'react-redux';

export default function StudentCard({student}) {

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    return (
        <div className="student_row">
            <div className="student_col">
                <img src={`${student.profile_pic}`} alt=""/>
            </div>
            <div className="student_col_des">
                <h3>{student.user.username}</h3>
            </div>
        </div>
    )
}
