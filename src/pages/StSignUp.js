import React, { useEffect } from 'react';
import StSignupForm from '../components/StSignupForm';
import "../assets/css/stsignup.css";
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import logo from '../img/Logo_1.png';
import RegisterInfo from '../components/RegisterInfo';

export default function StSignUp() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
      },[])
    return (
        <>
            <div className="siup_body">
                <div className="siup_column">
                    <div className="siup_form">
                        <div className="lgsi">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="topSign">
                            <h2>Student Registration</h2>
                        </div>
                        <StSignupForm/>
                    </div>
                </div>
                <div className="siup_column">
                    <RegisterInfo/>
                </div>
            </div>
        </>
    )
}
