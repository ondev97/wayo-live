import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { activeAccount } from '../actions';
import { loadStDetails } from '../actions/stDetailsAction';
import '../assets/css/contact.css';
import Axios from "axios";
import {store} from "react-notifications-component";

export default function ContactUs() {

    const dispatch = useDispatch();
    const [message, setmessage] = useState('');
    const [subject, setsubject] = useState('');
    const [phone_no, setphone_no] = useState('');
    const [name, setname] = useState('');
    const [readOnly, setreadOnly] = useState('');
    const [email, setemail] = useState('');
    const usDetails = useSelector(state => state.accountDetails);

    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
        if(usDetails){
            setemail(usDetails.email);
            setreadOnly('readonly');
        }
        window.scrollTo(0, 0);
      },[dispatch])

    const handelmessage = (e) =>{
        const message = e.target.value;
        setmessage(message);
    }

    const handelemail = (e) =>{
        const email = e.target.value;
        setemail(email);
    }

    const handelsubject = (e) =>{
        const subject = e.target.value;
        setsubject(subject);
    }

    const handelphone_no = (e) =>{
        const phone_no = e.target.value;
        setphone_no(phone_no);
    }

    const handelname = (e) =>{
        const name = e.target.value;
        setname(name);
    }

    const handelsubmit = (e) => {
        const email_data = {
            'message': message,
            'phone_number': phone_no,
            'email': email,
            'subject': subject,
            'name': name
        }
        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/account-api/contact/`, email_data).then(res=>{
            store.addNotification({
                title: "Email was sent successfully",
                message: "OnDevlms",
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
            setmessage('');
            setsubject('');
        }).catch(err=>{
            store.addNotification({
                title: "Email was not sent",
                message: "Eyekon E Class",
                type: "warning",
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
        })
        e.preventDefault();
    }
    return (
        <div className="maininde">
            <div className="upper_cover">
                <h1>Contact Us</h1>
            </div>
            <div className="con_body">
                <div className="short_con">
                    <div className="column_con">
                        <div className="con_upprt">
                            <div className="icon_con">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <h3>Phone</h3>
                        </div>
                        <div className="con_sort_body">
                            <p>076-8597898</p>
                            <p>076-xxxxxx</p>
                            <p>076-xxxxxx</p>
                        </div>
                    </div>
                    <div className="column_con">
                        <div className="con_upprt">
                            <div className="icon_con">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <h3>Location</h3>
                        </div>
                        <div className="con_sort_body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <div className="column_con">
                        <div className="con_upprt">
                            <div className="icon_con">
                                <i className="fas fa-at"></i>
                            </div>
                            <h3>Email</h3>
                        </div>
                        <div className="con_sort_body">
                            <p>Lorem ipsum dolor sit amet co</p>
                        </div>
                    </div>
                </div>
                <div className="con_form">
                    <h1>Lets Get In Touch</h1>
                    <form onSubmit={handelsubmit}>
                        <div className="sect">
                            <p>
                                <label htmlFor="name">Enter Your Name</label>
                                <input type="text" name='name' id='name' onChange={handelname} required/>
                            </p>
                            <p>
                                <label htmlFor="sub">Enter Email Subject</label>
                                <input type="text" name='sub' id='sub' value={subject} onChange={handelsubject} required/>
                            </p>
                        </div>
                        <div className="sect">
                            <p>
                                <label htmlFor="email">Enter Your Email</label>
                                <input type="email" name='email' id='email' value={email} onChange={handelemail} readOnly={readOnly} required/>
                            </p>
                            <p>
                                <label htmlFor="pn">Enter Phone Number</label>
                                <input type="tel" name='pn' id='pn' placeholder="07X-xxxxxxx" pattern="[+]{1}[0-9]{11,14}" onChange={handelphone_no} required/>
                            </p>
                        </div>
                        <p>
                            <textarea name="message" id="msg" rows="10" placeholder="Enter Your Message" value={message} onChange={handelmessage} required></textarea>
                        </p>
                        <p className="last">
                            <input type="submit" value="Send Message"/>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
 