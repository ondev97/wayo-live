import React from 'react'
import AcDetails from '../utils/hooks/AcDetails'

export default function AboutUser() {

    const [teachProfilepic,profileDetails] = AcDetails();

    return (
        <div>
            <div className="about_body">
                <h3>About</h3>
                <div className="ab_main_card">
                    <div className="ab_card">
                    <h3>Name</h3>
                    <h4>{`${profileDetails.name} ${profileDetails.lname}`}</h4>
                    </div>
                    <div className="ab_card">
                    <h3>User Name</h3>
                    <h4>{profileDetails.userName}</h4>
                    </div>
                    <div className="ab_card">
                    <h3>Mobile</h3>
                    <h4>{profileDetails.phoneNumber}</h4>
                    </div>
                    <div className="ab_card">
                    <h3>Email</h3>
                    <h4>{profileDetails.email}</h4>
                    </div>
                </div>
                <div className="disdis">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quidem iste vero quibusdam et eos magnam aliquam, repellat placeat maxime expedita! Consequuntur esse praesentium reiciendis minima magni quasi ad ut!Perferendis, officiis? Earum ad rem neque et ullam ipsam, laboriosam accusamus saepe in, sapiente, sint distinctio quos quisquam sed nemo molestiae. Odio, impedit. Odit rem, doloribus beatae obcaecati quaerat corporis!</p>
                </div>
                <div className="ac_education">
                    <h3>Education</h3>
                    <h4>BICT Rajarata UniverSity SriLanka</h4>
                    <h4>BICT Rajarata UniverSity SriLanka</h4>
                    <h4>BICT Rajarata UniverSity SriLanka</h4>
                </div>
                <div className="ac_experience">
                    <h3>Experiences</h3>
                    <h4>BICT Rajarata UniverSity SriLanka</h4>
                    <h4>BICT Rajarata UniverSity SriLanka</h4>
                    <h4>BICT Rajarata UniverSity SriLanka</h4>
                </div>
            </div>
        </div>
    )
}
