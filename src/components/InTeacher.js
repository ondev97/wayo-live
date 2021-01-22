import React from 'react';
import cs2 from '../img/cs2.jpg';

export default function InTeacher({key, teacher}) {
    return (
        <div className="teach_card">
            <div className="card_teach_head">
                <div className="pro_pic">
                    <img src={`${teacher.profile_pic}`} alt="teacher"/>
                </div>
            </div>
            <div className="card_teach_body">
                <h3>{teacher.user.first_name+" "+teacher.user.last_name}</h3>
                <p>{teacher.education1}</p>
            </div>
        </div>
    )
}
