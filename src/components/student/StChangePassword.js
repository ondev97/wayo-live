import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { store } from 'react-notifications-component';
import { useSelector } from 'react-redux';
import chekErrors from '../PasswordValidation';

export default function StChangePassword({setsettings}) {
    const [values, setvalues] = useState({cpw:"",npw:"",ncpw:""});
    const [errors, seterrors] = useState({});
    const [hide, sethide] = useState({cpw:false,npw:false,ncpw:false});
    const [isSubmitting, setisSubmitting] = useState(false);

    const handelValues =(e) =>{
        setvalues({
            ...values,[e.target.name]:e.target.value
        });
    };
    const hadelFormSubmit =(e)=>{
        e.preventDefault();
        sethide({cpw:false,npw:false,ncpw:false});
        seterrors(chekErrors(values));
        setisSubmitting(true);
    };

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            submit();
        }
    }, [errors])

    const hideError = (e)=>{
        Object.entries(errors).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })
    }

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    
    const submit = () =>{
        console.log('update');
    }
    return (
        <div>
            <h2>Change Password</h2>
                <div className="reset_pw">
                    <form onSubmit={hadelFormSubmit}>
                        <p>
                            <label htmlFor="cpw">Current Password</label>
                            <input type="password" id="cpw" name="cpw" value={values.cpw} onChange={handelValues} onFocus={hideError}/>
                            {
                                errors.cpw && <span className={`tip ${hide.cpw ? 'hidetip' : ''}`}>{errors.cpw}</span>
                            }
                        </p>
                        <p>
                            <label htmlFor="npw">New Password</label>
                            <input type="password" id="npw" name="npw" value={values.npw} onChange={handelValues} onFocus={hideError}/>
                            {
                                errors.npw && <span className={`tip ${hide.npw ? 'hidetip' : ''}`}>{errors.npw}</span>
                            }
                        </p>
                        <p>
                            <label htmlFor="ncpw">Retype Password</label>
                            <input type="password" id="ncpw" name="ncpw" value={values.ncpw} onChange={handelValues}onFocus={hideError}/>
                            {
                                errors.ncpw && <span className={`tip ${hide.ncpw ? 'hidetip' : ''}`}>{errors.ncpw}</span>
                            }
                        </p>
                        <div className="butset">
                            <button>Change Password</button>
                        </div>
                    </form>
                </div>
        </div>
    )
}
