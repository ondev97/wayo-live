import React from 'react'
import ProfileUpdate from '../utils/hooks/ProfileUpdate';
import AcDetailsSettings from './AcDetailsSettings';
import UserChangedPassword from './UserChangedPassword'

function TcProfileSettings({setsettings}) {

     const[hadelChange,hadelSubmitForm,values,errors,hide,hideError] = ProfileUpdate(submit);//custom hook

     function submit(){
         console.log("Updated!!");
     }

    return (
        <div>
            <div className="tc_profile_settings">
                <div className="ac_det">
                    <h2>Account Settings</h2>
                    <AcDetailsSettings hadelChange={hadelChange} hadelSubmitForm={hadelSubmitForm} values={values} errors={errors} hide={hide} hideError={hideError}/>
                </div>
                <div className="set_password">
                    <UserChangedPassword setsettings={setsettings}/>
                </div>
            </div>
        </div>
    )
}

export default TcProfileSettings
