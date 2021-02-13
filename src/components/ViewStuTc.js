import React from 'react';
import child1 from '../img/child.png';
import '../assets/css/viewst.css';

export default function ViewStuTc({setmodelOp,modelOp,stPrDetail,setstPrDetail}) {

    const close = (e) =>{
        if(e.target.classList.contains('modelbg') || e.target.classList.contains('vlvl')){
            setmodelOp(false);
            setstPrDetail([]);
        }
    }

    return (
        <div>
            {
                modelOp ? (
                    stPrDetail.length !== 0 ? (
                        <div className="modelbg" onClick={close}>
                            <div className="modelcard">
                                <div className="clsst">
                                    <button onClick={close}><i className="far fa-times-circle vlvl"></i></button>
                                </div>
                                <div className="pageHead">
                                    <div className="propicst">
                                        <img src={child1} alt=""/>
                                    </div>
                                </div>
                                <div className="pagebottom">
                                    <h1>{stPrDetail.user.first_name+" "+stPrDetail.user.last_name}</h1>
                                    <h2>{stPrDetail.user.username}</h2>
                                    <h3>{stPrDetail.user.email}</h3>
                                    <h3>{stPrDetail.user.phone_no}</h3>
                                    <h4>{stPrDetail.user.address}</h4>
                                    <div className="dis">
                                        <p>{stPrDetail.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):""
                        
                ) :""
            }
        </div>
    )
}
