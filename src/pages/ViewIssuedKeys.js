import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import '../assets/css/displayissuekeys.css'

export default function ViewIssuedKeys() {

    const {id} = useParams();
    const [allKeys, setallKeys] = useState([]);
    const [isRedirect,setisRedirect] = useState(false);
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    useEffect(async () => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/issuedcoupon/${id}/`,{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(res=>{
                console.log(res.data);
                setallKeys([...allKeys,...res.data])
            }).catch(err=>{
                setisRedirect(true);
            })
        }
    }, [usDetails]);

    if(isRedirect){
        //showing alert
        store.addNotification({
            title: "Invalid Module!",
            message: "OnDevlms",
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

        return <Redirect to="/teacherdashboard/managecourse/"/>
    }

    return (
        <div className='disp_all_issu_keys'>
            <div className="disp_issu_keys">
                <div className="table_issu_hd">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Key</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allKeys ? 
                                    allKeys.map((keys,index)=>(
                                        <tr key={keys.id}>
                                            <td>{index+1}</td>
                                            <td>{keys.coupon_key}</td>
                                        </tr>
                                    ))
                                :''
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
