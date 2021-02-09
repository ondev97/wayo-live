import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function InTeacher({key, teacher}) {
    return (
        <div className="teach_card">
            <div className="card_teach_head">
                <div className="pro_pic">
                    <LazyLoadImage src={`${teacher.profile_pic}`} alt="teacher" effect="blur"/>
                </div>
            </div>
            <div className="card_teach_body">
                <h3>{teacher.user.first_name+" "+teacher.user.last_name}</h3>
                <p>{teacher.education1}</p>
            </div>
        </div>
    )
}
