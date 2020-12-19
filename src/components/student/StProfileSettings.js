import React from 'react';
import UseStprofileUpdate from '../../utils/hooks/Student/UseStprofileUpdate';

export default function StProfileSettings() {

    const {values} = UseStprofileUpdate();

    return (
        <div>
            <div className="tc_profile_settings">
                <div className="ac_det">
                    <h2>Account Settings</h2>
                </div>
                <div className="set_password">
                </div>
            </div>
        </div>
    )
}
