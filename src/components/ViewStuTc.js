import React from 'react';
import child1 from '../img/child.png';
import '../assets/css/viewst.css';

export default function ViewStuTc({setmodelOp,modelOp}) {

    const close = (e) =>{
        if(e.target.classList.contains('modelbg') || e.target.classList.contains('vlvl')){
            setmodelOp(false);
        }
    }

    return (
        <div>
            {
                modelOp ? (
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
                                    <h1>Osada Manohara Rathnayake</h1>
                                    <h2>Ozka</h2>
                                    <h3>076-859790</h3>
                                    <h3>osadamanohara55@gmail.com</h3>
                                    <h4>Chirathma Furniture,kandegedara road,haliela</h4>
                                    <div className="dis">
                                        <p>kaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane rkaksnd kask dka kas asdn jkas maksn kjas ndkasdkaj nk nasdnjaks dnka saksnjk n soiane r</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                ) :""
            }
        </div>
    )
}
