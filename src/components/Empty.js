import React from 'react';
import empty from '../img/svg/empty.svg';
import '../assets/css/empty.css';

export default function Empty() {
    return (
        <div className="empty">
            <h3>No Subjects 😌</h3>
            <img src={empty} alt=""/>
        </div>
    )
}
