import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import AboutUser from '../components/AboutUser';
import ProfileBottom from '../components/ProfileBottom';
import ProfileHead from '../components/ProfileHead';
import "../assets/css/usprofile.css";
import TcProfileSettings from '../components/TcProfileSettings';

function ProfileSettings() {

    const [settings, setsettings] = useState(false);

    const dispatch = useDispatch();

    const switchHadel = (e)=>{
        if(e.target.innerText === "Settings"){
            setsettings(true);
        }
        else{
            setsettings(false);
        }
    }

    useEffect(() => {
        dispatch(activeAccount());
      },[dispatch])

    return (
        <div>
            <div className="main_profile">
                <div className="tcprofilecolumn">
                    <div className="profile_sub_column">
                        <ProfileHead/>
                    </div>
                    <div className="profile_sub_column">
                        <ProfileBottom/>
                    </div>
                </div>    
                <div className="tcdisoncolumn">
                    <div className="about_header">
                        <ul>
                            <li onClick={switchHadel}><i className="far fa-user-circle"></i>About Me</li>
                            <li onClick={switchHadel}><i className="fas fa-cog"></i>Settings</li>
                        </ul>
                    </div>
                    <div className="about_main_body">
                        <div className={`about_us ${settings ? 'inactivate' : 'activate' } `}>
                            <AboutUser/>
                        </div>
                        <div className={`settings_us ${!settings ? 'inactivate' : 'activate'}`}>
                            <TcProfileSettings setsettings={setsettings}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings
