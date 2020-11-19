import { useEffect, useState } from 'react'
import validation from '../../components/ValidateProfileSettings';
import AcDetails from './AcDetails';

function ProfileUpdate(submit) {

    const [teachProfilepic,profileDetails] = AcDetails();
    
    const [values, setvalues] = useState({firstName:"",lastName:"",userName:"",phoneNumber:"",email:"",address:"",des:"",ed1:"",ed2:"",ed3:""});
    const [errors, seterrors] = useState({firstName:"",lastName:"",userName:"",phoneNumber:"",email:"",address:"",des:""});
    const [hide, sethide] = useState({firstName:false,lastName:false,userName:false,email:false,phoneNumber:false,phonenumber:false,address:false,des:false});
    const [isSibmitting, setisSibmitting] = useState(false);
    
    useEffect(() => {
        setvalues({...values,firstName:profileDetails.name,lastName:profileDetails.lname,phoneNumber:profileDetails.phoneNumber,email:profileDetails.email,userName:profileDetails.userName})
        
    }, [profileDetails])

     const hadelChange =(e)=>{
         const {name,value} = e.target
        setvalues({
            ...values,[name]:value
        })
     }
     const hadelSubmitForm = (e)=> {
        e.preventDefault();
        //hadlling errors
        seterrors(validation(values));
        sethide({firstName:false,lastName:false,userName:false,email:false,phoneNumber:false,phonenumber:false,address:false,des:false});
        setisSibmitting(true);
     };
     const hideError = (e)=>{
        Object.entries(errors).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })
    }
     

     useEffect(() => {
        if(Object.keys(errors).length === 0 && isSibmitting){
            submit();
        }
     }, [errors])

    return ([hadelChange,hadelSubmitForm,values,errors,hide,hideError])
}

export default ProfileUpdate
