import React from 'react'
import '../assets/css/usprofile.css'
import AcDetails from '../utils/hooks/AcDetails';

export default function ProfileBottom() {
    const [teachProfilepic,profileDetails] = AcDetails();

    return (
        <div>
            <div className="bottom_box">
                <div className="teach_details">
                    <div>
                        <p>Email Address</p>
                        <h3>{profileDetails.email}</h3>
                    </div>
                    <div>
                        <p>Phone:</p>
                        <h3>{profileDetails.phoneNumber}</h3>
                    </div>
                </div>
                <div className="teachskills">
                    <div className="skill">
                        <h3>HTML</h3>
                        <div className="skills_ouuter">
                            <div className="skills_mid" style={{width:"50%"}}></div>
                        </div>
                    </div>
                    <div className="skill">
                        <h3>HTML</h3>
                        <div className="skills_ouuter">
                            <div className="skills_mid" style={{width:"100%"}}></div>
                        </div>
                    </div>
                    <div className="skill">
                        <h3>HTML</h3>
                        <div className="skills_ouuter">
                            <div className="skills_mid" style={{width:"75%"}}></div>
                        </div>
                    </div>
                    <div className="skill">
                        <h3>HTML</h3>
                        <div className="skills_ouuter">
                            <div className="skills_mid" style={{width:"35%"}}></div>
                        </div>
                    </div>
                    <div className="skill">
                        <h3>HTML</h3>
                        <div className="skills_ouuter">
                            <div className="skills_mid" style={{width:"20%"}}></div>
                        </div>
                    </div>
                    <div className="skill">
                        <h3>HTML</h3>
                        <div className="skills_ouuter">
                            <div className="skills_mid" style={{width:"20%"}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
