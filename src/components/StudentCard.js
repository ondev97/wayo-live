import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useSelector } from 'react-redux';

export default function StudentCard({student}) {

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    return (
        <div className="student_row">
            <div className="student_col">
                <LazyLoadImage src={`${student.profile_pic}`} alt="" effect="blur" height="100%" width="100%"/>
            </div>
            <div className="student_col_des">
                <h3>{student.user.username}</h3>
            </div>
        </div>
    )
}
