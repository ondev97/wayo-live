import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function StudentCard({student}) {

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    return (
        <div className="student_row">
            <div className="student_col">
                <img src={`${process.env.REACT_APP_LMS_MAIN_URL}${student.profile_pic}`} alt=""/>
            </div>
            <div className="student_col_des">
                <h3>{student.user.username}</h3>
            </div>
        </div>
    )
}
