import Axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import ProfileUpdate from '../utils/hooks/ProfileUpdate';
import AcDetailsSettings from './AcDetailsSettings';
import UserChangedPassword from './UserChangedPassword'

function TcProfileSettings({setsettings}) {

     const[hadelChange,hadelSubmitForm,values,errors,hide,hideError,hadelInputField,hadelCreateExField,hadelRemoveField,inputField,hadelInputFieldED,hadelCreateExFieldED,hadelRemoveFieldED,inputFieldED] = ProfileUpdate(submit);//custom hook
     //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

     function submit(){
         let all_data = new FormData();
         
         //getting education fields value
         if(inputFieldED.length !== 0){
             for(let i=0; i<3;i++){
                 if(inputFieldED[i]){
                     all_data.append(`education${i+1}`,inputFieldED[i].ed);
                 }
                 else{
                    all_data.append(`education${i}`,'');
                 }
             }
        }
        else{
            all_data.append(`education1`,'');
            all_data.append(`education2`,'');
            all_data.append(`education3`,'');
        }
        //getting experience fields value
        if(inputField.length !== 0){
            for(let i=0; i<3;i++){
                if(inputField[i]){
                    all_data.append(`experience${i+1}`,inputField[i].ex);
                }
                else{
                   all_data.append(`experience${i}`,'');
                }
            }
       }
       else{
           all_data.append(`experience1`,'');
           all_data.append(`experience2`,'');
           all_data.append(`experience3`,'');
       }

        all_data.append('user.first_name',values.firstName);
        all_data.append('email',values.email);

        all_data.append('description',values.des);

        Axios.post(`http://127.0.0.1:8000/account-api/updateteacher/${usDetails.id}/`,all_data).then(res=>{
             console.log(res);
         }).catch(err=>{
             console.log(err);
         })
        
     }

    return (
        <div>
            <div className="tc_profile_settings">
                <div className="ac_det">
                    <h2>Account Settings</h2>
                    <AcDetailsSettings hadelChange={hadelChange} hadelSubmitForm={hadelSubmitForm} values={values} errors={errors} hide={hide} hideError={hideError} hadelInputField={hadelInputField} hadelCreateExField={hadelCreateExField} hadelRemoveField={hadelRemoveField} inputField={inputField} hadelInputFieldED={hadelInputFieldED} hadelCreateExFieldED={hadelCreateExFieldED} hadelRemoveFieldED={hadelRemoveFieldED} inputFieldED={inputFieldED}/>
                </div>
                <div className="set_password">
                    <UserChangedPassword setsettings={setsettings}/>
                </div>
            </div>
        </div>
    )
}

export default TcProfileSettings
