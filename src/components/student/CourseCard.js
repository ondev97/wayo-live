import Axios from 'axios';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import {AnimatePresence, motion} from "framer-motion";
import {store} from "react-notifications-component";
import PaymentModal from "./PaymentModal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CourseCard({course_cover,course_name,price,duration,created_at,courseid,no, user, is_enrolled}) {
//https://medium.com/linkit-intecs/integrate-payhere-with-create-react-app-3b6a4fe5d5f0
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    const [ismodel, setismodel] = useState(false);
    const [key, setkey] = useState('');
    const [style, setstyle] = useState({color:"red", visibility:"hidden"});
    const [content, setcontent] = useState('');
    const [redirect, setredirect] = useState(false);
    const modelOuter = useRef();


    const openModel = () =>{
        if(!ismodel){
            setismodel(true);
            setcontent('');
            setstyle({color:"red", visibility:"hidden"});
        }
        else{
            setismodel(false);
        }
    }
    const closemodel = () =>{
        if(ismodel ){
            setismodel(false);
        }
    }

    const closemodelouter = (e) =>{
        if(e.target.className === modelOuter.current.className){
            setismodel(false);
        }
    }
    const modelAni = {
        visible:{
            opacity:1
        },
        hidden:{
            opacity:0
        }
    }
    const pageAni = {
        visible:{
            opacity:1,
            transition:{delay:0.5}
        },
        hidden:{
            opacity:0
        }
    }

    const handelKey = (e) =>{
        const key = e.target.value;
        setkey(key);
        setcontent('');
        setstyle({color:"red", visibility:"hidden"});
    }
    const clk =()=>{
        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/enrollcourse/${courseid}/${usDetails.id}/`,{
            'coupon_key': key
        },{
            headers:{Authorization:"Token "+usDetails.key}
        }).then(res=>{
            closemodel();
            store.addNotification({
                title: "Sucessfully Enrolled",
                message: "Eyekon eClass",
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
            setredirect(true);
        }).catch(err=>{
            setcontent(err.response.data.message);
            setstyle({color:"red", visibility:"visible"});
        })
    }
    /*Free Enrollement */
    const freeEn = () =>{
        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/freenroll/${courseid}/${usDetails.id}/`,{},{
            headers:{Authorization:"Token "+usDetails.key}
        }).then(res=>{
            store.addNotification({
                title: "Sucessfully Enrolled",
                message: "Eyekon eClass",
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
            setredirect(true);
        })
    }
    if(redirect){
        return <Redirect to={`/studentdashboard/stmodules/${courseid}`}/>
    }
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {
                    ismodel ?
                        <motion.div className="key_model_outer" ref={modelOuter} onClick={closemodelouter} variants={modelAni} animate='visible' initial='hidden' exit='hidden'>
                            <motion.div className="key_model_page" variants={pageAni} animate='visible' initial='hidden'>
                                <div className="close_key_mod">
                                    <i onClick={closemodel} className="fas fa-times-circle"></i>
                                </div>
                                <h3>Enter Key</h3>
                                <div className="inpu">
                                    <input type="text" name="key" onChange={handelKey}/>
                                    <button onClick={clk}>Enroll</button>
                                </div>
                                <p id={"err"} style={style}>{content}</p>
                            </motion.div>
                        </motion.div>
                        : ''
                }
            </AnimatePresence>
            <div className="st_grid_card_manage">
                <Link to={`#`}>
                    <div className="st_grid_card_mg_head">
                        <LazyLoadImage effect="blur" width="100%" height="100%" src={`${course_cover}`} alt=""/>
                        <div className="dura">
                            <h3><i className="far fa-clock cl"></i>{duration} Hrs</h3>
                        </div>
                    </div>
                    <div className="st_cos_manage_num">
                        <h3>{no<10 ? `0${no+1}` : no}</h3>
                    </div>
                </Link>
                <Link to="#'">
                    <div className="st_grid_card_mg_body">
                        <h3>{course_name}</h3>
                        <h4>LKR {price}</h4>
                        <div className="st_purchase_row">
                            {
                                is_enrolled ?
                                    <Link to={`/studentdashboard/stmodules/${courseid}/`}>
                                        <button><i className="fas fa-eye"></i>View Course</button>
                                    </Link> :
                                    <>
                                        {/*
                                        <PaymentModal
                                            // Use a unique value for the orderId
                                            course_id={courseid}
                                            course_name={course_name}
                                            price={price}
                                            user={user}
                                        />
                                        <button><i className="fas fa-shopping-cart"></i>Buy Key</button>*/}
                                        {
                                            price === null || price === 0 ?
                                                <button onClick={freeEn}>Free Enrolle</button>
                                            :   
                                            <button onClick={openModel}><i className="fas fa-key"></i>Key</button>
                                        }
                                    </>
                            }
                        </div>
                        <div className="cs_st_tail">
                            <h4><ReactTimeAgo date={Date.parse(created_at)} locale="en-US" /></h4>
                            {/*{<h4>One  Month Ago</h4>}*/}
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}
