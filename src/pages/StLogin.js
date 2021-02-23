import React, { useEffect } from 'react';
import StLoginForm from '../components/StLoginForm';
import logsvg from '../img/svg/booklover.svg';
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import "../assets/css/stlogin.css";
import "../assets/css/mediaFiles/loginRegister.css";

export default function StLogin() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
      },[dispatch])

    return (
        <div className="login_body">
            <div className="login_column">
                <div className="login_form">
                    <div className="topSign">
                        <h2>Login</h2>
                    </div>
                    <StLoginForm/>
                </div>
            </div>
        </div>
    )
}
