import React from 'react';
import cs2 from '../img/cs2.jpg';

export default function InTeacher() {
    return (
        <div className="teach_card">
            <div className="card_teach_head">
                <div className="pro_pic">
                    <img src={cs2} alt="teacher"/>
                </div>
            </div>
            <div className="card_teach_body">
                <h3>Osada Manohara Rathnayake</h3>
            </div>
        </div>
    )
}
