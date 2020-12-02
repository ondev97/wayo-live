import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

export default function CouponKeyTableBody({data,index,selectKeys,setselectKeys,check,allCheckId}) {
    
    const checkBox = useRef();
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    const hadelCheck = (e) =>{
        setselectKeys([
            ...selectKeys,parseInt(e.target.value)
        ]);

    }
    
    useEffect(async () => {
        if(selectKeys.length !== 0){
            //set issued coupon
            await Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/issuecoupon/`,{
                "issued_coupons":selectKeys
            },{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(res=>{
                setselectKeys([]);
            })
        }
    }, [selectKeys])

    useEffect(() => {
        if(allCheckId.length !== 0){
            setselectKeys(allCheckId);
        }
    }, [check])
    
    return (
            <tr>
            <td>{index+1}</td>
            <td>{data.coupon_key}</td>
            <td>
                <input type="checkbox" ref={checkBox} name="actigen" value={data.id} onChange={hadelCheck} checked={check}/>
            </td>
        </tr> 
    )
}
