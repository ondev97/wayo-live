import React, { useEffect } from 'react';
import StSignupForm from '../components/StSignupForm';
import "../assets/css/stsignup.css";
import signupsvg from "../img/svg/signup.svg";
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import RegisterInfo from '../components/RegisterInfo';

export default function StSignUp() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
      },[])
    return (
        <>
            <div className="siup_body">
            <RegisterInfo/>
                <div className="siup_column">
                    <div className="siup_form">
                        <div className="topSign">
                            <h2>Student Registration</h2>
                        </div>
                        <StSignupForm/>
                    </div>
                </div>
            </div>
        </>
    )
}
