import React from 'react';
import UseStprofileUpdate from '../../utils/hooks/Student/UseStprofileUpdate';
import StAcDetailsSettingsFrm from './StAcDetailsSettingsFrm';
import StChangePassword from './StChangePassword';

export default function StProfileSettings({setsettings}) {

    const {values,hadelChange,hadelSubmitForm,hideError,errors,hide} = UseStprofileUpdate(submit);

    function submit(){
        console.log('submit');
    }

    return (
        <div>
            <div className="tc_profile_settings">
                <div className="ac_det">
                    <h2>Account Settings</h2>
                    <StAcDetailsSettingsFrm values ={values} hadelChange = {hadelChange} hadelSubmitForm = {hadelSubmitForm} hideError={hideError} errors={errors} hide={hide}/>
                </div>
                <div className="set_password">
                    <StChangePassword setsettings={setsettings}/>
                </div>
            </div>
        </div>
    )
}
