import Axios from 'axios';
import { useEffect, useState } from 'react'

function AcDetails() {

    const [teachProfilepic, setteachProfilepic] = useState('');
    const [profileDetails, setprofileDetails] = useState({});

    useEffect(async () => {
        if(localStorage.getItem("usValues") !== null){
            if(Object.keys(JSON.parse(localStorage.getItem("usValues"))).length !==0){
                const userDetails = JSON.parse(localStorage.getItem("usValues"));
                await Axios.get(`http://127.0.0.1:8000/account-api/profile/${userDetails.user.id}/`).then(res=>{
                
                    setteachProfilepic(res.data.profile_pic);
                    setprofileDetails({name:res.data.user.first_name,lname:res.data.user.last_name,phoneNumber:res.data.user.phone_no,email:res.data.user.email,userName:res.data.user.username,des:res.data.description,ex1:res.data.experience1,ex2:res.data.experience2,ex3:res.data.experience3,ed1:res.data.education1,ed2:res.data.education2,ed3:res.data.education3});
                })
            };
        }
    },[])
    return ([teachProfilepic,profileDetails])
}

export default AcDetails
