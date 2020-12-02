import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { store } from 'react-notifications-component';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../assets/css/formgenkey.css';
import CouponKeyTableBody from './CouponKeyTableBody';

function GenerateKeys() {

    const [value, setvalue] = useState({hw:""});
    const [err,seterr] = useState({hw:""});
    const [hide, sethide] = useState({hw:false});
    const [isSubmitting, setisSubmitting] = useState(false);
    const [resMessage, setresMessage] = useState(false);
    const [couponData, setcouponData] = useState([]);
    const [selectKeys, setselectKeys] = useState([]);
    const [check, setcheck] = useState(null);
    const [allCheckId, setallCheckId] = useState([]);

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    const {id} = useParams();

    const validate = (values) =>{
        let error = {};

        if(!values.hw.trim()){
            error.hw = "Please Enter Number For Generate Keys";
        }
        if(!isNaN(value.hw)){
            if(value.hw > 500){
                error.hw = "Number Of keys Must Be Less Than 500";
            }
        }
        else{
            error.hw = "Please Enter Valid Number";
        }
        return error;
    }

    const submithandler = (e)=>{
        e.preventDefault();
        seterr(validate(value));
        setisSubmitting(true);
        sethide({hw:false});
    }

    useEffect(() => {
        if(Object.keys(err).length === 0 && isSubmitting){
            submit();
        }
    }, [err])

    const hideError = (e)=>{
        Object.entries(err).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })

    }

    function submit(){
        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/coupon/${value.hw}/${id}/`,{},{
            headers:{Authorization: 'Token '+usDetails.key}
        }).then(res=>{
            if(res.data.message){
                setresMessage(true)
                setvalue({hw:""})

                store.addNotification({
                    title: `${value.hw} Keys Created`,
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
            }
        })
        
    }

    useEffect(() => {
        if(usDetails.key){
            Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/availablecoupon/${id}/`,{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(res=>{
                setcouponData(res.data);
            })
        }
    }, [usDetails,isSubmitting,resMessage,selectKeys])

    const handelckeckall =() =>{
        setcheck(true);

        if(couponData){
            let osa = [];
            couponData.map(cuData=>(
                osa = [...osa,cuData.id]
                ))
            setallCheckId(osa)
            }
        }

    return (
        <div className="genkeysform">
            <div className="main_gen_form">
                <form onSubmit={submithandler}>
                    <p>
                        <label htmlFor="ks">How Many Keys?</label>
                        <input type="number" min="0" step="1" name="hw" id="ks" value={value.hw} onChange={(e)=>setvalue({...value,[e.target.name]:e.target.value})} onFocus={hideError}/>
                    {
                        err.hw && <span className={`tip ${hide.hw ? 'hidetip' : ''}`}>{err.hw}</span>
                    }  
                    </p>

                    <div className="gen_sub">
                        <button>Generate</button>
                    </div>
                </form>
                <div className="disp_gen_keys">
                    <button onClick={handelckeckall}>all</button>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Key</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                couponData.length !== 0 &&
                                        couponData.map((data,index)=>(
                                            <CouponKeyTableBody key={index} data={data} index={index} selectKeys={selectKeys} setselectKeys={setselectKeys} check={check} allCheckId={allCheckId}/>  
                                        ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GenerateKeys
