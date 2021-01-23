import React, {useEffect, useState} from 'react';
import logsvg from '../img/svg/booklover.svg';
import logpic from '../img/child.png';
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import "../assets/css/stlogin.css";
import "../assets/css/mediaFiles/loginRegister.css";
import {Link, Redirect} from "react-router-dom";
import Axios from "axios";
import {store} from "react-notifications-component";

export default function PasswordReset() {

    const dispatch = useDispatch();
    const [email, setemail] = useState('');
    const [readOnly, setreadOnly] = useState('');
    const [redirect, setredirect] = useState(false);

    useEffect(() => {
        dispatch(activeAccount());
    },[dispatch])

    const handelemail = (e) =>{
        const email = e.target.value;
        setemail(email);
    }

    const handlesubmit = () =>{
        setreadOnly('none')

        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/rest-auth/password/reset/`, {email:email}).then(res=>{
            store.addNotification({
                title: res.data.detail,
                message: "Eyekon E Class",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                  pauseOnHover: true,
                  showIcon:true
                },
                width:600
            });
            setemail('');
            setreadOnly('');
            setredirect(true);
        }).catch(err=>{
            store.addNotification({
                title: "Email was not sent",
                message: "EyeKon LMS",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                  pauseOnHover: true,
                  showIcon:true
                },
                width:600
            });
            setreadOnly('');
        })
    }
    if(redirect){
        return <Redirect to={'/stlogin'}/>
    }
    return (
        <div className="login_body">
            <div className="login_column">
                <div className="svg">
                    <img src={logsvg} alt=""/>
                </div>
            </div>
            <div className="login_column">
                <div className="login_form">
                    <div className="logpic">
                        <img src={logpic} alt=""/>
                    </div>
                    <h2>Password Reset</h2>
                    <div>
                        <form>
                            <p>
                                <label htmlFor="em">Email</label>
                                <input type="text" value={email} onChange={handelemail} placeholder={"Enter the email that you have used for the registration"} name="email" id="em"/>
                            </p>
                            <div className="but">
                                <input onClick={handlesubmit} type="button" value="Reset Password" name="submit" style={{display:readOnly}}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}